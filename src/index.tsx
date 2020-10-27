import React from "react";
import ReactDOM from "react-dom";
import App from "./test_harness/App";
import ErrorReporting, { setConfig } from "./module";

setConfig({
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
