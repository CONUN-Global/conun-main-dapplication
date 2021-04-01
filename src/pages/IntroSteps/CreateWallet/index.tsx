import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Button from "../../../components/Button";
import FormInput from "../../../components/Form/HookForm/FormInput";

import Arrow from "../../../assets/icons/arrow.svg";

import { WALLET_TYPE } from "../../../const";
import { useMutation } from "react-query";

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
  const { register, getValues, errors, handleSubmit } = useForm<FormData>();

  const { mutateAsync: create, isLoading } = useMutation((password: string) =>
    createWallet(password)
  );

  const onSubmit: SubmitHandler<FormData> = async ({ password }) => {
    const res = await create(password);

    if (res?.success) {
      setCurrentStep("success");
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
      <div className={styles.Title}>Set-up a Password</div>
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
