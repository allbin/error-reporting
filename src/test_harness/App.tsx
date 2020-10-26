import React, { useState, FC } from "react";

const btn_style = {
  border: "1px solid black",
  cursor: "pointer",
  padding: "4px",
  margin: "5px",
};

const App: FC = () => {
  const [react_error, setReactError] = useState(false);
  if (react_error) {
    throw new Error(
      "An error has happened inside a render-cycle of a react component."
    );
  }
  return (
    <div className="App">
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
          setReactError(true);
        }}
      >
        click to throw a react render error
      </span>
    </div>
  );
};

export default App;
