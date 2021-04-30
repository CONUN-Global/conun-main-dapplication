import React from "react";
import classNames from "classnames";

import Footer from "./Footer";
import SettingsSidebar from "./SettingsSidebar";
import RecentTransactions from "./RecentTransactions";
import Spinner from "../Spinner";

import useCurrentUser from "../../hooks/useCurrentUser";
import useAppCurrentUser from "../../hooks/useAppCurrentUser";
import { useAppContext } from "../AppContext";

import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useAppContext();

  const { isLoading } = useCurrentUser();
  const { isLoading: appUserLoading } = useAppCurrentUser();

  return (
    <>
      {isLoading || appUserLoading ? (
        <div className={styles.SpinnerContainer}>
          <Spinner />
        </div>
      ) : (
        <>
          {isAuthenticated && <SettingsSidebar />}
          <div
            className={classNames(styles.Layout, {
              [styles.isAuthenticated]: isAuthenticated,
            })}
          >
            {children}
          </div>
          <Footer />
          {isAuthenticated && <RecentTransactions />}
        </>
      )}
    </>
  );
}

export default Layout;
