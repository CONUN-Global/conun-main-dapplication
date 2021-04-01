import React from "react";
import classNames from "classnames";

import Footer from "./Footer";
import SettingsSidebar from "./SettingsSidebar";

import { useAppContext } from "../AppContext";

import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { isAuthenticated, isSettingsOpen } = useAppContext();

  return (
    <>
      {isSettingsOpen && <SettingsSidebar />}
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
