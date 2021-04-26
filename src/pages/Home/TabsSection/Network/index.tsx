import React from "react";

import Button from "../../../../components/Button";

import DriveIcon from "../../../../assets/icons/drive.svg";

import styles from "./Network.module.scss";

const { api } = window;

function Network() {
  return (
    <div className={styles.Network}>
      <div className={styles.RunningApps}>
        <span className={styles.Label}>Running Apps</span>
        <div className={styles.AppsList}>
          <Button type="button" onClick={() => api.openDrive()} noStyle>
            <DriveIcon className={styles.AppIcon} />
          </Button>
        </div>
      </div>
      <div className={styles.PeerIdContainer}>
        <span className={styles.Label}>Peer Id</span>
        <span className={styles.PeerId}>388ULKD83257JJUH0923800T34V7302</span>
      </div>
      <div className={styles.NodesContainer}>
        <p className={styles.Label}>
          <span className={styles.Node} /> 2 Nodes
        </p>
        <span className={styles.Status}>Online</span>
      </div>
    </div>
  );
}

export default Network;
