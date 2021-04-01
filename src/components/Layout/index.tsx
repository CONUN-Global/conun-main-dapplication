import React from "react";
import classNames from "classnames";

import TopBar from "./TopBar";
import Footer from "./Footer";

import { useAppContext } from "../AppContext";

import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useAppContext();

  return (
    <>
      <div
        className={classNames(styles.Layout, {
          [styles.isAuthenticated]: isAuthenticated,
        })}
      >
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
