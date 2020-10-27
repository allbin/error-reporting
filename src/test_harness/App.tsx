import React, { useState, FC } from "react";
import axios from "axios";
import { getConfig, setConfig } from "../module";

const btn_style = {
  display: "inline-block",
  border: "2px solid red",
  cursor: "pointer",
  padding: "4px",
  margin: "5px",
};
const input_style = {
  display: "inline-block",
  border: "1px solid black",
  padding: "4px",
  margin: "5px",
};

const createNetworkErrorOptions = async () => {
  const stack = new Error().stack;
  try {
    await axios.request({
      url: "https://scb.allbin.se/employment_by_square?dataset_id=-1",
      // url: "https://scb.allbin.se/failing_route",
      params: {
        error_param1: 1,
        error_param2: "error_param2",
      },
      data: {
        text:
          "This is an object with text, sent along with ErrorReporting axios error testing request.",
      },
    });
  } catch (err) {
    err.stack = stack;
    throw err;
  }
};
const createNetworkError404 = async () => {
  const stack = new Error().stack;
  try {
    await axios.request({
      url: "/route-that-doesnt-exist",
      params: {
        error_param1: 1,
        error_param2: "error_param2",
      },
      data: {
        text:
          "This is an object with text, sent along with ErrorReporting axios error testing request.",
      },
    });
  } catch (err) {
    err.stack = stack;
    throw err;
  }
};

const App: FC = () => {
  const [react_error, setReactError] = useState(false);
  const [react_network_error, setReactNetworkError] = useState(false);
  const [disable_posting, setDisablePosting] = useState(
    getConfig().disable_slack_posting
  );
  const [webhook, setWebhook] = useState(getConfig().slack_webhook || "");
  if (react_error) {
    throw new Error(
      "An error has happened inside a render-cycle of a react component."
    );
  }
  if (react_network_error) {
    createNetworkErrorOptions();
  }
  return (
    <div>
      <div style={{ marginBottom: "50px" }}>
        paste slack webhook:{" "}
        <input
          style={input_style}
          value={webhook}
          onChange={(e) => {
            const v = e.target.value.trim();
            setConfig({
              slack_webhook: v,
            });
            setWebhook(v);
          }}
        />
        <br />
        <span
          style={{ ...btn_style, border: "1px solid black" }}
          onClick={() => {
            setConfig({
              disable_slack_posting: !disable_posting,
            });
            setDisablePosting(!disable_posting);
          }}
        >
          click to toggle sending to slack
        </span>{" "}
        currently: {disable_posting ? "not sending" : "sending"}
      </div>
      <div>
        <big>INSIDE react cycle:</big>
        <br />

        <span
          style={btn_style}
          onClick={() => {
            setReactError(true);
          }}
        >
          click to throw a render error
        </span>
        <span
          style={btn_style}
          onClick={() => {
            setReactNetworkError(true);
          }}
        >
          click to throw a network OPTIONS error
        </span>
      </div>

      <div style={{ marginTop: "50px" }}>
        <big>OUTSIDE react cycle:</big>
        <br />

        <span
          style={btn_style}
          onClick={() => {
            throw new Error(
              "This is a test error from ErrorReporting development repository."
            );
          }}
        >
          click to throw an error
        </span>
        <span
          style={btn_style}
          onClick={() => {
            createNetworkError404();
          }}
        >
          click to throw a 404 network error
        </span>
      </div>
    </div>
  );
};

export default App;
