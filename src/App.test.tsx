import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders todo", () => {
  const { getByText } = render(<App />);
  const todo_element = getByText(/todo/i);
  expect(todo_element).toBeInTheDocument();
});
