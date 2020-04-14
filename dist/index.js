import React from "react";
import axios from "axios";
import StackTrace from "sourcemapped-stacktrace";
export { default as ErrorAlert } from "./ErrorAlert";
let windowOnerrorTimeout;
let windowOnerrorReference;
let config = {
    disable_slack_posting: false,
    header: null,
    max_network_request_data: 400,
    override_window_onerror: false,
    slack_webhook: null
};
let error = null;
let errorStatus = null;
const listeners = [];
//
//
/////////////////////
//POSTING FUNCTIONS
function postToSlack(msg) {
    const postStack = new Error().stack;
    return new Promise((resolve, reject) => {
        if (!config.slack_webhook) {
            const err = new Error("ErrReporting: Property 'slack_webhook' not specified in config.");
            err.stack = postStack;
            console.error(err);
            reject(err);
            return;
        }
        if (config.disable_slack_posting) {
            console.log("ErrReporting: Not sent because of disable_slack_posting flag!");
            resolve();
            return;
        }
        const payload = encodeURIComponent(JSON.stringify({ text: msg }));
        axios({
            url: config.slack_webhook,
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: "payload=" + payload
        })
            .then(() => {
            console.log("ErrReporting: Successfully posted to slack.");
            resolve();
        })
            .catch(err => {
            console.error("ErrReporting: Failed to post to slack.");
            reject(err);
        });
    });
}
export function sendDebug(msg) {
    if (Array.isArray(msg)) {
        postToSlack(msg.join("\n"));
    }
    else {
        postToSlack(msg);
    }
}
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
//MESSAGE COMPOSITION FUNCTIONS
function composeNetworkErrMessage(err) {
    let msg = "NETWORK ERROR: at ";
    if (err.timestamp) {
        msg += err.timestamp.toISOString();
    }
    else {
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
                    (JSON.stringify(err.config.data) + "").substr(0, config.max_network_request_data) +
                    "'\n";
        }
        else {
            cfg += "NO DATA SENT";
        }
    }
    else {
        cfg = "NO NETWORK REQUEST axios CONFIG FOUND.";
    }
    if (err.response) {
        let data = JSON.stringify(err.response.data);
        if (!data) {
            data = "''";
        }
        else {
            data = "'" + data + "'";
        }
        let headers = JSON.stringify(err.response.headers);
        if (!headers) {
            headers = "''";
        }
        else {
            headers = "'" + headers + "'";
        }
        msg += "\nResponse data: " + data;
        msg += "\nResponse status: " + err.response.status;
        msg += "\nResponse headers: " + headers;
        msg += "\n" + cfg;
    }
    else if (err.request) {
        msg += "Probably OPTIONS failed! No response was given.";
        msg += "\n" + cfg;
    }
    else {
        msg +=
            "Unknown error; response and request data undefined. NO HTTP STATUS CODE :(";
        msg += "\n" + cfg;
    }
    return msg;
}
function composeErrMessage(err) {
    let msg = "NETWORK ERROR: at ";
    if (err.timestamp) {
        msg += err.timestamp.toISOString();
    }
    else {
        msg += new Date().toISOString();
    }
    msg += " ";
    return msg;
}
function resolveStack(err) {
    return new Promise(resolve => {
        if (err.stack) {
            StackTrace.mapStackTrace(err.stack, resolvedTrace => {
                resolve(resolvedTrace);
            });
        }
        else {
            resolve(["NO STACK IN ERROR OBJECT"]);
        }
    });
}
function composeMessage(err, prefix = null) {
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
        ? composeNetworkErrMessage(err)
        : composeErrMessage(err);
    let trace = "";
    if (err.component_trace) {
        trace += err.component_trace + "\n---------\n";
    }
    return resolveStack(err).then(resolvedStack => {
        if (Array.isArray(resolvedStack)) {
            trace += resolvedStack.join("\n");
        }
        return head + "\n" + body + "\n" + trace;
    });
}
//END OF MESSAGE COMPOSITION
//
//
//
//
function setStatus(status) {
    errorStatus = status;
    let prefixes = "";
    listeners.forEach(listenerCB => {
        const prefix = listenerCB(status);
        if (prefix) {
            prefixes += prefix;
        }
    });
    return prefixes;
}
/**
 * Add property `network_error: true` to the error object to signal to the error reporter that it should
 * look for network related properties and network request data.
 * Use property `additional_message: <string>` on the error object to add additional data to the error report.
 */
export function setError(err) {
    if (windowOnerrorReference === err) {
        //If window.onerror has already caught this error we clear its timeout
        //and handle it in this subsequent error catch.
        if (windowOnerrorTimeout) {
            clearTimeout(windowOnerrorTimeout);
        }
    }
    if (axios.isCancel(err)) {
        //This is true when we have manually cancelled a network request.
        return;
    }
    error = err;
    const prefix = setStatus("detected");
    composeMessage(err, prefix)
        .then(msg => {
        console.log("Error report generated:", msg);
        return postToSlack(msg);
    })
        .then(() => {
        setStatus("sent");
    })
        .catch(() => {
        setStatus("failed");
    });
}
////////////////
////////////////
////////////////
////////////////
//INITIAL ERROR LISTENER ATTACHING
const onerrorListener = (message, source, lineno, colno, err) => {
    if (!err) {
        if (typeof message === "string") {
            err = new Error("ONLY STRING PROVIDED: " + message);
        }
        else {
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
            }
            else {
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
    console.log("ErrReporting: Listening to window.onerror");
}
else if (window.onerror !== onerrorListener) {
    console.log("ErrReporting: window.onerror already assigned. Use setConfig({ override_window_onerror: true }) to override.");
}
////////////////
////////////////
////////////////
////////////////
export function setHeader(headerString) {
    config.header = headerString;
}
export function setConfig(configObj) {
    config = Object.assign({}, config, configObj);
    if (config.override_window_onerror) {
        window.onerror = onerrorListener;
    }
}
export function getConfig() {
    return Object.assign({}, config);
}
export function getError() {
    return error;
}
export function getStatus() {
    return errorStatus;
}
//
//
export class ErrorReporting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            status: null,
            custom_props: {}
        };
    }
    componentWillMount() {
        listeners.push(status => {
            return this.errorListener(status);
        });
    }
    errorListener(status) {
        //This is to ensure component will re-render when the status of error changes.
        let prefix = null;
        let custom_props = {};
        if (this.props.callback) {
            const CBReturn = this.props.callback();
            if (CBReturn) {
                prefix = CBReturn.prefix ? CBReturn.prefix : null;
                custom_props = CBReturn.custom_error_props
                    ? CBReturn.custom_error_props
                    : {};
            }
        }
        this.setState({
            hasError: true,
            status: status,
            custom_props: custom_props
        });
        return prefix;
    }
    componentDidCatch(err, info) {
        this.setState({
            hasError: true
        });
        err.component_trace = info.componentStack;
        setError(err);
    }
    componentWillUnmount() {
        //Remove listener callback so that we don't get called after we're removed or are kept in memory for no reason.
        const listenerIndex = listeners.findIndex(listener => listener === this.errorListener);
        if (listenerIndex > -1) {
            listeners.splice(listenerIndex, 1);
        }
    }
    render() {
        const EA = this.props.ErrorAlert;
        if (this.state.hasError && EA) {
            return (React.createElement(EA, { status: getStatus(), custom_error_props: this.state.custom_props }));
        }
        else if (this.state.hasError && EA === null) {
            return null;
        }
        return this.props.children;
    }
}

//# sourceMappingURL=index.js.map
