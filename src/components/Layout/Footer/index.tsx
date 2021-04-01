import React from "react";
import classNames from "classnames";

import { useAppContext } from "../../AppContext";

import History from "../../../assets/icons/history.svg";

import styles from "./Footer.module.scss";

function Footer() {
  const { isAuthenticated } = useAppContext();

  return (
    <div
      className={classNames(styles.Footer, {
        [styles.isAuthenticated]: isAuthenticated,
      })}
    >
      <div className={styles.Versioning}>
        <div className={styles.Version}>Version 1.2</div>
        {isAuthenticated && (
          <div className={styles.Updates}>2 updates available</div>
        )}
      </div>
      {isAuthenticated && (
        <button type="button" className={styles.HistoryButton}>
          <History className={styles.HistoryIcon} />
        </button>
      )}
    </div>
  );
}

export default Footer;
