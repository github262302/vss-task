import React from "react";
import App from "./App";
import { store } from "@/store";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "./assets/main.less";
const container = document.getElementById("app");
const root = createRoot(container);
class Root extends React.Component {
  constructor() {
    super();
  }
//   getSnapshotBeforeUpdate(prevProps, prevState) {}
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log("shouldComponentUpdate",nextProps)
    return true;
  }
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
root.render(<Root />);
