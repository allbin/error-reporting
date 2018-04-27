'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n            from {\n              opacity: 0;\n              transform: translate3d(0, 10%, 0);\n            }\n            to {\n              opacity: 1;\n              transform: none;\n            }\n        '], ['\n            from {\n              opacity: 0;\n              transform: translate3d(0, 10%, 0);\n            }\n            to {\n              opacity: 1;\n              transform: none;\n            }\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['\n            0% {\n              transform: translate(0, 8px);\n              opacity: 1;\n            }\n            50% {\n              transform: translate(90px, 8px);\n              opacity: 1;\n            }\n            100% {\n              transform: translate(170px, 8px);\n              opacity: 0;\n            }\n        '], ['\n            0% {\n              transform: translate(0, 8px);\n              opacity: 1;\n            }\n            50% {\n              transform: translate(90px, 8px);\n              opacity: 1;\n            }\n            100% {\n              transform: translate(170px, 8px);\n              opacity: 0;\n            }\n        ']),
    _templateObject3 = _taggedTemplateLiteral(['\n            position: fixed;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background-color: rgba(26, 29, 36, 0.3);\n            z-index: 10;\n            text-align: center;\n\n            &.w_title {\n                .modal .modal_body{\n                    padding: 16px 16px 32px;\n                }\n            }\n            &.w_body {\n                .modal .modal_title{\n                    padding: 32px 16px 0px;\n                }\n            }\n\n            .modal-appear {\n                animation: ', ' 0.5s 0s both;\n            }\n            .modal {\n                margin: 5% 30%;\n                background-color: #fff;\n                border-radius: 2px;\n                text-align: center;\n                box-shadow: 0 4px 12px rgba(0,0,0,0.12);\n                .modal_head {\n                    background-color: ', ';\n                    color: #fff;\n                    padding: 40px;\n                    border-top-left-radius: 2px;\n                    border-top-right-radius: 2px;\n                    svg {\n                        width: 100px;\n                        height: 100px;\n                    }\n                }\n                .modal_title {\n                    padding: 32px 16px 32px;\n                    font-size: 24px;\n                }\n                .modal_body {\n                    padding: 32px 16px;\n                    font-size: 16px;\n                    opacity: 0.7;\n                }\n\n                .error_report {\n                    height: 40px;\n                    display: block;\n                    margin: auto;\n                    text-align: center;\n                    margin-bottom: 40px;\n                    &.detected, &.failed {\n                        color: #cc4d4d;\n                    }\n                    &.sent {\n                        color: #00C896;\n                    }\n                    #report_letter {\n                        animation: ', ' 1.5s infinite;\n                    }\n                }\n\n                .modal_footer {\n                    background-color: #fff;\n                    padding: 10px 20px;\n                    border-top: 1px solid ', ';\n                    border-bottom-left-radius: 2px;\n                    border-bottom-right-radius: 2px;\n                    button {\n                        background-color: ', ';\n                        border-color: ', ';\n                        display: inline-block;\n                        width: 150px;\n                        &:HOVER {\n                            background-color: ', ';\n                        }\n                        &:first-child {\n                            margin-left: 0 !important;\n                        }\n                        &:last-child {\n                            margin-left: 12px;\n                        }\n                    }\n                }\n            }\n\n        '], ['\n            position: fixed;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background-color: rgba(26, 29, 36, 0.3);\n            z-index: 10;\n            text-align: center;\n\n            &.w_title {\n                .modal .modal_body{\n                    padding: 16px 16px 32px;\n                }\n            }\n            &.w_body {\n                .modal .modal_title{\n                    padding: 32px 16px 0px;\n                }\n            }\n\n            .modal-appear {\n                animation: ', ' 0.5s 0s both;\n            }\n            .modal {\n                margin: 5% 30%;\n                background-color: #fff;\n                border-radius: 2px;\n                text-align: center;\n                box-shadow: 0 4px 12px rgba(0,0,0,0.12);\n                .modal_head {\n                    background-color: ', ';\n                    color: #fff;\n                    padding: 40px;\n                    border-top-left-radius: 2px;\n                    border-top-right-radius: 2px;\n                    svg {\n                        width: 100px;\n                        height: 100px;\n                    }\n                }\n                .modal_title {\n                    padding: 32px 16px 32px;\n                    font-size: 24px;\n                }\n                .modal_body {\n                    padding: 32px 16px;\n                    font-size: 16px;\n                    opacity: 0.7;\n                }\n\n                .error_report {\n                    height: 40px;\n                    display: block;\n                    margin: auto;\n                    text-align: center;\n                    margin-bottom: 40px;\n                    &.detected, &.failed {\n                        color: #cc4d4d;\n                    }\n                    &.sent {\n                        color: #00C896;\n                    }\n                    #report_letter {\n                        animation: ', ' 1.5s infinite;\n                    }\n                }\n\n                .modal_footer {\n                    background-color: #fff;\n                    padding: 10px 20px;\n                    border-top: 1px solid ', ';\n                    border-bottom-left-radius: 2px;\n                    border-bottom-right-radius: 2px;\n                    button {\n                        background-color: ', ';\n                        border-color: ', ';\n                        display: inline-block;\n                        width: 150px;\n                        &:HOVER {\n                            background-color: ', ';\n                        }\n                        &:first-child {\n                            margin-left: 0 !important;\n                        }\n                        &:last-child {\n                            margin-left: 12px;\n                        }\n                    }\n                }\n            }\n\n        ']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

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
var ErrorAlert = function (_React$Component) {
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

exports.default = ErrorAlert;