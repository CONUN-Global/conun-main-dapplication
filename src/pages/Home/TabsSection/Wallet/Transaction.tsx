import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import classNames from "classnames";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import FormInput from "../../../../components/Form/HookForm/FormInput";
import Input from "../../../../components/Form/Input";
import Switch from "../../../../components/Switch";
import Button from "../../../../components/Button";
import ConfirmPasswordModal from "../../../../components/ConfirmPasswordModal";

import useCurrentToken from "../../../../hooks/useCurrentToken";
import useTransferFee from "../../../../hooks/useTransferFee";
import useCheckTransferWindow from "../../../../hooks/useCheckTransferWindow";
import useDbUser from "../../../../hooks/useDbUser";

import styles from "./Transaction.module.scss";

const { api } = window;

const speeds = [
  { id: "slow", label: "Slow", default: "0.000059" },
  { id: "average", label: "Average", default: "0.000069" },
  { id: "fast", label: "Fast", default: "0.000073" },
];

type FormData = {
  type: string;
  amount: number;
  to: string;
  fee: string;
  gasPrice: number;
  gasLimit: number;
  isAdvanced: boolean;
};

function Transaction() {
  const [isConfirmPasswordModalOpen, setIsConfirmPasswordModalOpen] =
    useState(false);

  const token = useCurrentToken();

  const { balance } = token.useBalance();

  const { user } = useDbUser();

  const { checkTransferWindow } = useCheckTransferWindow();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
    trigger,
  } = useForm<FormData>({
    defaultValues: {
      type: "ETH",
      fee: "average",
      isAdvanced: false,
    },
  });

  const watchTo = watch("to");
  const watchIsAdvanced = watch("isAdvanced");
  const watchGasFee = watch(["gasLimit", "gasPrice"]);
  const watchAmount = watch("amount", 0);

  const { data } = useTransferFee({
    to: watchTo,
    amount: watchAmount,
    token: token.token,
  });

  useEffect(() => {
    // Reset form on token change
    reset({
      amount: null,
    });
  }, [token]);

  useEffect(() => {
    // Reset form after succesful
    api.listenToRefetchRequest(async () => {
      reset({
        amount: null,
      });
    });
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    const isAlreadyOpen = await checkTransferWindow();

    if (isAlreadyOpen) {
      toast.warning("Only one transaction window can be open at the same time");
    } else {
      const fee = values.isAdvanced
        ? (values.gasPrice * values.gasLimit) / 1000000000
        : data?.payload?.[values.fee]?.total;

      const gasLimit = values.isAdvanced
        ? values.gasLimit
        : data?.payload?.[values?.fee]?.gas_limit;

      const gasPrice = values.isAdvanced
        ? +values.gasPrice
        : data?.payload?.[values?.fee]?.gas_price;

      api.openTransferWindow({
        ...values,
        fee,
        gasLimit,
        gasPrice,
        token: token.token,
      });
    }
  };

  const hasFee = token.token !== "conx";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.Transaction}>
        <FormInput
          autoComplete="amount"
          register={register("amount", {
            required: {
              value: true,
              message: "Please specify an amount",
            },
            validate: {
              moreThanZero: (value) =>
                Number(value) <= 0
                  ? "Amount should be more than 0"
                  : "" || true,
              lessThanTotalBalance: (value) =>
                Number(value) > Number(balance.payload)
                  ? "You don't have enough balance"
                  : "" || true,
            },
          })}
          wrapperStyles={styles.Input}
          type="number"
          label="Amount"
          step="0.0001"
          min={0}
          error={errors.amount}
        />
        <FormInput
          autoComplete="to"
          register={register("to", {
            required: {
              value: true,
              message: "Please specify an address",
            },
          })}
          wrapperStyles={styles.Input}
          label="To Address"
          error={
            !hasFee || data?.success || !watchTo
              ? errors.to
              : { type: "validate", message: "Address not valid" }
          }
        />
        {hasFee && data && (
          <>
            <Controller
              name="isAdvanced"
              control={control}
              defaultValue={!!watchIsAdvanced}
              render={({ field: { value, onChange } }) => (
                <Switch
                  id="advanced-switch"
                  label="Advanced Options"
                  className={styles.Switch}
                  checked={value}
                  onChange={onChange}
                />
              )}
            />
            {watchIsAdvanced ? (
              <div className={styles.AdvancedOptions}>
                <FormInput
                  wrapperStyles={styles.GasInput}
                  defaultValue={data?.payload?.average?.gas_limit}
                  type="number"
                  label="Gas Limit"
                  register={register("gasLimit", {
                    required: {
                      value: watchIsAdvanced,
                      message: "Gas limit is required",
                    },
                  })}
                  error={errors.gasLimit}
                />

                <FormInput
                  wrapperStyles={styles.GasInput}
                  defaultValue={data?.payload?.average?.gas_price}
                  type="number"
                  register={register("gasPrice", {
                    required: {
                      value: watchIsAdvanced,
                      message: "Gas price is required",
                    },
                  })}
                  label="Gas Price"
                  error={errors.gasPrice}
                />
                <Input
                  id="calculatedFee"
                  wrapperStyles={styles.GasInput}
                  label="Gas Fee"
                  type="number"
                  defaultValue={
                    (data?.payload?.average?.gas_price *
                      data?.payload?.average?.gas_limit) /
                    1000000000
                  }
                  readOnly
                  value={
                    watchGasFee?.[0] &&
                    watchGasFee?.[1] &&
                    (watchGasFee?.[1] * watchGasFee?.[0]) / 1000000000
                  }
                />
              </div>
            ) : (
              <Controller
                control={control}
                name="fee"
                defaultValue="average"
                render={({ field: { onChange, value } }) => (
                  <div className={styles.SpeedPicker}>
                    {speeds.map((speed) => (
                      <button
                        key={speed.id}
                        type="button"
                        onClick={() => onChange(speed.id)}
                        className={classNames(styles.Speed, {
                          [styles.active]: value === speed.id,
                        })}
                      >
                        <div className={styles.SpeedLabel}>{speed.label}</div>
                        <div className={styles.SpeedValue}>
                          {data?.payload?.[speed.id]?.total} {token.token}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              />
            )}
          </>
        )}
        {user?.askForPassword ? (
          <Button
            className={classNames(styles.ConfirmButton, {
              [styles.hasFee]: hasFee && data,
            })}
            type="button"
            onClick={async () => {
              const isValid = await trigger();
              if (isValid) {
                setIsConfirmPasswordModalOpen(true);
              }
            }}
            round
            variant="secondary"
          >
            Next
          </Button>
        ) : (
          <Button
            className={classNames(styles.ConfirmButton, {
              [styles.hasFee]: hasFee && data,
            })}
            type="submit"
            round
            variant="secondary"
          >
            Next
          </Button>
        )}
      </form>
      <ConfirmPasswordModal
        isOpen={isConfirmPasswordModalOpen}
        onClose={() => setIsConfirmPasswordModalOpen(false)}
        onSuccess={handleSubmit(onSubmit)}
      />
    </>
  );
}

export default Transaction;
