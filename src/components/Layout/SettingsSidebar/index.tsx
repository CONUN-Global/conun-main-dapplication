import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppContext } from "../../AppContext";

import Button from "../../Button";
import OutsideClickHandler from "../../OutsideClickHandler";

import ConunLogo from "../../../assets/icons/conun-logo-letter.svg";

import styles from "./SettingsSidebar.module.scss";

const tabs = [
  {
    id: "dicord",
    label: "Connect to Discord",
    to: "https://discord.gg/sUBkJJTB8y",
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
        initial="closed"
        variants={variants}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className={styles.LogoContainer}>
          <ConunLogo className={styles.ConunLogo} />
        </div>
        <div className={styles.TopButtons}>
          <Button className={styles.TopButton} onClick={onLogout} noStyle>
            Logout
          </Button>
        </div>
        <div className={styles.Tabs}>
          {tabs.map((tab) => (
            <a
              className={styles.Tab}
              key={tab.id}
              href={tab.to}
              target="_blank"
              rel="noreferrer"
            >
              {tab.label}
            </a>
          ))}
        </div>
      </motion.div>
    </OutsideClickHandler>
  );
}

export default SettingsSidebar;
