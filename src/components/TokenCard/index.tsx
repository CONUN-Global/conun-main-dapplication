import React, { useEffect } from "react";
import { Slide } from "pure-react-carousel";
import classNames from "classnames";

import useAppCurrentUser from "../../hooks/useAppCurrentUser";

import styles from "./TokenCard.module.scss";

const { api } = window;

interface TokenCardProps {
  token: {
    token: string;
    useBalance: () => {
      balance: {
        payload: number;
      };
      loading: boolean;
      refetch: () => void;
      isFetching: boolean;
    };
  };
  i: number;
}

function TokenCard({ token, i }: TokenCardProps) {
  const { currentUser } = useAppCurrentUser();

  const { balance, refetch } = token?.useBalance();

  useEffect(() => {
    api.listenToRefetchRequest(async () => {
      await refetch();
    });
  }, []);

  return (
    <Slide innerClassName={styles.CardContainer} index={i}>
      <div className={classNames(styles.Card, styles[token?.token])}>
        <span className={styles.Network}>Ethereum Network</span>
        <div className={styles.BalanceContainer}>
          <div className={styles.Balance}>{balance?.payload}</div>
          <span className={styles.TokenName}>{token.token}</span>
        </div>
        <div className={styles.WalletAddressContainer}>
          <div className={styles.WalletAddress}>
            {currentUser?.walletAddress}
          </div>
          <span className={styles.WalletLabel}>Wallet Id</span>
        </div>
        <span className={styles.UserName}>{currentUser.name}</span>
      </div>
    </Slide>
  );
}

export default TokenCard;