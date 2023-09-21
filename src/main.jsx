import React , {useLayoutEffect,useEffect,useId,useState} from "react";
import App from "./App";
import { store } from "@/store";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "./assets/main.less";
import { Button } from "antd";
const container = document.getElementById("app");
const root = createRoot(container);
class Root extends React.Component {
  constructor() {
    super();
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
