import React from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider } from "react-query";
import { HashRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { queryClient } from "./react-query/config";

import App from "./App";

import styles from "./renderer.module.scss";

import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <App />
      <ToastContainer bodyClassName={styles.ToastBody} />
    </Router>
  </QueryClientProvider>,
  document.getElementById("app")
);
