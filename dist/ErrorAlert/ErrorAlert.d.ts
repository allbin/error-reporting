import React from "react";
import { ErrorStatus } from "../";
import "./style.css";
interface CustomErrorProps {
    [key: string]: any;
    body?: string[];
    /** Message displayed to user while the error report is being completed and sending. Default: "Sending error report.". */
    report_sending_message?: string;
    /** Message displayed to user when the error report has successfully been sent. Default: "Error report has been sent.". */
    report_sent_message?: string;
    /** Message displayed if the error report could not be completed or sent. Default: "Sending error report failed. Please contact us." */
    report_failed_message?: string;
    title?: string;
    /** The text which appears on the button in the footer of the alert.
     * Both *action_label* and *actionCB* required to show button.
     */
    actionLabel?: string;
    /** The action triggered when user clicks the button in the footer.
     * Both *action_label* and *actionCB* required to show button.
     */
    actionCB?: () => void;
}
export interface ErrorAlertProps {
    status?: ErrorStatus | null;
    /** The custom_error_props are available to the Alert component as `props.custom_error_props`.
     * Any keys may be used, the optional suggested props will be used by the default error alert component, if supplied.
     */
    custom_error_props?: CustomErrorProps;
}
declare const ErrorAlert: React.FunctionComponent<ErrorAlertProps>;
export default ErrorAlert;
