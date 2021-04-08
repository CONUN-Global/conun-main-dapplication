import { motion } from "framer-motion";
import { formatDistance } from "date-fns";
import React from "react";
import { useQuery } from "react-query";
import { useAppContext } from "../../AppContext";

import OutsideClickHandler from "../../OutsideClickHandler";

import styles from "./RecentTransactions.module.scss";

const { api } = window;

const variants = {
  open: { y: 0 },
  closed: { y: 339 },
};

function RecentTransactions() {
  const { handleTransactionsBar, isTransactionsOpen } = useAppContext();

  const { data } = useQuery(
    "get-recent-transactions",
    async () => api.getRecentTransactions(),
    {
      cacheTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
    }
  );

  return (
    <OutsideClickHandler onClickOutside={() => handleTransactionsBar(false)}>
      <motion.div
        className={styles.RecentTransactions}
        animate={isTransactionsOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <p className={styles.Title}>Recent Transactions</p>
        <div className={styles.Transactions}>
          {data?.list?.length ? (
            data?.list?.map((tx) => (
              <div key={tx?.txId} className={styles.Transaction}>
                <span>Icon</span>
                <span className={styles.Amount}>
                  {tx.amount} {tx.token}
                </span>
                <span className={styles.Date}>
                  {formatDistance(new Date(tx.date), new Date(), {
                    addSuffix: true,
                  })}
                </span>
                <a
                  href={
                    tx.token === "conx"
                      ? `https://conscan.conun.io/txns/${tx.txId}`
                      : `https://ropsten.etherscan.io/tx/${tx.txId}`
                  }
                  className={styles.TransactionLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  more
                </a>
              </div>
            ))
          ) : (
            <div className={styles.Transaction}>
              <span className={styles.NoTransactions}>
                No transactions recorded
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </OutsideClickHandler>
  );
}

export default RecentTransactions;
