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
          title: "Kunde inte ansluta till server",
          body: [
            "Återupprepade försök har gjorts, var god kontrollera din anslutning och prova igen.",
            "Om problemet kvarstår kontakta oss via länk nedan."
          ],
          actionLabel: "Kontakta oss",
          actionCB: action("action callback"),
          report_sending_message: "Sammanställer och skickar felrapport..."
        }}
      />
    </div>
  ))
  .add("sent title body", () => (
    <div style={bgDiv}>
      <ErrorAlert
        status="sent"
        custom_error_props={{
          title: "Kunde inte ansluta till server",
          body: [
            "Återupprepade försök har gjorts, var god kontrollera din anslutning och prova igen.",
            "Om problemet kvarstår kontakta oss via länk nedan."
          ],
          actionLabel: "Kontakta oss",
          actionCB: action("action callback"),
          report_sent_message: "Felrapport har skickats."
        }}
      />
    </div>
  ))
  .add("failed title body", () => (
    <div style={bgDiv}>
      <ErrorAlert
        status="failed"
        custom_error_props={{
          title: "Kunde inte ansluta till server",
          body: [
            "Återupprepade försök har gjorts, var god kontrollera din anslutning och prova igen.",
            "Om problemet kvarstår kontakta oss via länk nedan."
          ],
          actionLabel: "Kontakta oss",
          actionCB: action("action callback"),
          report_sent_message:
            "Det gick inte att skicka felrapport. Kontakta gärna oss direkt."
        }}
      />
    </div>
  ));
