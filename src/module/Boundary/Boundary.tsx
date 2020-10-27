import React from "react";
import { ErrorStatus, getConfig } from "../";
import { ReactError } from "../interfaces";
import { DefaultErrorAlert, ErrorAlertProps } from "../DefaultErrorAlert";
import { listeners, setError } from "../listener";
export interface ERProps {
  ErrorAlert?: React.FC<ErrorAlertProps>;
  language?: "sv-SE" | "en-US";
  onClose?: () => void;
}
export interface ERState {
  hasError: boolean;
  status: ErrorStatus | null;
}

export class ErrorBoundary extends React.Component<ERProps, ERState> {
  constructor(props: ERProps) {
    super(props);

    this.state = {
      hasError: false,
      status: null,
    };
  }

  componentWillMount(): void {
    listeners.push((status) => {
      this.errorListener(status);
    });
  }

  errorListener(status: ErrorStatus): void {
    //This is to ensure component will re-render when the status of error changes.

    this.setState({
      hasError: true,
      status: status,
    });
  }

  componentDidCatch(err: ReactError, info: React.ErrorInfo): void {
    this.setState({
      hasError: true,
    });

    err.component_trace = info.componentStack;
    setError(err);
  }

  componentWillUnmount(): void {
    //Remove listener callback so that we don't get called after we're removed or are kept in memory for no reason.
    const listenerIndex = listeners.findIndex(
      (listener) => listener === this.errorListener
    );
    if (listenerIndex > -1) {
      listeners.splice(listenerIndex, 1);
    }
  }

  onClose() {
    window.location.href = "/";
  }

  render() {
    const EA = this.props.ErrorAlert || DefaultErrorAlert;
    if (this.state.hasError && EA) {
      return (
        <EA
          status={this.state.status || "detected"}
          language={this.props.language || getConfig().language}
          onClose={this.props.onClose || this.onClose}
        />
      );
    } else if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
