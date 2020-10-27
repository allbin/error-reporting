import axios from "axios";
import { Config } from "./interfaces";
import { SlackBlock } from "./";

export const postToSlack = (
  config: Config,
  blocks: SlackBlock[]
): Promise<void> => {
  const postStack = new Error().stack;
  return new Promise((resolve, reject) => {
    if (config.disable_slack_posting) {
      console.log(
        "ErrorReporting: Not sent because of disable_slack_posting flag!"
      );
      resolve();
      return;
    }
    if (!config.slack_webhook || config.slack_webhook.length === 0) {
      const err = new Error(
        "ErrorReporting: Unable to send report. Property 'slack_webhook' not specified in config."
      );
      err.stack = postStack;
      console.error(err);
      resolve();
      return;
    }
    const msg = {
      attachments: [
        {
          blocks,
        },
      ],
    };
    const payload = encodeURIComponent(JSON.stringify(msg));

    axios({
      url: config.slack_webhook,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      data: "payload=" + payload,
    })
      .then(() => {
        console.log("ErrorReporting: Successfully posted to slack.");
        resolve();
      })
      .catch((err) => {
        console.error("ErrorReporting: Failed to post to slack.");
        reject(err);
      });
  });
};

/** Messages longer than 2900 characters will be cut. */
export const sendLog = (config: Config, msg: string | string[]): void => {
  let blocks: SlackBlock[] = Array.isArray(msg)
    ? msg.map((m) => ({
        type: "section",
        text: { type: "mrkdwn", text: "```" + m.substr(0, 2900) + "```" },
      }))
    : [
        {
          type: "section",
          text: { type: "mrkdwn", text: "```" + msg.substr(0, 2900) + "```" },
        },
      ];

  postToSlack(config, blocks);
};
