import axios from "axios";
import { ErrorStatus, getConfig } from ".";
import { ExtendedError, ReactError } from "./interfaces";
import { composeMessage } from "./composition";
import { postToSlack } from "./posting";

export const listeners: ((status: ErrorStatus) => void)[] = [];

let windowOnerrorTimeout: NodeJS.Timeout | number | null;
let windowOnerrorReference: ReactError;

function setStatus(status: ErrorStatus): void {
  listeners.forEach((listenerCB) => listenerCB(status));
}

/**
 * Add property `network_error: true` to the error object to signal to the error reporter that it should
 * look for network related properties and network request data.
 */
export function setError(err: ExtendedError): void {
  if (windowOnerrorReference === err) {
    //If window.onerror has already caught this error we clear its timeout
    //and handle it in this subsequent error catch.
    if (windowOnerrorTimeout) {
      clearTimeout(windowOnerrorTimeout as NodeJS.Timeout);
    }
  }
  if (axios.isCancel(err)) {
    //This is true when we have manually cancelled a network request.
    return;
  }
  const config = getConfig();
  setStatus("detected");
  composeMessage(config, err)
    .then((blocks) => {
      console.log(
        "Error report generated:",
        JSON.stringify(blocks, undefined, 2)
      );
      return postToSlack(config, blocks);
    })
    .then(() => {
      setStatus("sent");
    })
    .catch(() => {
      setStatus("failed");
    });
}

//INITIAL ERROR LISTENER ATTACHING
const onunhandledrejectionListener = (
  rejection: PromiseRejectedResult | Event
) => {
  if ((rejection as PromiseRejectedResult).reason) {
    const { reason } = rejection as PromiseRejectedResult;
    onerrorListener(reason.toString(), undefined, undefined, undefined, reason);
  }
};
const onerrorListener = (
  message: Event | string,
  source?: string,
  lineno?: number,
  colno?: number,
  err?: ExtendedError
): boolean => {
  if (!err) {
    if (typeof message === "string") {
      err = new Error("ONLY STRING PROVIDED: " + message);
    } else {
      err = new Error("INVALID CALL TO window.onerror. CANNOT RESOLVE.");
    }
  }
  windowOnerrorTimeout = setTimeout(() => {
    //This timeout is here because shortly after window.onerror the React Error Boundary will
    //trigger if the error was caused inside a React Component life cycle.
    //The Error Boundary has more information and will cancel this timeout to ensure we do
    //not post the same error report twice.
    windowOnerrorTimeout = null;
    if (err) {
      if (!err.additional_message) {
        err.additional_message = "CAUGHT BY WINDOW.ONERROR.";
      } else {
        err.additional_message += " CAUGHT BY WINDOW.ONERROR.";
      }
      setError(err);
    }
  }, 500);
  windowOnerrorReference = err;
  return true;
};

if (!window.onerror) {
  window.onerror = onerrorListener;
  window.onunhandledrejection = onunhandledrejectionListener;
  console.log("ErrorReporting: Listening to window.onerror");
} else if (window.onerror !== onerrorListener) {
  window.onerror = onerrorListener;
  window.onunhandledrejection = onunhandledrejectionListener;
  console.warn("ErrorReporting: window.onerror has been overwritten!");
}
