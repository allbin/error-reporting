import React, { ReactNode } from "react";
import { AxiosError } from "axios";
import { ErrorAlertProps } from "./ErrorAlert";
export { default as ErrorAlert } from "./ErrorAlert";
export declare type ErrorReportConfig = {
    disable_slack_posting: boolean;
    header: string | null;
    max_network_request_data: number;
    override_window_onerror: boolean;
    slack_webhook: string | null;
};
export declare type ErrorStatus = "detected" | "sent" | "failed";
export interface OnErrorCBResponse {
    prefix?: string;
    custom_error_props?: ErrorAlertProps;
}
export interface ERProps {
    children: ReactNode;
    ErrorAlert: React.ComponentType<ErrorAlertProps> | null;
    callback?: () => OnErrorCBResponse | null;
}
export interface ERState {
    hasError: boolean;
    status: ErrorStatus | null;
    custom_props: {
        [key: string]: any;
    };
}
export interface ExtendedError extends Partial<AxiosError> {
    network_error?: boolean;
    additional_message?: string;
    timestamp?: Date;
}
interface ReactError extends ExtendedError {
    component_trace?: string;
    stack?: any;
}
export declare function sendDebug(msg: string | string[]): void;
/**
 * Add property `network_error: true` to the error object to signal to the error reporter that it should
 * look for network related properties and network request data.
 * Use property `additional_message: <string>` on the error object to add additional data to the error report.
 */
export declare function setError(err: ExtendedError): void;
export declare function setHeader(headerString: string): void;
export declare function setConfig(configObj: Partial<ErrorReportConfig>): void;
export declare function getConfig(): ErrorReportConfig;
export declare function getError(): ReactError | null;
export declare function getStatus(): ErrorStatus | null;
export declare class ErrorReporting extends React.Component<ERProps, ERState> {
    constructor(props: ERProps);
    componentWillMount(): void;
    errorListener(status: ErrorStatus): string | null;
    componentDidCatch(err: ReactError, info: React.ErrorInfo): void;
    componentWillUnmount(): void;
    render(): ReactNode;
}
