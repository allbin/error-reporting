import { ReactError, Config } from "./interfaces";
import { mapStackTrace } from "sourcemapped-stacktrace";

export const composeNetworkErrMessage = (
  config: Config,
  err: ReactError
): string => {
  let msg = "NETWORK ERROR: at ";
  if (err.timestamp) {
    msg += err.timestamp.toISOString();
  } else {
    msg += new Date().toISOString();
  }
  msg += " ";
  let cfg = "";
  if (err.config) {
    cfg = "URL: " + err.config.url + ", " + err.config.method;
    cfg +=
      err.config.headers && err.config.headers.Authorization
        ? " (Auth header sent)\n"
        : "(NO Auth header)\n";
    if (err.config.data) {
      cfg +=
        //NOTE: JSON.stringify() is NOT guaranteed to return a string, when passing in undefined it returns typeof undefined!
        "DATA SENT: '" +
        JSON.stringify(err.config.data)
          .toString()
          .substr(0, config.max_network_request_data) +
        "'\n";
    } else {
      cfg += "NO DATA SENT";
    }
  } else {
    cfg = "NO NETWORK REQUEST axios CONFIG FOUND.";
  }

  if (err.response) {
    let data = JSON.stringify(err.response.data);
    if (!data) {
      data = "''";
    } else {
      data = "'" + data + "'";
    }
    let headers = JSON.stringify(err.response.headers);
    if (!headers) {
      headers = "''";
    } else {
      headers = "'" + headers + "'";
    }
    msg += "\nResponse data: " + data;
    msg += "\nResponse status: " + err.response.status;
    msg += "\nResponse headers: " + headers;
    msg += "\n" + cfg;
  } else if (err.request) {
    msg += "Probably OPTIONS failed! No response was given.";
    msg += "\n" + cfg;
  } else {
    msg +=
      "Unknown error; response and request data undefined. NO HTTP STATUS CODE :(";
    msg += "\n" + cfg;
  }
  return msg;
};

const composeErrMessage = (err: ReactError): string => {
  let msg = "NETWORK ERROR: at ";
  if (err.timestamp) {
    msg += err.timestamp.toISOString();
  } else {
    msg += new Date().toISOString();
  }
  msg += " ";
  return msg;
};

const resolveStack = (err: ReactError): Promise<string[]> => {
  return new Promise((resolve) => {
    if (err.stack) {
      mapStackTrace(err.stack, (resolvedTrace) => {
        resolve(resolvedTrace);
      });
    } else {
      resolve(["NO STACK IN ERROR OBJECT"]);
    }
  });
};

export const composeMessage = (
  config: Config,
  err: ReactError,
  prefix: string | null = null
): Promise<string> => {
  let head = config.header || "";
  head +=
    location.protocol +
    location.hostname +
    " '" +
    location.pathname +
    "'" +
    "\n";
  head += "Created at " + new Date().toISOString() + "\n";
  if (prefix) {
    head += prefix;
  }
  head += "\nERROR: " + err.message + "\n";
  if (err.additional_message) {
    head += err.additional_message + "\n";
  }

  const body = err.network_error
    ? composeNetworkErrMessage(config, err)
    : composeErrMessage(err);

  let trace = "";
  if (err.component_trace) {
    trace += err.component_trace + "\n---------\n";
  }
  return resolveStack(err).then((resolvedStack) => {
    if (Array.isArray(resolvedStack)) {
      trace += resolvedStack.join("\n");
    }
    return head + "\n" + body + "\n" + trace;
  });
};
