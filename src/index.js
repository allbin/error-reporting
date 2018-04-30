import React from 'react';
import axios from 'axios';
import StackTrace from 'sourcemapped-stacktrace';

import ErrorAlert from './ErrorAlert';





let window_onerror_timeout;
let window_onerror_reference;

let config = {
    disable_slack_posting: false,
    header: null,
    max_network_request_data: 400,
    override_window_onerror: false,
    slack_webhook: null,
};

let error = null;
let error_status = null;
let listeners = [];

function setError(err) {
    if (window_onerror_reference === err) {
        //If window.onerror has already caught this error we clear its timeout
        //and handle it in this subsequent error catch.
        clearTimeout(window_onerror_timeout);
    }
    error = err;
    let prefix = setStatus("detected");
    composeMessage(err, prefix).then((msg) => {
        console.log("Error report generated:", msg);
        return postToSlack(msg);
    }).then(() => {
        setStatus("sent");
    }).catch((err) => {
        setStatus("failed");
    });
}

function setStatus(status) {
    error_status = status;
    let prefixes = "";

    listeners.forEach((listenerCB) => {
        let prefix = listenerCB(status);
        if (prefix) {
            prefixes += prefix;
        }
    });

    return prefixes;
}

let onerrorListener = (message, source, lineno, colno, err) => {
    window_onerror_timeout = setTimeout(() => {
        //This timeout is here because shortly after window.onerror the React Error Boundary will
        //trigger if the error was caused inside a React Component life cycle.
        //The Error Boundary has more information and will cancel this timeout to ensure we do
        //not post the same error message twice.
        window_onerror_timeout = null;
        if (!err.additional_message) {
            err.additional_message = "CAUGHT BY WINDOW.ONERROR.";
        } else {
            err.additional_message += " CAUGHT BY WINDOW.ONERROR.";
        }
        setError(err);
    }, 500);
    window_onerror_reference = err;
    return true;
};

if (!window.onerror) {
    window.onerror = onerrorListener;
    console.log("ErrReporting: Listening to window.onerror");
} else if (window.onerror !== onerrorListener) {
    console.log("ErrReporting: window.onerror already assigned. Use setConfig({ override_window_onerror: true }) to override.");
}



const errorReporting = {
    setHeader: (header_string) => {
        //Same as using setConfig({ header: "text" });
        config.header = header_string;
    },
    setConfig: (config_obj) => {
        //Configs will extend and overwrite any previous configs provided.
        // {
        //     disable_slack_posting       <bool, default false> - Use for disabling posting, for example during development.
        //     header                      <string, default null> - A string prepended to the error message body.
        //     max_network_request_data    <int, default 400> - In the case of a network error the message includes
        //                                 data from the request if there is any. However that may be of any size,
        //                                 default will only include the first 400 characters.
        //     override_window_onerror     <bool, default false> - Set to true to override any other listener
        //                                 attached to window.onerror.
        //     slack_webhook               <slack webhook url, required> - The url to which the error is posted.
        // }
        config = Object.assign({}, config, config_obj);
        if (config.override_window_onerror) {
            window.onerror = onerrorListener;
        }
    },
    getConfig: () => {
        return Object.assign({}, config);
    },

    setError: (err) => {
        //Add property `network_error: true` to the error object to signal to the error reporter that it should
        //look for network related properties and network request data.
        //Use property `additional_message: <string>` on the error object to add additional data to the error report.
        setError(err);
    },

    getError: () => { return error; },

    getStatus: () => { return error_status; },

    withErrorReporting: withErrorReporting,

    ErrorAlert: ErrorAlert
};
export default errorReporting;













/////////////////////////////
//HOC

export function withErrorReporting(WrappedComponent, AltErrorComponent = undefined, prePostCB = null) {
    /*
        WrappedComponent <required>,

        AltErrorComponent <optional>:
            A react component that will be displayed instead of WrappedComponent when an error is detected.
            If null is provided nothing will be rendered.
            This component will have three props:
                - `this.props.errorReporting`
                - `this.props.status` - Status of the error reporting, one of 'detected', 'sent', 'failed'.
                - `this.props.custom_error_props` - empty object if none provided by prePostCB (see below).

        prePostCB <optional>:
            A callback which is called every time the status of the error report changes.
            Return an object from the callback with the property `prefix` to prepend the value to the error report.
            Use the property `custom_error_props` to send those props to the AltErrorComponent as `this.props.custom_error_props`.
            This is a good place to add things like user info.
            NOTE: Only on status `detected` will the `prefix` property be used when the error report message is prepared.
            NOTE: All withErrorReporting() used which returns a prefix value from prePostCB will be prepended, meaning
            multiple withErrorReporting can contribute information to be prefixed to error message body.

            Example:
                () => {
                    return {
                        prefix: "User id: " + window.user_id + " Token age: " + window.token.age,
                        custom_error_props: {
                            error_icon: <icon>,
                            confirm_action: () => { window.location.href = "/"; },
                            confirm_label: "Go to start page"
                        }
                    };
                }
            Would add "User id: .... Token age: ...." between the specified Header and the Body (error message and trace).
            And inside AltErrorComponent the custom error props can be accessed like `this.props.custom_error_props[...]`.
    */

    return class ErrorReporting extends React.Component {
        constructor(props) {
            super();

            this.state = {
                hasError: false,
                status: null,
                custom_props: {}
            };
        }

        componentWillMount() {
            listeners.push((status) => { return this.errorListener(status); });
        }

        errorListener(status) {
            //This is to ensure component will re-render when the status of error changes.

            let prefix = null;
            let custom_props = {};
            if (prePostCB) {
                let cb_return = prePostCB();
                if (cb_return) {
                    prefix = (cb_return.hasOwnProperty("prefix")) ? cb_return.prefix : null;
                    custom_props = (cb_return.hasOwnProperty("custom_error_props")) ? cb_return.custom_error_props : {};
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
            errorReporting.setError(err);
        }

        componentWillUnmount() {
            //Remove listener callback so that we don't get called after we're removed or are kept in memory for no reason.
            let listener_index = listeners.findIndex(listener => listener === this.errorListener);
            if (listener_index > -1) {
                listeners.splice(listener_index, 1);
            }
        }

        render() {
            if (this.state.hasError && AltErrorComponent) {
                return <AltErrorComponent
                    status={errorReporting.getStatus()}
                    error_reporting={errorReporting}
                    custom_error_props={this.state.custom_props}
                />;
            } else if (this.state.hasError && AltErrorComponent === null) {
                return null;
            }
            //Carry props from upper components to the wrapped component.
            return <WrappedComponent error_reporting={errorReporting} {...this.props} />;
        }
    };
}













/////////////////////////////////
//MESSAGE COMPOSITION FUNCTIONS

function composeMessage(err, prefix = null) {
    let head = config.header || "";
    head += "Created at " + new Date().toISOString() + "\n";
    if (prefix) {
        head += prefix;
    }
    head += "\nERROR: " + err.message + "\n";
    if (error.additional_message) {
        head += error.additional_message + "\n";
    }

    let body = (err.network_error) ? composeNetworkErrMessage(err) : composeErrMessage(err);

    let trace = "";
    if (err.component_trace) {
        trace += err.component_trace + "\n---------\n";
    }
    return resolveStack(err).then((resolved_stack) => {
        if (Array.isArray(resolved_stack)) {
            trace += resolved_stack.join("\n");
        }
        return head + "\n" + body + "\n" + trace;
    });
}

function composeNetworkErrMessage(err) {
    let msg = "NETWORK ERROR: ";
    if (err.timestamps) {
        msg += "at " + (err.timestamp) ? err.timestamp.toISOString() : new Date().toISOString() + " ";
    }

    let cfg = "URL: " + err.config.url + ", " + err.config.method;
    cfg += err.config.headers.hasOwnProperty("Authorization") ? " (Auth header sent)\n" : "(NO Auth header)\n";
    if (err.config.data) {
        cfg += "DATA SENT: '" + (JSON.stringify(err.config.data) + "").substr(0, config.max_network_request_data) + "'\n";
        //NOTE: JSON.stringify() is NOT guaranteed to return a string, when passing in undefined it returns typeof undefined!
    } else {
        cfg += "NO DATA SENT";
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
        msg += "Unknown error; response and request data undefined. NO HTTP STATUS CODE :(";
        msg += "\n" + cfg;
    }
    return msg;
}

function composeErrMessage(err) {
    let msg = "FATAL ERROR CAUGHT: ";
    if (err.timestamps) {
        msg += "at " + (err.timestamp) ? err.timestamp.toISOString() : new Date().toISOString() + " ";
    }
    return msg;
}

function resolveStack(err) {
    return new Promise((resolve, reject) => {
        if (err.hasOwnProperty("stack")) {
            StackTrace.mapStackTrace(err.stack, (resolved_trace) => {
                resolve(resolved_trace);
            });
        } else {
            resolve("NO STACK IN ERROR OBJECT");
        }
    });
}









/////////////////////
//POSTING FUNCTIONS

function postToSlack(msg) {
    let post_stack = new Error().stack;
    return new Promise((resolve, reject) => {
        if (!config.slack_webhook) {
            let err = new Error("ErrReporting: Property 'slack_webhook' not specified in config.");
            err.stack = post_stack;
            console.error(err);
            reject(err);
            return;
        }
        if (config.disable_slack_posting) {
            console.log("ErrReporting: Not sent because of disable_slack_posting flag!");
            resolve();
            return;
        }

        let payload = encodeURIComponent(JSON.stringify({ text: msg }));

        axios({
            url: config.slack_webhook,
            headers: {
                'content-type': "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: "payload=" + payload
        }).then((res) => {
            console.log("ErrReporting: Successfully posted to slack.");
            resolve();
        }).catch((err) => {
            console.error("ErrReporting: Failed to post to slack.");
            reject(err);
        });
    });
}

