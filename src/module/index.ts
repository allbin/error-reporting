import { Config } from "./interfaces";
import Boundary from "./Boundary";
import { postToSlack, sendLog } from "./posting";

export type ErrorStatus = "detected" | "sent" | "failed";

export interface ErrorReportConfig extends Partial<Config> {}

export type SlackBlock =
  | { type: "divider" }
  | { type: "section"; text: { type: "mrkdwn"; text: string } }
  | {
      type: "section";
      text: { type: "plain_text"; text: string; emoji: boolean };
    };

let internal_config: Config = {
  disable_slack_posting: false,
  header: "No header in ER config.",
  max_network_request_data: 400,
  slack_webhook: null,
  language: "sv-SE",
};

export const setConfig = (config: ErrorReportConfig): void => {
  internal_config = { ...internal_config, ...config };
};
export const getConfig = (): Config => {
  return internal_config;
};

/** Convenience function to set config.header. Header supports markdown. */
export const setHeader = (header: string): void => {
  internal_config = { ...internal_config, ...{ header } };
};

/**
  Manually send a string message without triggering an error message for the user.
  Messages longer than 2900 characters will be cut.
  Message supports markdown.
*/
export const sendLogString = (msg: string | string[]): void => {
  if (!internal_config.slack_webhook) {
    console.error(
      "ErrorReporting: sendLogString failed. No webhook was configured!"
    );
    return;
  }
  sendLog(internal_config, msg);
};

export const sendSlackBlocks = (slack_blocks: SlackBlock[]): void => {
  postToSlack(internal_config, slack_blocks);
};

export default Boundary;
