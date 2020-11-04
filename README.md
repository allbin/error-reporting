# Error reporting

## Usage example
```
import ErrorReporting, { setConfig } from "error-reporting";

setConfig({
  header: "*ErrorReporting development repository.*",
  slack_webhook: <my slack webhook>
});

ReactDOM.render(
  <ErrorReporting>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ErrorReporting>,
  document.getElementById("root")
);
```
