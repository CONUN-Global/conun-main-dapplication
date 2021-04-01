import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../AppContext";

import Button from "../../Button";
import OutsideClickHandler from "../../OutsideClickHandler";

import styles from "./SettingsSidebar.module.scss";

const tabs = [
  {
    id: "profile",
    label: "Profile",
    to: "/profile",
  },
  {
    id: "privacy",
    label: "Privacy",
    to: "/privacy",
  },
  {
    id: "faqs",
    label: "FAQs",
    to: "/faqs",
  },
  {
    id: "dicord",
    label: "Connect to Discord",
    to: "/dicord",
  },
];

function SettingsSidebar() {
  const { handleSettingsSidebar } = useAppContext();

  return (
    <OutsideClickHandler onClickOutside={handleSettingsSidebar}>
      <div className={styles.SettingsSidebar}>
        <div className={styles.LogoContainer}>Logo</div>
        <div className={styles.TopButtons}>
          <Button className={styles.TopButton} noStyle>
            Disable Networks
          </Button>
          <Button className={styles.TopButton} noStyle>
            Lougout
          </Button>
        </div>
        <div className={styles.Tabs}>
          {tabs.map((tab) => (
            <Link className={styles.Tab} key={tab.id} to={tab.to}>
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
}

export default SettingsSidebar;
