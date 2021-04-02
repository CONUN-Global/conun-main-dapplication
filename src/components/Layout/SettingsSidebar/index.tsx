import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

const variants = {
  open: { x: 0 },
  closed: { x: 200 },
};

function SettingsSidebar() {
  const { handleSettingsSidebar, isSettingsOpen, onLogout } = useAppContext();

  return (
    <OutsideClickHandler onClickOutside={() => handleSettingsSidebar(false)}>
      <motion.div
        className={styles.SettingsSidebar}
        animate={isSettingsOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className={styles.LogoContainer}>Logo</div>
        <div className={styles.TopButtons}>
          <Button className={styles.TopButton} noStyle>
            Disable Networks
          </Button>
          <Button className={styles.TopButton} onClick={onLogout} noStyle>
            Logout
          </Button>
        </div>
        <div className={styles.Tabs}>
          {tabs.map((tab) => (
            <Link className={styles.Tab} key={tab.id} to={tab.to}>
              {tab.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </OutsideClickHandler>
  );
}

export default SettingsSidebar;
