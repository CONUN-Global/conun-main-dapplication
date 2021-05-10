import React from "react";
import classNames from "classnames";

import Button from "../../Button";

import { useAppContext } from "../../AppContext";
import useGetAppVersion from "../../../hooks/useGetAppVersion";
import useGetLatestRelease from "../../../hooks/useGetLatestRelease";

import History from "../../../assets/icons/history.svg";

import styles from "./Footer.module.scss";

function Footer() {
  const { isAuthenticated, handleTransactionsBar } = useAppContext();
  const { version } = useGetAppVersion();

  const { latestVersion } = useGetLatestRelease();

  const isUpToDate = version === latestVersion;

  return (
    <div
      className={classNames(styles.Footer, {
        [styles.isAuthenticated]: isAuthenticated,
      })}
    >
      <div className={styles.Versioning}>
        <div className={styles.Version}>Version {version}</div>
        {!isUpToDate && (
          <a
            target="_blank"
            href="https://dappstore.conun.io/"
            rel="noreferrer"
            className={styles.Updates}
          >
            Update available
          </a>
        )}
      </div>
      {isAuthenticated && (
        <Button
          type="button"
          onClick={() => handleTransactionsBar(true)}
          className={styles.HistoryButton}
          noStyle
        >
          <History className={styles.HistoryIcon} />
        </Button>
      )}
    </div>
  );
}

export default Footer;
