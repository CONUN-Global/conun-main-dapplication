import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { useHistory } from "react-router";

import Button from "../../../components/Button";
import FormInput from "../../../components/Form/HookForm/FormInput";

import { useAppContext } from "../../../components/AppContext";
import useLogin from "../../../hooks/useLogin";

import Arrow from "../../../assets/icons/arrow.svg";

import { setIndentity } from "../../../helpers/getIdentity";

import { WALLET_TYPE } from "../../../const";

import { StepProps } from "..";

import styles from "./CreateWallet.module.scss";

const { api } = window;

async function createWallet(password) {
  const data = await api.createWallet({ password, walletType: WALLET_TYPE });

  return data;
}

interface FormData {
  password: string;
  confirmPassword: string;
}

function CreateWallet({ setCurrentStep }: StepProps) {
  const { onLogin } = useAppContext();
  const { register, getValues, errors, handleSubmit } = useForm<FormData>();

  const { mutateAsync: create, isLoading } = useMutation((password: string) =>
    createWallet(password)
  );

  const { login } = useLogin();

  const history = useHistory();

  const onSubmit: SubmitHandler<FormData> = async ({ password }) => {
    const res = await create(password);

    if (res?.success) {
      setIndentity(res?.payload?.x509Identity);

      const data = await login({ password, email: res?.payload?.user?.email });
      onLogin(data?.payload?.["x-auth-token"]);
      history.replace("/success");
    }
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setCurrentStep("importWallet")}
        className={styles.BackButton}
        noStyle
      >
        <Arrow className={styles.Arrow} />
      </Button>
      <div className={styles.Title}>Password Setup</div>
      <div className={styles.Subtitle}>
        To create a new wallet,
        <br /> please set your wallet password.
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="password"
          formRef={register({
            required: { value: true, message: "Password is required" },
            minLength: {
              value: 5,
              message: "Password must be at least 5 characters long",
            },
          })}
          error={errors.password}
          type="password"
          wrapperStyles={styles.Password}
          label="Create a Password"
        />
        <FormInput
          name="confirmPassword"
          formRef={register({
            required: { value: true, message: "Confirm your password" },
            validate: {
              passwordMatch: (value) =>
                value !== getValues().password
                  ? "Passwords should match"
                  : "" || true,
            },
          })}
          error={errors.confirmPassword}
          type="password"
          wrapperStyles={styles.ConfirmPassword}
          label="Confirm Password"
        />

        <Button type="submit" loading={isLoading} variant="secondary" round>
          Save Password
        </Button>
      </form>
    </>
  );
}

export default CreateWallet;
