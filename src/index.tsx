import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorReporting, { setConfig } from "./module";

setConfig({
  slack_webhook: "https://example.com",
});

ReactDOM.render(
  <ErrorReporting>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ErrorReporting>,
  document.getElementById("root")
);
