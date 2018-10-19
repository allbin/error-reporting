'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.withErrorReporting = withErrorReporting;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _sourcemappedStacktrace = require('sourcemapped-stacktrace');

var _sourcemappedStacktrace2 = _interopRequireDefault(_sourcemappedStacktrace);

var _ErrorAlert = require('./ErrorAlert');

var _ErrorAlert2 = _interopRequireDefault(_ErrorAlert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var window_onerror_timeout = void 0;
var window_onerror_reference = void 0;

var config = {
    disable_slack_posting: false,
    header: null,
    max_network_request_data: 400,
    override_window_onerror: false,
    slack_webhook: null
};

var error = null;
var error_status = null;
var listeners = [];

function _setError(err) {
    if (window_onerror_reference === err) {
        //If window.onerror has already caught this error we clear its timeout
        //and handle it in this subsequent error catch.
        clearTimeout(window_onerror_timeout);
    }
    if (_axios2.default.isCancel(err)) {
        //This is true when we have manually cancelled a network request.
        return;
    }
    error = err;
    var prefix = setStatus("detected");
    composeMessage(err, prefix).then(function (msg) {
        console.log("Error report generated:", msg);
        return postToSlack(msg);
    }).then(function () {
        setStatus("sent");
    }).catch(function (err) {
        setStatus("failed");
    });
}

function setStatus(status) {
    error_status = status;
    var prefixes = "";

    listeners.forEach(function (listenerCB) {
        var prefix = listenerCB(status);
        if (prefix) {
            prefixes += prefix;
        }
    });

    return prefixes;
}

var onerrorListener = function onerrorListener(message, source, lineno, colno, err) {
    if (!err) {
        if (message instanceof Error) {
            err = message;
        } else if (typeof message === "string") {
            err = new Error("ONLY STRING PROVIDED: " + message);
        } else {
            err = new Error("INVALID CALL TO window.onerror. CANNOT RESOLVE.");
        }
    }
    window_onerror_timeout = setTimeout(function () {
        //This timeout is here because shortly after window.onerror the React Error Boundary will
        //trigger if the error was caused inside a React Component life cycle.
        //The Error Boundary has more information and will cancel this timeout to ensure we do
        //not post the same error report twice.
        window_onerror_timeout = null;
        if (!err.additional_message) {
            err.additional_message = "CAUGHT BY WINDOW.ONERROR.";
        } else {
            err.additional_message += " CAUGHT BY WINDOW.ONERROR.";
        }
        _setError(err);
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

var errorReporting = {
    setHeader: function setHeader(header_string) {
        config.header = header_string;
    },

    setConfig: function setConfig(config_obj) {
        config = Object.assign({}, config, config_obj);
        if (config.override_window_onerror) {
            window.onerror = onerrorListener;
        }
    },

    getConfig: function getConfig() {
        return Object.assign({}, config);
    },

    setError: function setError(err) {
        //Add property `network_error: true` to the error object to signal to the error reporter that it should
        //look for network related properties and network request data.
        //Use property `additional_message: <string>` on the error object to add additional data to the error report.
        _setError(err);
    },

    getError: function getError() {
        return error;
    },

    getStatus: function getStatus() {
        return error_status;
    },

    withErrorReporting: withErrorReporting,

    ErrorAlert: _ErrorAlert2.default
};
exports.default = errorReporting;

/////////////////////////////
//HOC

function withErrorReporting(WrappedComponent) {
    var ErrorAlert = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


    return function (_React$Component) {
        _inherits(ErrorReporting, _React$Component);

        function ErrorReporting(props) {
            _classCallCheck(this, ErrorReporting);

            var _this = _possibleConstructorReturn(this, (ErrorReporting.__proto__ || Object.getPrototypeOf(ErrorReporting)).call(this));

            _this.state = {
                hasError: false,
                status: null,
                custom_props: {}
            };
            return _this;
        }

        _createClass(ErrorReporting, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                var _this2 = this;

                listeners.push(function (status) {
                    return _this2.errorListener(status);
                });
            }
        }, {
            key: 'errorListener',
            value: function errorListener(status) {
                //This is to ensure component will re-render when the status of error changes.

                var prefix = null;
                var custom_props = {};
                if (callback) {
                    var cb_return = callback();
                    if (cb_return) {
                        prefix = cb_return.hasOwnProperty("prefix") ? cb_return.prefix : null;
                        custom_props = cb_return.hasOwnProperty("custom_error_props") ? cb_return.custom_error_props : {};
                    }
                }
                this.setState({
                    hasError: true,
                    status: status,
                    custom_props: custom_props
                });
                return prefix;
            }
        }, {
            key: 'componentDidCatch',
            value: function componentDidCatch(err, info) {
                this.setState({
                    hasError: true
                });

                err.component_trace = info.componentStack;
                errorReporting.setError(err);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                var _this3 = this;

                //Remove listener callback so that we don't get called after we're removed or are kept in memory for no reason.
                var listener_index = listeners.findIndex(function (listener) {
                    return listener === _this3.errorListener;
                });
                if (listener_index > -1) {
                    listeners.splice(listener_index, 1);
                }
            }
        }, {
            key: 'render',
            value: function render() {
                if (this.state.hasError && ErrorAlert) {
                    return _react2.default.createElement(ErrorAlert, {
                        status: errorReporting.getStatus(),
                        error_reporting: errorReporting,
                        custom_error_props: this.state.custom_props
                    });
                } else if (this.state.hasError && ErrorAlert === null) {
                    return null;
                }
                //Carry props from upper components to the wrapped component.
                return _react2.default.createElement(WrappedComponent, _extends({ error_reporting: errorReporting }, this.props));
            }
        }]);

        return ErrorReporting;
    }(_react2.default.Component);
}

/////////////////////////////////
//MESSAGE COMPOSITION FUNCTIONS

function composeMessage(err) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var head = config.header || "";
    head += "Created at " + new Date().toISOString() + "\n";
    if (prefix) {
        head += prefix;
    }
    head += "\nERROR: " + err.message + "\n";
    if (error.additional_message) {
        head += error.additional_message + "\n";
    }

    var body = err.network_error ? composeNetworkErrMessage(err) : composeErrMessage(err);

    var trace = "";
    if (err.component_trace) {
        trace += err.component_trace + "\n---------\n";
    }
    return resolveStack(err).then(function (resolved_stack) {
        if (Array.isArray(resolved_stack)) {
            trace += resolved_stack.join("\n");
        }
        return head + "\n" + body + "\n" + trace;
    });
}

function composeNetworkErrMessage(err) {
    var msg = "NETWORK ERROR: ";
    if (err.timestamps) {
        msg += "at " + err.timestamp ? err.timestamp.toISOString() : new Date().toISOString() + " ";
    }

    var cfg = "URL: " + err.config.url + ", " + err.config.method;
    cfg += err.config.headers.hasOwnProperty("Authorization") ? " (Auth header sent)\n" : "(NO Auth header)\n";
    if (err.config.data) {
        cfg += "DATA SENT: '" + (JSON.stringify(err.config.data) + "").substr(0, config.max_network_request_data) + "'\n";
        //NOTE: JSON.stringify() is NOT guaranteed to return a string, when passing in undefined it returns typeof undefined!
    } else {
        cfg += "NO DATA SENT";
    }

    if (err.response) {
        var data = JSON.stringify(err.response.data);
        if (!data) {
            data = "''";
        } else {
            data = "'" + data + "'";
        }
        var headers = JSON.stringify(err.response.headers);
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
    var msg = "FATAL ERROR CAUGHT: ";
    if (err.timestamps) {
        msg += "at " + err.timestamp ? err.timestamp.toISOString() : new Date().toISOString() + " ";
    }
    return msg;
}

function resolveStack(err) {
    return new Promise(function (resolve, reject) {
        if (err.hasOwnProperty("stack")) {
            _sourcemappedStacktrace2.default.mapStackTrace(err.stack, function (resolved_trace) {
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
    var post_stack = new Error().stack;
    return new Promise(function (resolve, reject) {
        if (!config.slack_webhook) {
            var err = new Error("ErrReporting: Property 'slack_webhook' not specified in config.");
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

        var payload = encodeURIComponent(JSON.stringify({ text: msg }));

        (0, _axios2.default)({
            url: config.slack_webhook,
            headers: {
                'content-type': "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: "payload=" + payload
        }).then(function (res) {
            console.log("ErrReporting: Successfully posted to slack.");
            resolve();
        }).catch(function (err) {
            console.error("ErrReporting: Failed to post to slack.");
            reject(err);
        });
    });
}