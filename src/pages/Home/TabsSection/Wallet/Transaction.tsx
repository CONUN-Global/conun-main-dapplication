import React, { useEffect } from "react";
import classNames from "classnames";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import FormInput from "../../../../components/Form/HookForm/FormInput";
import Input from "../../../../components/Form/Input";
import Switch from "../../../../components/Switch";
import Button from "../../../../components/Button";

import useCurrentToken from "../../../../hooks/useCurrentToken";
import useTransferFee from "../../../../hooks/useTransferFee";

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
  const token = useCurrentToken();
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    reset,
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
  };

  const hasFee = token.token !== "conx";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.Transaction}>
      <FormInput
        name="amount"
        autoComplete="amount"
        formRef={register({
          required: {
            value: true,
            message: "Please specify an amount",
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
        name="to"
        autoComplete="to"
        formRef={register({
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
            render={({ value, onChange }) => (
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
                name="gasLimit"
                wrapperStyles={styles.GasInput}
                defaultValue={data?.payload?.average?.gas_limit}
                label="Gas Limit"
                formRef={register({
                  required: {
                    value: watchIsAdvanced,
                    message: "Gas limit is required",
                  },
                })}
                error={errors.gasLimit}
              />

              <FormInput
                name="gasPrice"
                wrapperStyles={styles.GasInput}
                defaultValue={data?.payload?.average?.gas_price}
                type="number"
                formRef={register({
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
                readOnly
                value={
                  watchGasFee.gasLimit &&
                  watchGasFee.gasPrice &&
                  (watchGasFee?.gasPrice * watchGasFee?.gasLimit) / 1000000000
                }
              />
            </div>
          ) : (
            <Controller
              control={control}
              name="fee"
              defaultValue="average"
              render={({ onChange, value }) => (
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
    </form>
  );
}

export default Transaction;
