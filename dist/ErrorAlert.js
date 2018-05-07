'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n            from {\n              opacity: 0;\n              transform: translate3d(0, 10%, 0);\n            }\n            to {\n              opacity: 1;\n              transform: none;\n            }\n        '], ['\n            from {\n              opacity: 0;\n              transform: translate3d(0, 10%, 0);\n            }\n            to {\n              opacity: 1;\n              transform: none;\n            }\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['\n            0% {\n              transform: translate(0, 8px);\n              opacity: 1;\n            }\n            50% {\n              transform: translate(90px, 8px);\n              opacity: 1;\n            }\n            100% {\n              transform: translate(170px, 8px);\n              opacity: 0;\n            }\n        '], ['\n            0% {\n              transform: translate(0, 8px);\n              opacity: 1;\n            }\n            50% {\n              transform: translate(90px, 8px);\n              opacity: 1;\n            }\n            100% {\n              transform: translate(170px, 8px);\n              opacity: 0;\n            }\n        ']),
    _templateObject3 = _taggedTemplateLiteral(['\n            position: fixed;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background-color: #F7F9FC;\n            z-index: 10;\n            text-align: center;\n\n            .modal-appear {\n                animation: ', ' 0.5s 0s both;\n            }\n            .modal {\n                position: fixed;\n                top: 20px;\n                left: 20px;\n                right: 20px;\n                bottom: 20px;\n                background-color: #fff;\n                text-align: center;\n                box-shadow: 0 2px 4px 0 rgba(0,0,0,0.12);\n                .modal_head {\n                    height: 40%;\n                    padding-top: 3vh;\n                    svg {\n                        width: 38vh;\n                        display: inline-block;\n                    }\n                }\n                .modal_title {\n                    padding: 14vh 0px 1vh;\n                    text-transform: uppercase;\n                    font-weight: bold;\n                    color: #285075;\n                    font-size: 7vh;\n                }\n                .modal_body {\n                    color: #285075;\n                    padding: 3vh 0;\n                    opacity: 0.7;\n                    font-size: 3vh;\n                    &.detected, &.failed {\n                        color: #c6615b;\n                    }\n                    &.sent {\n                        color: #2C795F;\n                    }\n                }\n\n                .error_report {\n                    height: 40px;\n                    display: block;\n                    margin: auto;\n                    text-align: center;\n                    margin-bottom: 40px;\n                    &.detected, &.failed {\n                        color: #cc4d4d;\n                    }\n                    &.sent {\n                        color: #00C896;\n                    }\n                    #report_letter {\n                        animation: ', ' 1.5s infinite;\n                    }\n                }\n\n                .modal_footer {\n                    position: absolute;\n                    left: 0;\n                    right: 0;\n                    bottom: 0;\n                    height: 20%;\n                    a {\n                        cursor: pointer;\n                        background-color: #5BC6A1;\n                        padding: 8px 22px;\n                        border-radius: 4px;\n                        color: #fff;\n                        font-size: 2vh;\n                        &:HOVER {\n                            background-color: #2C795F;\n                        }\n                        &:first-child {\n                            margin-left: 0 !important;\n                        }\n                        &:last-child {\n                            margin-left: 12px;\n                        }\n                    }\n                }\n            }\n\n        '], ['\n            position: fixed;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background-color: #F7F9FC;\n            z-index: 10;\n            text-align: center;\n\n            .modal-appear {\n                animation: ', ' 0.5s 0s both;\n            }\n            .modal {\n                position: fixed;\n                top: 20px;\n                left: 20px;\n                right: 20px;\n                bottom: 20px;\n                background-color: #fff;\n                text-align: center;\n                box-shadow: 0 2px 4px 0 rgba(0,0,0,0.12);\n                .modal_head {\n                    height: 40%;\n                    padding-top: 3vh;\n                    svg {\n                        width: 38vh;\n                        display: inline-block;\n                    }\n                }\n                .modal_title {\n                    padding: 14vh 0px 1vh;\n                    text-transform: uppercase;\n                    font-weight: bold;\n                    color: #285075;\n                    font-size: 7vh;\n                }\n                .modal_body {\n                    color: #285075;\n                    padding: 3vh 0;\n                    opacity: 0.7;\n                    font-size: 3vh;\n                    &.detected, &.failed {\n                        color: #c6615b;\n                    }\n                    &.sent {\n                        color: #2C795F;\n                    }\n                }\n\n                .error_report {\n                    height: 40px;\n                    display: block;\n                    margin: auto;\n                    text-align: center;\n                    margin-bottom: 40px;\n                    &.detected, &.failed {\n                        color: #cc4d4d;\n                    }\n                    &.sent {\n                        color: #00C896;\n                    }\n                    #report_letter {\n                        animation: ', ' 1.5s infinite;\n                    }\n                }\n\n                .modal_footer {\n                    position: absolute;\n                    left: 0;\n                    right: 0;\n                    bottom: 0;\n                    height: 20%;\n                    a {\n                        cursor: pointer;\n                        background-color: #5BC6A1;\n                        padding: 8px 22px;\n                        border-radius: 4px;\n                        color: #fff;\n                        font-size: 2vh;\n                        &:HOVER {\n                            background-color: #2C795F;\n                        }\n                        &:first-child {\n                            margin-left: 0 !important;\n                        }\n                        &:last-child {\n                            margin-left: 12px;\n                        }\n                    }\n                }\n            }\n\n        ']);

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
NOTE: This component also uses this.props.custom_error_props.alex_status which is automatically provided by ErrorReporting.
*/
var ErrorAlert = function (_React$Component) {
    _inherits(ErrorAlert, _React$Component);

    function ErrorAlert(props) {
        _classCallCheck(this, ErrorAlert);

        var _this = _possibleConstructorReturn(this, (ErrorAlert.__proto__ || Object.getPrototypeOf(ErrorAlert)).call(this, props));

        var fadeIn = (0, _styledComponents.keyframes)(_templateObject);

        var letterMove = (0, _styledComponents.keyframes)(_templateObject2);

        _this.Container = _styledComponents2.default.div(_templateObject3, fadeIn, letterMove);
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
        value: function renderSVGBody() {
            return _react2.default.createElement(
                'g',
                { id: 'Artboard' },
                _react2.default.createElement('path', { d: 'M289.890736,159.267244 C319.088977,154.994876 347.02143,161.525358 373.688097,178.858691 C413.688097,204.858691 422,223.633622 409,239 C400.333333,249.244252 365.896032,263.333333 305.688097,281.267244 L289.890736,159.267244 Z', id: 'Rectangle', fill: 'url(#linearGradient-1)' }),
                _react2.default.createElement('polygon', { id: 'Path-3', fill: '#F9C08B', points: '122 91 109 17 127 10 273 98 286 128 300 278 295 281 214 254 251 237 249 198 201 114 151 78 127 91' }),
                _react2.default.createElement('polygon', { id: 'Path-4', fill: '#F9C08B', points: '15 276 50.5 286 86 276 43 211 15 248' }),
                _react2.default.createElement('polygon', { id: 'Path-2', fill: '#F9C08B', points: '74 164 113 195 147 263 192 252 192 195 139 137 98 127 85 141' }),
                _react2.default.createElement(
                    'g',
                    { id: 'np_traffic-cone_1377795_000000', transform: 'translate(142.132960, 186.591447) rotate(-124.000000) translate(-142.132960, -186.591447) translate(-28.867040, 20.591447)', 'fill-rule': 'nonzero', fill: '#285176' },
                    _react2.default.createElement('path', { d: 'M291.333722,204.680587 C286.732647,202.800427 281.485871,204.986987 279.59222,209.555156 C277.71243,214.123103 279.914869,219.346008 284.516145,221.212121 L315.251982,233.509782 C321.466592,236.002757 323.795141,238.816116 323.86517,240.111414 C323.93531,241.392735 321.929285,244.428716 316.289845,247.242146 L193.373072,308.241996 C178.545274,316.124665 153.50332,316.124665 138.423777,308.241996 L15.8158491,247.630771 C9.92408947,244.385717 7.98806141,241.36357 7.98806141,240.082178 C7.98806141,238.800785 -8.42493873,254.886626 7.52515283,263.368276 L130.089986,323.96524 C141.242527,329.4666 153.559343,332.210149 166.002211,331.987314 C178.305021,332.210149 190.495426,329.494339 201.521556,324.076479 L324.704079,263.215678 C340.401672,254.873435 342.267312,244.539221 341.972832,239.107742 C341.692268,233.690168 338.662156,223.606599 322.109062,216.977514 L291.333722,204.680587 Z', id: 'Shape' }),
                    _react2.default.createElement('path', { d: 'M131.859922,24.1332478 L63.6382761,210.743937 C60.8839542,218.123749 61.632559,226.365643 65.6580953,233.137437 C78.3138307,253.989903 118.624156,268 165.999997,268 C213.375839,268 253.686164,253.989903 266.3419,233.151552 L266.3419,233.137416 C270.367508,226.365621 271.116005,218.123728 268.361719,210.743916 L200.027979,24.1042728 C194.914701,9.65589621 181.25627,0 165.944999,0 C150.633729,0 136.9894,9.65589621 131.862019,24.1042728 L131.859922,24.1332478 Z M215.745752,119.671609 C206.494048,125.538616 188.810008,130.529064 165.9834,130.529064 C143.17198,130.529064 125.445272,125.312419 116.192121,119.459527 L129.497638,83.2680118 L129.511762,83.2680118 C141.334027,86.8447469 153.636848,88.6120509 165.996439,88.5270009 C178.341567,88.6259593 190.615822,86.8870909 202.437726,83.3385853 L215.745752,119.671609 Z M234.701151,171.443571 C226.169739,181.254729 199.516399,190.698543 165.998587,190.698543 C132.480776,190.698543 105.800678,181.212385 97.2960236,171.415342 L109.909453,136.920485 C123.681062,144.413215 144.006535,148.824236 166.028599,148.824236 C188.048856,148.824236 208.331299,144.413215 222.118819,136.920485 L234.701151,171.443571 Z M250.859994,223.780121 C243.204359,236.433037 210.831711,249.906052 165.997864,249.906052 C121.164017,249.906052 88.7906462,236.447151 81.1357343,223.737777 C79.9775175,221.659588 79.7939009,219.185608 80.627263,216.965983 L90.6415656,189.610264 C106.517643,201.44308 134.426794,208.822892 165.99743,208.822892 C197.568066,208.822892 225.446843,201.584589 241.353295,189.610264 L251.339393,216.965983 C252.172755,219.199687 252.003241,221.673775 250.859162,223.766007 L250.859994,223.780121 Z M165.997864,18.310033 C173.653499,18.2817566 180.51797,23.074284 183.102994,30.2984723 L196.295333,66.3061345 C186.450256,69.1194457 176.238162,70.505074 165.997864,70.4341387 C155.757566,70.5048243 145.545472,69.1193733 135.700395,66.3061345 L148.864529,30.3267017 C151.435235,23.0883987 158.314025,18.2676889 165.997864,18.310033 Z', id: 'Shape' })
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                this.Container,
                { className: (this.props.custom_error_props.title ? 'w_title' : null) + ' ' + (this.props.custom_error_props.body ? 'w_body' : null) },
                _react2.default.createElement(
                    'div',
                    { className: 'modal' },
                    _react2.default.createElement(
                        'div',
                        { className: 'modal_head' },
                        _react2.default.createElement(
                            'svg',
                            { width: '495px', height: '300px', viewBox: '0 0 495 300', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', xmlnsXlink: 'http://www.w3.org/1999/xlink' },
                            _react2.default.createElement(
                                'defs',
                                null,
                                _react2.default.createElement(
                                    'linearGradient',
                                    { x1: '71.0335121%', y1: '20.8630174%', x2: '14.2819663%', y2: '97.4135166%', id: 'linearGradient-1' },
                                    _react2.default.createElement('stop', { stopColor: '#FDFEFF', offset: '0%' }),
                                    _react2.default.createElement('stop', { stopColor: '#DDE7F1', offset: '100%' })
                                )
                            ),
                            _react2.default.createElement(
                                'g',
                                { id: 'Page-1', stroke: 'none', strokeWidth: '1', fill: 'none', fillRule: 'evenodd' },
                                this.renderSVGBody()
                            )
                        )
                    ),
                    this.props.custom_error_props.title ? _react2.default.createElement(
                        'div',
                        { className: 'modal_title' },
                        this.props.custom_error_props.title
                    ) : null,
                    this.props.custom_error_props.body ? _react2.default.createElement(
                        'div',
                        { className: 'modal_body ' + this.props.status },
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