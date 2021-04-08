import React, { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import Button from "../../../components/Button";
import Dropzone from "../../../components/Dropzone";
import Input from "../../../components/Form/Input";

import useCurrentUser from "../../../hooks/useCurrentUser";
import useLogin from "../../../hooks/useLogin";
import { useAppContext } from "../../../components/AppContext";

import instance from "../../../axios/instance";
import { ORG_NAME, WALLET_TYPE } from "../../../const";

import { setIndentity } from "../../../helpers/getIdentity";

import styles from "./ExistingWallet.module.scss";

const { api } = window;

function ExistingWallet() {
  const [idFile, setIdFile] = useState(null);
  const [password, setPassword] = useState("");

  const { onLogin } = useAppContext();

  const { currentUser } = useCurrentUser();
  const { login, loading } = useLogin();

  const { mutateAsync: importFile, isLoading } = useMutation(async () => {
    const { data } = await instance.post("/users/importWallet", {
      name: currentUser?.name,
      email: currentUser?.email,
      orgName: ORG_NAME,
      password,
      walletType: WALLET_TYPE,
      x509Identity: idFile,
    });

    return data;
  });

  const onActivate = async () => {
    try {
      const data = await importFile();

      if (data?.success) {
        setIndentity(idFile);

        const data = await login({ password, email: currentUser.email });

        onLogin(data?.payload?.["x-auth-token"]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.payload ?? "An error happened", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };

  const handleUpload = (files) => {
    const file = files?.[0] ?? null;
    const reader = new FileReader();

    if (!file) {
      return;
    }
    reader.onload = async (e) => {
      const data = e?.target?.result;
      if (typeof data === "string") {
        setIdFile(JSON.parse(data));
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <div className={styles.UserBox}>
        <img
          src={currentUser?.picture}
          className={styles.ProfilePicture}
          alt="profile-picture"
        />
        <div className={styles.InfoBox}>
          <span className={styles.Name}>{currentUser?.name}</span>
          <span className={styles.Email}>{currentUser?.email}</span>
        </div>
      </div>
      <div className={styles.Title}>Welcome back {currentUser?.givenName}!</div>
      <div className={styles.Subtitle}>
        Please drag and drop your JSON CONUN wallet file and enter your password
        to login to CONUN Manager.
      </div>
      <Dropzone
        onDrop={(e) => handleUpload(e)}
        className={styles.Dropzone}
        label="Drag and Drop Wallet File"
      />
      <Input
        id="importPassword"
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e?.target?.value)}
        wrapperStyles={styles.PasswordInput}
      />
      <Button
        type="button"
        disabled={!idFile || !password}
        loading={isLoading || loading}
        className={styles.ActivateButton}
        onClick={onActivate}
        round
      >
        Activate
      </Button>
      <Button
        type="button"
        onClick={() => api.logout()}
        noStyle
        className={styles.LogoutButton}
      >
        Not you? Login with a different account.
      </Button>
    </>
  );
}

export default ExistingWallet;
