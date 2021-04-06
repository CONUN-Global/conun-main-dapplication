import React, { useState } from "react";
import classNames from "classnames";

import Swap from "./Swap";
import Transaction from "./Transaction";

import styles from "./Wallet.module.scss";
import Button from "../../../../components/Button";

const actions = {
  transaction: {
    id: "transaction",
    component: Transaction,
  },
  swap: {
    id: "swap",
    component: Swap,
  },
};

function Wallet() {
  const [currentAction, setCurrentAction] = useState(actions.transaction.id);

  const Component = actions[currentAction].component;

  return (
    <div className={styles.Wallet}>
      <div className={styles.ActionSelector}>
        <Button
          noStyle
          onClick={() => setCurrentAction(actions.transaction.id)}
          className={classNames(styles.Action, {
            [styles.active]: currentAction === actions.transaction.id,
          })}
        >
          New Transaction
        </Button>
      </div>
      <Component />
    </div>
  );
}

export default Wallet;
