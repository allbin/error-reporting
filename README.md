# ErrorReporting

### Index

[Import](#import)  
[Utilities](#er-utilities)  
[Config](#error-reporting-config)  
[Manually trigger errors](#manually-triggered-error-report)  
[withErrorReporting HOC](#withErrorReporting)  
[Special Error object properties](#special-error-properties)

# Import

Use `import * as ER from error-reporting` in any file to access the ErrorReporting utilities and components.

# ER utilities

ER exposes a number of functions and one default error alert component.

## Utility functions

`ER.setConfig(<object>)` See [Error reporting config](#error-reporting-config)

`ER.setHeader(<string>)` quick way to set global report header. Same as running `setConfig({ ... header: <string> })`.

`ER.getConfig()` Returns the current config options.

`ER.getError()` Returns the error object if an error has been detected or has been submitted through [`setError(err)`](#manually-triggered-error-report). Otherwise returns null.

`ER.getStatus()` Returns the status of the error report if an error has been detected or submitted. Possible return values are:

- null
- detected - Report is in the process of being composed.
- sent - Report has successfully been sent.
- failed - Report generation or posting to slack has failed.

`ER.setError(<Javascript Exception Object>)` See [Manually triggered error report](#manually-triggered-error-report)

## Error reporting component

`ER.ErrorReporting` The error boundary component. Place your components inside this to catch exceptions in the children. Component properties:

- ErrorAlert: The component shown when an uncaught exception is detected. This component will receive all props from `custom_error_props`.
- callback: The function which is called when an exception is detected. It should return an object with the following properties:
  - prefix: A string which is prefixed to the error report sent.
  - custom_error_props: An object which is accessible in the ErrorAlert component.
    Example:

```js
import * as ER from "error-reporting";
import MainView from "MainView";
import Auth from "Auth";
const ComponentX = () => {
  const callback = () => {
    return {
      prefix: "myError report prefix",
      custom_error_props: {
        title: "error title shown to user",
        body: ["error body shown to user"],
        action_label: "label on alert button",
        actionCB: () => {
          // Send user to home screen etc.
        }
      }
    };
  };
  return (
    <ER.ErrorReporting callback={callback} ErrorAlert={ER.ErrorAlert}>
      <Auth>
        <MainView />
      </Auth>
    </ER.ErrorReporting>
  );
};
```

# Error reporting config

Configure ErrorReporting by running `ER.setConfig(config_object)` with the possible properties listed below. The object extends the default config and overwrites previous values.

## Config options

`slack_webhook: <slack webhook url, required>`
The url to which the error is posted.

`disable_slack_posting: <bool, default false>`
Use for disabling posting, for example during development.

`header <string, default null>`
A string prepended to the error message body.

`max_network_request_data <int, default 400>`
In the case of a network error the message includes data from the request if there is any. However that may be of any size, default will only include the first 400 characters.

`override_window_onerror <bool, default false>`
Set to true to override any other listener attached to window.onerror.

## Example

```
ER.setConfig({
    slack_webhook: https://hooks.slack.com/services/ABC/DEF123,
    override_window_onerror: true
});
```

# Manually triggered error report

There are instances where it may not be possible to trigger a global (window) error, the error may be caught or silenced by a framework for example.  
In these cases it may be useful to trigger an error report manually.

Use function `ER.setError(error_object)` to trigger an ErrorReport where `error_object` is a Javascript exception object. This will also show any defined ErrorAlert.

# Special Error properties

In order to communicate what kind of error has been caught there are some special properties that ER are putting on the Javascript Exception Object (err_obj) itself.

## Axios

When using Axios to make network requests there may be additional information on the err_obj, however depending on what failed they are not guaranteed. For this reason **YOU** are required to put the property `network_error: true` on the err_obj manually before it is thrown or submitted through [`ER.setError()`](#manually_triggered_error_report).  
This will ensure that the error report contains available request data and parameters.

**NOTE:** Axios adds its own properties to the err_obj: `config`, `response`, `request`. Make sure you do not manually overwrite them!

Example:

```
function myApiCall() {
    return new Promise((resolve, reject) => {
        axios({...}).then((res) => {
            resolve(res);
        }).catch((err) => {
            err.network_error = true;
            reject(err);
        });
    });
}
```

## ER Internal properties

Internally ER may add the properties:

- `additional_message` - Used when error was detected by the window listener and not the React error boundary.
- `component_trace` - Used to store Component Trace information from the React error boundary.
