import React, { useEffect, useState } from "react";

import Button from "../../../../components/Button";

import DriveIcon from "../../../../assets/icons/drive.svg";

import styles from "./Network.module.scss";

const { api } = window;

function Network() {
  const [isDriveOpen, setIsDriveOpen] = useState(false);

  useEffect(() => {
    api.listenIsDriveOpen((status) => {
      setIsDriveOpen(status);
    });
  }, []);

  return (
    <div className={styles.Network}>
      <div className={styles.RunningApps}>
        <span className={styles.Label}>Running Apps</span>
        <div className={styles.AppsList}>
          {isDriveOpen && <DriveIcon className={styles.AppIcon} />}
        </div>
      </div>
      <div className={styles.RunningApps}>
        <span className={styles.Label}>Available Apps</span>
        <div className={styles.AppsList}>
          <Button type="button" onClick={() => api.openDrive()} noStyle>
            <DriveIcon className={styles.AppIcon} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Network;
