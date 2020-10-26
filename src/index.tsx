import React from "react";
import ReactDOM from "react-dom";
import App from "./test_harness/App";
import ErrorReporting, { setConfig } from "./module";

setConfig({
  slack_webhook:
    "https://hooks.slack.com/services/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",
  disable_slack_posting: false,
  header: "*ErrorReporting development repository.*",
});

ReactDOM.render(
  <ErrorReporting>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ErrorReporting>,
  document.getElementById("root")
);
