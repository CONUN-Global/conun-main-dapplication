import React from "react";
import { useForm } from "react-hook-form";

import Button from "../Button";
import FormInput from "../Form/HookForm/FormInput";

import useDbUser from "../../hooks/useDbUser";

import Modal from "../Modal";

import styles from "./ConfirmPasswordModal.module.scss";

function ConfirmPasswordModal({ isOpen, onClose, onSuccess }) {
  const { user } = useDbUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = () => {
    onSuccess();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.Title}>Input your password to continue</p>
        <FormInput
          name="password"
          type="password"
          register={register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            validate: {
              shouldMatch: (value) =>
                value !== user?.pass ? "Incorrect password" : "" || true,
            },
          })}
          label="Password"
          error={errors.password}
        />
        <Button type="submit">Next</Button>
      </form>
    </Modal>
  );
}

export default ConfirmPasswordModal;
