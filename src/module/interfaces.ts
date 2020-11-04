import { AxiosError } from "axios";

export interface ExtendedError extends Partial<AxiosError> {
  network_error?: boolean;
  additional_message?: string;
  timestamp?: Date;
}
export interface ReactError extends ExtendedError {
  component_trace?: string;
  stack?: any;
}

export interface Config {
  disable_slack_posting: boolean;
  /** Header supports markdown. */
  header: string;
  max_network_request_data: number;
  slack_webhook: string | null;
  language: "sv-SE" | "en-US";
}
