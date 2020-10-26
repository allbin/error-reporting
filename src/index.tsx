import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorReporting, { setConfig } from "./module";

setConfig({
  slack_webhook: "https://example.com",
  disable_slack_posting: true,
  header: "ErrorReporting development repository.",
});

ReactDOM.render(
  <ErrorReporting>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ErrorReporting>,
  document.getElementById("root")
);
