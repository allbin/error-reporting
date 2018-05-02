import React from 'react';
import styled, { keyframes } from 'styled-components';

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
export default class ErrorAlert extends React.Component {

    constructor(props) {
        super(props);

        const fadeIn = keyframes`
            from {
              opacity: 0;
              transform: translate3d(0, 10%, 0);
            }
            to {
              opacity: 1;
              transform: none;
            }
        `;

        const letterMove = keyframes`
            0% {
              transform: translate(0, 8px);
              opacity: 1;
            }
            50% {
              transform: translate(90px, 8px);
              opacity: 1;
            }
            100% {
              transform: translate(170px, 8px);
              opacity: 0;
            }
        `;

        this.Container = styled.div `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(26, 29, 36, 0.3);
            z-index: 10;
            text-align: center;

            &.w_title {
                .modal .modal_body{
                    padding: 16px 16px 32px;
                }
            }
            &.w_body {
                .modal .modal_title{
                    padding: 32px 16px 0px;
                }
            }

            .modal-appear {
                animation: ${fadeIn} 0.5s 0s both;
            }
            .modal {
                margin: 5% 30%;
                background-color: #fff;
                border-radius: 2px;
                text-align: center;
                box-shadow: 0 4px 12px rgba(0,0,0,0.12);
                .modal_head {
                    background-color: ${this.getHeadColor()};
                    color: #fff;
                    padding: 40px;
                    border-top-left-radius: 2px;
                    border-top-right-radius: 2px;
                    svg {
                        width: 100px;
                        height: 100px;
                    }
                }
                .modal_title {
                    padding: 32px 16px 32px;
                    font-size: 24px;
                }
                .modal_body {
                    padding: 32px 16px;
                    font-size: 16px;
                    opacity: 0.7;
                }

                .error_report {
                    height: 40px;
                    display: block;
                    margin: auto;
                    text-align: center;
                    margin-bottom: 40px;
                    &.detected, &.failed {
                        color: #cc4d4d;
                    }
                    &.sent {
                        color: #00C896;
                    }
                    #report_letter {
                        animation: ${letterMove} 1.5s infinite;
                    }
                }

                .modal_footer {
                    background-color: #fff;
                    padding: 10px 20px;
                    border-top: 1px solid black;
                    border-bottom-left-radius: 2px;
                    border-bottom-right-radius: 2px;
                    button {
                        background-color: ${this.getHeadColor()};
                        border-color: ${this.getDarkHeadColor()};
                        display: inline-block;
                        width: 150px;
                        &:HOVER {
                            background-color: ${this.getDarkHeadColor()};
                        }
                        &:first-child {
                            margin-left: 0 !important;
                        }
                        &:last-child {
                            margin-left: 12px;
                        }
                    }
                }
            }

        `;
    }

    getHeadColor() {
        switch (this.props.status) {
            case 'sent':
            return `#00C896`;
            case 'failed':
            return `#cc4d4d`;
            default:
            return `#3378d4`;
        }
    }

    getDarkHeadColor() {
        switch (this.props.status) {
            case 'sent':
            return `#00a87e`;
            case 'failed':
            return `#ab2f2f`;
            default:
            return `#2063bb`;
        }
    }

    getIcon() {
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

    renderSVGBody(status) {
        if (status === "detected") {
            return (<g id="Artboard">
                <circle id="Oval-0" fill="#ffc9c9" cx="24" cy="20" r="4"></circle>
                <circle id="Oval-1" fill="#ffc9c9" cx="52" cy="20" r="4"></circle>
                <circle id="Oval-2" fill="#ffc9c9" cx="80" cy="20" r="4"></circle>
                <circle id="Oval-3" fill="#ffc9c9" cx="108" cy="20" r="4"></circle>
                <circle id="Oval-4" fill="#ffc9c9" cx="136" cy="20" r="4"></circle>
                <circle id="Oval-5" fill="#ffc9c9" cx="164" cy="20" r="4"></circle>
                <circle id="Oval-6" fill="#ffc9c9" cx="192" cy="20" r="4"></circle>
                <g id="report_letter">
                    <rect id="Rectangle-2" fill="#FFFFFF" x="1" y="1" width="31" height="20" rx="2"></rect>
                    <path d="M29.674,0.342 L3.3265,0.342 C1.6312,0.342 0.25035,1.7209 0.25035,3.41815 L0.25035,18.58615 C0.25035,20.28145 1.62925,21.66035 3.3265,21.66035 L29.676,21.66035 C31.3713,21.66035 32.75215,20.28145 32.75215,18.58615 L32.750197,3.41615 C32.750197,1.72085 31.371297,0.34195 29.674047,0.34195 L29.674,0.342 Z M31.3283,3.4162 L31.3283,18.5842 C31.3283,18.900605 31.23455,19.19555 31.080255,19.44555 L19.123255,11.53755 L31.117255,2.62355 C31.248115,2.85988 31.328195,3.12745 31.328195,3.4165 L31.3283,3.4162 Z M29.674,1.7619 C29.740405,1.7619 29.802905,1.7736185 29.865405,1.781431 L17.357405,11.078431 C16.771455,11.513976 15.955055,11.510071 15.371055,11.0706185 L3.105555,1.7836185 C3.17782,1.773853 3.250085,1.760181 3.32626,1.760181 L29.674,1.7619 Z M1.93,19.4649 C1.76789,19.20904 1.670235,18.90825 1.670235,18.58405 L1.672188,3.41605 C1.672188,3.132845 1.750313,2.86915 1.877268,2.6348 L13.717268,11.5998 L1.93,19.4649 Z M3.3304,20.23835 L14.9574,12.48035 C15.398805,12.70691 15.8832,12.822145 16.3695,12.822145 C16.89295,12.822145 17.4144,12.683475 17.8812,12.4198 L29.6977,20.2363 C29.6898875,20.2363 29.682075,20.238253 29.6742625,20.238253 L3.3304,20.23835 Z" id="Shape" fill="#CC4D4D" fillRule="nonzero"></path>
                </g>
            </g>);
        }

        if (status === "failed") {
            return (<g id="Artboard" fillRule="nonzero" fill="#CC4D4D">
                <g id="np_sent_638573_000000" transform="translate(102.000000, 10.000000)">
                    <polygon id="Shape" points="3.11162678 19 0 16 16.0725373 0 19 2.95585916"></polygon>
                </g>
                <g id="np_sent_638573_000000" transform="translate(111.500000, 19.500000) scale(-1, 1) translate(-111.500000, -19.500000) translate(102.000000, 10.000000)">
                    <polygon id="Shape" points="3.11162678 19 0 16 16.0725373 0 19 2.95585916"></polygon>
                </g>
            </g>);
        }

        //Status sent.
        return (
            <g id="Artboard" transform="translate(96.000000, 10.000000)" fill="#02C896">
                <polygon id="Shape" points="9.11162678 19 0 10 2.88915762 7.08281748 9.11156142 13.165569 22.0725373 0 25 2.95585916"></polygon>
            </g>
        );
    }

    render() {
        // console.log("this.props.status:", this.props.status);
        // console.log("this.props.custom_error_props:", this.props.custom_error_props);
        // console.log("this.props.error_reporting:", this.props.error_reporting);
        return (
            <this.Container className={`${this.props.custom_error_props.title ? 'w_title' : null} ${this.props.custom_error_props.body ? 'w_body' : null}`}>
                <div className="modal">
                    <div className="modal_head">
                        { this.getIcon() }
                    </div>
                    {
                        this.props.custom_error_props.title ?
                        <div className="modal_title">
                            { this.props.custom_error_props.title }
                        </div>
                        :
                        null
                    }
                    {
                        this.props.custom_error_props.body ?
                        <div className="modal_body">
                            {
                                this.props.custom_error_props.body.map((sentence, i) => {
                                    return (<p key={i}>{sentence}</p>);
                                })
                            }
                        </div>
                        :
                        null
                    }
                    <div className={`error_report ${this.props.status}`}>
                        {
                            this.props.custom_error_props.label ?
                            <div>
                                { this.props.custom_error_props.label }
                            </div>
                            :
                            null
                        }
                        <svg width="216px" height="40px" viewBox="0 0 216 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <defs></defs>
                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                { this.renderSVGBody() }
                            </g>
                        </svg>
                    </div>

                    <div className="modal_footer">
                        {
                            (this.props.custom_error_props.action_label && this.props.custom_error_props.actionCB) ?
                            <a onClick={() => { this.props.custom_error_props.actionCB(); }}>{this.props.custom_error_props.action_label}</a>
                            :
                            null
                        }
                    </div>
                </div>
            </this.Container>
        );
    }
}
