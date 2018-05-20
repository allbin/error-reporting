# ErrorReporting
### Index
[Import](#import)  
[Utilities](#er-utilities)  
[Config](#error-reporting-config)  
[Manually trigger errors](#manually-triggered-error-report)  
[withErrorReporting HOC](#withErrorReporting)  
[Special Error object properties](#special-error-properties)




# Import
Use `import ER from error-reporting` in any file to access the ErrorReporting utlities and components.




# ER utilities
ER exposes a number of functions and one default error component.

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

## Wrapper HOC (Higher Order Component)
`ER.withErrorReporting(<WrappedComponent>, <ErrorComponent>, error_callback_function)` See [withErrorReporting](#withErrorReporting)

## Components

`ER.ErrorAlert` A default alert component to let the user know what has happened and what the progress of the error report is. Used as the 2nd argument (ErrorComponent) in the `withErrorReporting` wrapper function. See example in [withErrorReporting](#withErrorReporting) section.





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





# withErrorReporting
Wrapper function run as `ER.withErrorReporting(WrappedComponent, ErrorAlert, callback)`. This function returns a new component (a HOC) which can be used like any other React Component and contains a React error boundary as well as the ability to display any ErrorAlert that has been supplied.

## Arguments
### WrappedComponent
`WrappedComponent<React Component, required>`  
The component which is displayed when there is no error. This component can access all ER functionality through `this.props.error_reporting`, the same as *import ER from error-reporting*.

### ErrorAlert
`ErrorAlert<React Component, optional>`  
A component which will be displayed when an error has been automatically caught or manually set through [`ER.setError()`](#manually-triggered-error-report). The **ErrorAlert is rerendered whenever the status of the error report changes**.  
If no ErrorAlert is provided the HOC will render `null`.

The ErrorAlert component receives three props:

`this.props.error_reporting` the ER object with all functionality. Use *this.props.error_reporting.getError()* to get the error object if you need to access any custom error properties set on it.

`this.props.status` the status of the current error report, same as running *this.props.error_reporting.getStatus()*.

`this.props.custom_error_props` an object with the response from [callback, see below](#callback). If no callback is provided, or callback doesn't return any custom_error_props this props is an empty object.

### Callback
`callback<function, optional>`  
A callback which is called every time the status of the error report changes, before the ErrorAlert is rendered or rerendered.
Return an object from the callback with the property `prefix` to prepend the value to the error report. Use the property `custom_error_props` to send those props to the ErrorAlert as `this.props.custom_error_props`.
This is a good place to add things like user info.

**NOTE:** Only on status `detected` will the `prefix` property be used when the error report message is prepared.  
**NOTE:** All *withErrorReporting()* used which returns a prefix value from the callback will be prepended, meaning multiple withErrorReporting can contribute information to be prefixed to error message body.

Example callback function  
Example would add **"User id: .... Token age: ...."** between the specified error report Header and the Body (error message and trace respectively).
And inside ErrorAlert the custom error props can be accessed like `this.props.custom_error_props[...]`.
```
() => {
    let icon = detected_icon;
    if (ER.getStatus() !== detected) {
        icon = (ER.getStatus() === "sent") ? sent_icon : failed_icon;
    }

    return {
        prefix: "User id: " + window.user_id + " Token age: " + window.token.age,
        custom_error_props: {
            error_icon: icon,
            confirm_action: () => { window.location.href = "/"; },
            confirm_label: "Go to start page"
        }
    };
}
```
**NOTE:** Use `ER.getError()` inside the callback function to get the [Javascript Exception object](#special-error-properties) and any properties set on it.



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

## Custom properties
You may add any additional properties you want to the err_obj. The err_obj is always available in the [callback](#callback) and to the [ErrorAlert](#ErrorAlert).

This can be useful when information is available to the place where the error is caught that is not available anywhere else. It can then be included on the err_obj.  
In the [callback](#callback) this information can be prefixed to the error report or passed on to the ErrorAlert for the user to see.