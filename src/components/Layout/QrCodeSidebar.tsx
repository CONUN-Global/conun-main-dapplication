import React from "react";

import styles from "./QrCodeSidebar.module.scss";

function QrCodeSidebar() {
  return (
    <div className={styles.Sidebar}>
      <div className={styles.QrButtonWrapper}>
        <div className={styles.QrButtonCurveRight} />
        <button className={styles.QrButton}>QR</button>
        <div className={styles.QrButtonCurveLeft} />
      </div>
    </div>
  );
}

export default QrCodeSidebar;
