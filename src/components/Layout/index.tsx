import React from "react";
import classNames from "classnames";

import Footer from "./Footer";
import SettingsSidebar from "./SettingsSidebar";
import RecentTransactions from "./RecentTransactions";

import { useAppContext } from "../AppContext";

import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useAppContext();

  return (
    <>
      <SettingsSidebar />
      <div
        className={classNames(styles.Layout, {
          [styles.isAuthenticated]: isAuthenticated,
        })}
      >
        {children}
      </div>
      <Footer />
      <RecentTransactions />
    </>
  );
}

export default Layout;
