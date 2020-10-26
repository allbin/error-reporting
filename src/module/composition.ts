import { ReactError, Config } from "./interfaces";
import { SlackBlock } from "./index";
import { mapStackTrace } from "sourcemapped-stacktrace";

export const composeNetworkErrMessage = (
  config: Config,
  err: ReactError
): SlackBlock[] => {
  const blocks: SlackBlock[] = [];

  let msg = `NETWORK ERROR: at ${
    err.timestamp ? err.timestamp.toISOString() : new Date().toISOString()
  } `;

  let cfg = "";
  if (err.config) {
    cfg = `URL:  ${err.config.url}, ${err.config.method}
    ${
      err.config.headers && err.config.headers.Authorization
        ? "(Auth header sent)"
        : "(NO Auth header)"
    }
    `;

    if (err.config.data) {
      cfg +=
        //NOTE: JSON.stringify() is NOT guaranteed to return a string, when passing in undefined it returns typeof undefined!
        `DATA SENT: '${JSON.stringify(err.config.data)
          .toString()
          .substr(0, config.max_network_request_data)}'
          `;
    } else {
      cfg += "NO DATA SENT";
    }
  } else {
    cfg = "NO NETWORK REQUEST axios CONFIG FOUND.";
  }

  blocks.push({
    type: "section",
    text: {
      type: "mrkdwn",
      text: "```" + msg + "```",
    },
  });

  msg = "";
  if (err.response) {
    let data = JSON.stringify(err.response.data);
    if (!data) {
      data = "''";
    } else {
      data = "'" + data + "'";
    }
    let headers = JSON.stringify(err.response.headers);
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
    msg +=
      "Unknown error; response and request data undefined. NO HTTP STATUS CODE :(";
    msg += "\n" + cfg;
  }

  blocks.push({
    type: "section",
    text: {
      type: "mrkdwn",
      text: "```" + msg + "```",
    },
  });

  return blocks;
};

const composeErrMessage = (err: ReactError): SlackBlock[] => {
  let msg = "ERROR: at ";
  if (err.timestamp) {
    msg += err.timestamp.toISOString();
  } else {
    msg += new Date().toISOString();
  }
  msg += " ";
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "```" + msg + "```",
      },
    },
  ];
};

const resolveStack = (err: ReactError): Promise<SlackBlock> => {
  return new Promise((resolve) => {
    if (err.stack) {
      mapStackTrace(err.stack, (resolved_trace) => {
        resolve({
          type: "section",
          text: {
            type: "mrkdwn",
            text: "```" + resolved_trace.join("\n").substr(0, 2000) + "```",
          },
        });
      });
    } else {
      resolve({
        type: "section",
        text: {
          type: "mrkdwn",
          text: "`NO STACK IN ERROR OBJECT`",
        },
      });
    }
  });
};

export const composeMessage = async (
  config: Config,
  err: ReactError
): Promise<SlackBlock[]> => {
  return new Promise(async (resolve, reject) => {
    const blocks: SlackBlock[] = [];

    let head = `${config.header || ""}
${window.location.protocol}${window.location.hostname} '${
      window.location.pathname
    }'
Created at \`${new Date().toISOString()}\`
ERROR: \`${err.message}"\`
`;

    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: head,
      },
    });

    const body =
      err.network_error || err.isAxiosError
        ? composeNetworkErrMessage(config, err)
        : composeErrMessage(err);

    blocks.push(...body);
    blocks.push({ type: "divider" });

    const trace = await resolveStack(err);
    blocks.push(trace);

    if (err.component_trace) {
      blocks.push({ type: "divider" });
      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: "```" + err.component_trace + "```",
        },
      });
    }
    resolve(blocks);
  });
};
