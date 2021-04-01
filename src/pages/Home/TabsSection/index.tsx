import React, { useState } from "react";
import classNames from "classnames";

import Network from "./Network";
import Wallet from "./Wallet";

import styles from "./TabsSection.module.scss";

const tabs = {
  network: {
    id: "network",
    component: Network,
  },
  wallet: {
    id: "wallet",
    component: Wallet,
  },
};

function TabsSection() {
  const [currentTab, setCurrentTab] = useState(tabs.wallet.id);

  const Component = tabs[currentTab].component;
  return (
    <div className={styles.TabsSection}>
      <div className={styles.Tabs}>
        <button
          onClick={() => setCurrentTab(tabs.network.id)}
          className={classNames(styles.Tab, {
            [styles.active]: currentTab === tabs.network.id,
          })}
        >
          Network
        </button>
        <button
          onClick={() => setCurrentTab(tabs.wallet.id)}
          className={classNames(styles.Tab, {
            [styles.active]: currentTab === tabs.wallet.id,
          })}
        >
          Wallet
        </button>
      </div>
      <Component />
    </div>
  );
}

export default TabsSection;
