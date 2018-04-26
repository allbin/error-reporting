'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ErrorAlert = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n            from {\n              opacity: 0;\n              transform: translate3d(0, 10%, 0);\n            }\n            to {\n              opacity: 1;\n              transform: none;\n            }\n        '], ['\n            from {\n              opacity: 0;\n              transform: translate3d(0, 10%, 0);\n            }\n            to {\n              opacity: 1;\n              transform: none;\n            }\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['\n            0% {\n              transform: translate(0, 8px);\n              opacity: 1;\n            }\n            50% {\n              transform: translate(90px, 8px);\n              opacity: 1;\n            }\n            100% {\n              transform: translate(170px, 8px);\n              opacity: 0;\n            }\n        '], ['\n            0% {\n              transform: translate(0, 8px);\n              opacity: 1;\n            }\n            50% {\n              transform: translate(90px, 8px);\n              opacity: 1;\n            }\n            100% {\n              transform: translate(170px, 8px);\n              opacity: 0;\n            }\n        ']),
    _templateObject3 = _taggedTemplateLiteral(['\n            position: fixed;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background-color: rgba(26, 29, 36, 0.3);\n            z-index: 10;\n            text-align: center;\n\n            &.w_title {\n                .modal .modal_body{\n                    padding: 16px 16px 32px;\n                }\n            }\n            &.w_body {\n                .modal .modal_title{\n                    padding: 32px 16px 0px;\n                }\n            }\n\n            .modal-appear {\n                animation: ', ' 0.5s 0s both;\n            }\n            .modal {\n                margin: 5% 30%;\n                background-color: #fff;\n                border-radius: 2px;\n                text-align: center;\n                box-shadow: 0 4px 12px rgba(0,0,0,0.12);\n                .modal_head {\n                    background-color: ', ';\n                    color: #fff;\n                    padding: 40px;\n                    border-top-left-radius: 2px;\n                    border-top-right-radius: 2px;\n                    svg {\n                        width: 100px;\n                        height: 100px;\n                    }\n                }\n                .modal_title {\n                    padding: 32px 16px 32px;\n                    font-size: 24px;\n                }\n                .modal_body {\n                    padding: 32px 16px;\n                    font-size: 16px;\n                    opacity: 0.7;\n                }\n\n                .error_report {\n                    height: 40px;\n                    display: block;\n                    margin: auto;\n                    text-align: center;\n                    margin-bottom: 40px;\n                    &.detected, &.failed {\n                        color: #cc4d4d;\n                    }\n                    &.sent {\n                        color: #00C896;\n                    }\n                    #report_letter {\n                        animation: ', ' 1.5s infinite;\n                    }\n                }\n\n                .modal_footer {\n                    background-color: #fff;\n                    padding: 10px 20px;\n                    border-top: 1px solid ', ';\n                    border-bottom-left-radius: 2px;\n                    border-bottom-right-radius: 2px;\n                    button {\n                        background-color: ', ';\n                        border-color: ', ';\n                        display: inline-block;\n                        width: 150px;\n                        &:HOVER {\n                            background-color: ', ';\n                        }\n                        &:first-child {\n                            margin-left: 0 !important;\n                        }\n                        &:last-child {\n                            margin-left: 12px;\n                        }\n                    }\n                }\n            }\n\n        '], ['\n            position: fixed;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background-color: rgba(26, 29, 36, 0.3);\n            z-index: 10;\n            text-align: center;\n\n            &.w_title {\n                .modal .modal_body{\n                    padding: 16px 16px 32px;\n                }\n            }\n            &.w_body {\n                .modal .modal_title{\n                    padding: 32px 16px 0px;\n                }\n            }\n\n            .modal-appear {\n                animation: ', ' 0.5s 0s both;\n            }\n            .modal {\n                margin: 5% 30%;\n                background-color: #fff;\n                border-radius: 2px;\n                text-align: center;\n                box-shadow: 0 4px 12px rgba(0,0,0,0.12);\n                .modal_head {\n                    background-color: ', ';\n                    color: #fff;\n                    padding: 40px;\n                    border-top-left-radius: 2px;\n                    border-top-right-radius: 2px;\n                    svg {\n                        width: 100px;\n                        height: 100px;\n                    }\n                }\n                .modal_title {\n                    padding: 32px 16px 32px;\n                    font-size: 24px;\n                }\n                .modal_body {\n                    padding: 32px 16px;\n                    font-size: 16px;\n                    opacity: 0.7;\n                }\n\n                .error_report {\n                    height: 40px;\n                    display: block;\n                    margin: auto;\n                    text-align: center;\n                    margin-bottom: 40px;\n                    &.detected, &.failed {\n                        color: #cc4d4d;\n                    }\n                    &.sent {\n                        color: #00C896;\n                    }\n                    #report_letter {\n                        animation: ', ' 1.5s infinite;\n                    }\n                }\n\n                .modal_footer {\n                    background-color: #fff;\n                    padding: 10px 20px;\n                    border-top: 1px solid ', ';\n                    border-bottom-left-radius: 2px;\n                    border-bottom-right-radius: 2px;\n                    button {\n                        background-color: ', ';\n                        border-color: ', ';\n                        display: inline-block;\n                        width: 150px;\n                        &:HOVER {\n                            background-color: ', ';\n                        }\n                        &:first-child {\n                            margin-left: 0 !important;\n                        }\n                        &:last-child {\n                            margin-left: 12px;\n                        }\n                    }\n                }\n            }\n\n        ']);

exports.withErrorReporting = withErrorReporting;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _sourcemappedStacktrace = require('sourcemapped-stacktrace');

var _sourcemappedStacktrace2 = _interopRequireDefault(_sourcemappedStacktrace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

///////////////////////
/*
Alert component that can be used as a default.
Possible user props
    custom_error_props: {
        title: <string optional>,
        body: [<string>] <optional>
        label: <string optional>,
        action_label: <string, optional, action_label AND actionCB required for button to show>,
        actionCB: <function, optional, action_label AND actionCB required for button to show>
    }
NOTE: This component also uses this.props.status which is automatically provided by ErrorReporting.
*/

var ErrorAlert = exports.ErrorAlert = function (_React$Component) {
    _inherits(ErrorAlert, _React$Component);

    function ErrorAlert(props) {
        _classCallCheck(this, ErrorAlert);

        var _this = _possibleConstructorReturn(this, (ErrorAlert.__proto__ || Object.getPrototypeOf(ErrorAlert)).call(this, props));

        var fadeIn = (0, _styledComponents.keyframes)(_templateObject);

        var letterMove = (0, _styledComponents.keyframes)(_templateObject2);

        _this.Container = _styledComponents2.default.div(_templateObject3, fadeIn, _this.getHeadColor(), letterMove, function (props) {
            return props.theme.colors.border;
        }, _this.getHeadColor(), _this.getDarkHeadColor(), _this.getDarkHeadColor());
        return _this;
    }

    _createClass(ErrorAlert, [{
        key: 'getHeadColor',
        value: function getHeadColor() {
            switch (this.props.status) {
                case 'sent':
                    return '#00C896';
                case 'failed':
                    return '#cc4d4d';
                default:
                    return '#3378d4';
            }
        }
    }, {
        key: 'getDarkHeadColor',
        value: function getDarkHeadColor() {
            switch (this.props.status) {
                case 'sent':
                    return '#00a87e';
                case 'failed':
                    return '#ab2f2f';
                default:
                    return '#2063bb';
            }
        }
    }, {
        key: 'getIcon',
        value: function getIcon() {
            return null;
            //Fix this, inline some icons or such.
            // switch (this.props.params.type) {
            //     case 'success': {
            //         return <IconSuccess />;
            //     }
            //     case 'fail': {
            //         return <IconFail />;
            //     }
            //     default: {
            //         return <IconInfo />;
            //     }
            // }
        }
    }, {
        key: 'renderSVGBody',
        value: function renderSVGBody(status) {
            if (status === "detected") {
                return _react2.default.createElement(
                    'g',
                    { id: 'Artboard' },
                    _react2.default.createElement('circle', { id: 'Oval-0', fill: '#ffc9c9', cx: '24', cy: '20', r: '4' }),
                    _react2.default.createElement('circle', { id: 'Oval-1', fill: '#ffc9c9', cx: '52', cy: '20', r: '4' }),
                    _react2.default.createElement('circle', { id: 'Oval-2', fill: '#ffc9c9', cx: '80', cy: '20', r: '4' }),
                    _react2.default.createElement('circle', { id: 'Oval-3', fill: '#ffc9c9', cx: '108', cy: '20', r: '4' }),
                    _react2.default.createElement('circle', { id: 'Oval-4', fill: '#ffc9c9', cx: '136', cy: '20', r: '4' }),
                    _react2.default.createElement('circle', { id: 'Oval-5', fill: '#ffc9c9', cx: '164', cy: '20', r: '4' }),
                    _react2.default.createElement('circle', { id: 'Oval-6', fill: '#ffc9c9', cx: '192', cy: '20', r: '4' }),
                    _react2.default.createElement(
                        'g',
                        { id: 'report_letter' },
                        _react2.default.createElement('rect', { id: 'Rectangle-2', fill: '#FFFFFF', x: '1', y: '1', width: '31', height: '20', rx: '2' }),
                        _react2.default.createElement('path', { d: 'M29.674,0.342 L3.3265,0.342 C1.6312,0.342 0.25035,1.7209 0.25035,3.41815 L0.25035,18.58615 C0.25035,20.28145 1.62925,21.66035 3.3265,21.66035 L29.676,21.66035 C31.3713,21.66035 32.75215,20.28145 32.75215,18.58615 L32.750197,3.41615 C32.750197,1.72085 31.371297,0.34195 29.674047,0.34195 L29.674,0.342 Z M31.3283,3.4162 L31.3283,18.5842 C31.3283,18.900605 31.23455,19.19555 31.080255,19.44555 L19.123255,11.53755 L31.117255,2.62355 C31.248115,2.85988 31.328195,3.12745 31.328195,3.4165 L31.3283,3.4162 Z M29.674,1.7619 C29.740405,1.7619 29.802905,1.7736185 29.865405,1.781431 L17.357405,11.078431 C16.771455,11.513976 15.955055,11.510071 15.371055,11.0706185 L3.105555,1.7836185 C3.17782,1.773853 3.250085,1.760181 3.32626,1.760181 L29.674,1.7619 Z M1.93,19.4649 C1.76789,19.20904 1.670235,18.90825 1.670235,18.58405 L1.672188,3.41605 C1.672188,3.132845 1.750313,2.86915 1.877268,2.6348 L13.717268,11.5998 L1.93,19.4649 Z M3.3304,20.23835 L14.9574,12.48035 C15.398805,12.70691 15.8832,12.822145 16.3695,12.822145 C16.89295,12.822145 17.4144,12.683475 17.8812,12.4198 L29.6977,20.2363 C29.6898875,20.2363 29.682075,20.238253 29.6742625,20.238253 L3.3304,20.23835 Z', id: 'Shape', fill: '#CC4D4D', fillRule: 'nonzero' })
                    )
                );
            }

            if (status === "failed") {
                return _react2.default.createElement(
                    'g',
                    { id: 'Artboard', fillRule: 'nonzero', fill: '#CC4D4D' },
                    _react2.default.createElement(
                        'g',
                        { id: 'np_sent_638573_000000', transform: 'translate(102.000000, 10.000000)' },
                        _react2.default.createElement('polygon', { id: 'Shape', points: '3.11162678 19 0 16 16.0725373 0 19 2.95585916' })
                    ),
                    _react2.default.createElement(
                        'g',
                        { id: 'np_sent_638573_000000', transform: 'translate(111.500000, 19.500000) scale(-1, 1) translate(-111.500000, -19.500000) translate(102.000000, 10.000000)' },
                        _react2.default.createElement('polygon', { id: 'Shape', points: '3.11162678 19 0 16 16.0725373 0 19 2.95585916' })
                    )
                );
            }

            //Status sent.
            return _react2.default.createElement(
                'g',
                { id: 'Artboard', transform: 'translate(96.000000, 10.000000)', fill: '#02C896' },
                _react2.default.createElement('polygon', { id: 'Shape', points: '9.11162678 19 0 10 2.88915762 7.08281748 9.11156142 13.165569 22.0725373 0 25 2.95585916' })
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            // console.log("this.props.status:", this.props.status);
            // console.log("this.props.custom_error_props:", this.props.custom_error_props);
            // console.log("this.props.error_reporting:", this.props.error_reporting);
            return _react2.default.createElement(
                this.Container,
                { className: (this.props.custom_error_props.title ? 'w_title' : null) + ' ' + (this.props.custom_error_props.body ? 'w_body' : null) },
                _react2.default.createElement(
                    'div',
                    { className: 'modal' },
                    _react2.default.createElement(
                        'div',
                        { className: 'modal_head' },
                        this.getIcon()
                    ),
                    this.props.custom_error_props.title ? _react2.default.createElement(
                        'div',
                        { className: 'modal_title' },
                        this.props.custom_error_props.title
                    ) : null,
                    this.props.custom_error_props.body ? _react2.default.createElement(
                        'div',
                        { className: 'modal_body' },
                        this.props.custom_error_props.body.map(function (sentence, i) {
                            return _react2.default.createElement(
                                'p',
                                { key: i },
                                sentence
                            );
                        })
                    ) : null,
                    _react2.default.createElement(
                        'div',
                        { className: 'error_report ' + this.props.status },
                        this.props.custom_error_props.label ? _react2.default.createElement(
                            'div',
                            null,
                            this.props.custom_error_props.label
                        ) : null,
                        _react2.default.createElement(
                            'svg',
                            { width: '216px', height: '40px', viewBox: '0 0 216 40', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', xmlnsXlink: 'http://www.w3.org/1999/xlink' },
                            _react2.default.createElement('defs', null),
                            _react2.default.createElement(
                                'g',
                                { id: 'Page-1', stroke: 'none', strokeWidth: '1', fill: 'none', fillRule: 'evenodd' },
                                this.renderSVGBody()
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'modal_footer' },
                        this.props.custom_error_props.action_label && this.props.custom_error_props.actionCB ? _react2.default.createElement(
                            'a',
                            { onClick: function onClick() {
                                    _this2.props.custom_error_props.actionCB();
                                } },
                            this.props.custom_error_props.action_label
                        ) : null
                    )
                )
            );
        }
    }]);

    return ErrorAlert;
}(_react2.default.Component);

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
    window_onerror_timeout = setTimeout(function () {
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
        //Same as using setConfig({ header: "text" });
        config.header = header_string;
    },
    setConfig: function setConfig(config_obj) {
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

    ErrorAlert: ErrorAlert
};
exports.default = errorReporting;

/////////////////////////////
//HOC

function withErrorReporting(WrappedComponent) {
    var AltErrorComponent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var prePostCB = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

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

    return function (_React$Component2) {
        _inherits(ErrorReporting, _React$Component2);

        function ErrorReporting(props) {
            _classCallCheck(this, ErrorReporting);

            var _this3 = _possibleConstructorReturn(this, (ErrorReporting.__proto__ || Object.getPrototypeOf(ErrorReporting)).call(this));

            _this3.state = {
                hasError: false,
                status: null,
                custom_props: {}
            };
            return _this3;
        }

        _createClass(ErrorReporting, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                var _this4 = this;

                listeners.push(function (status) {
                    return _this4.errorListener(status);
                });
            }
        }, {
            key: 'errorListener',
            value: function errorListener(status) {
                //This is to ensure component will re-render when the status of error changes.

                var prefix = null;
                var custom_props = {};
                if (prePostCB) {
                    var cb_return = prePostCB();
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
                var _this5 = this;

                //Remove listener callback so that we don't get called after we're removed or are kept in memory for no reason.
                var listener_index = listeners.findIndex(function (listener) {
                    return listener === _this5.errorListener;
                });
                if (listener_index > -1) {
                    listeners.splice(listener_index, 1);
                }
            }
        }, {
            key: 'render',
            value: function render() {
                if (this.state.hasError && AltErrorComponent) {
                    return _react2.default.createElement(AltErrorComponent, {
                        status: errorReporting.getStatus(),
                        error_reporting: errorReporting,
                        custom_error_props: this.state.custom_props
                    });
                } else if (this.state.hasError && AltErrorComponent === null) {
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