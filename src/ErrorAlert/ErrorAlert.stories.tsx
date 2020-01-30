import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import ErrorAlert from ".";

console.log(React, ErrorAlert);

const bgDiv = {
  position: "absolute" as any,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "#F1F4FF"
};
storiesOf("ErrorAlert", module)
  .add("detected", () => (
    <div style={bgDiv}>
      <ErrorAlert status="detected" />
    </div>
  ))
  .add("detected title body", () => (
    <div style={bgDiv}>
      <ErrorAlert
        status="detected"
        custom_error_props={{
          title: "error title",
          body: ["body 1", "body 2"],
          actionLabel: "label",
          actionCB: action("action callback")
        }}
      />
    </div>
  ));
