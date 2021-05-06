import React, { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import useDbUser from "../../../../hooks/useDbUser";
import Button from "../../../Button";

import Checkbox from "../../../Form/Checkbox";
import FormInput from "../../../Form/HookForm/FormInput";
import Modal from "../../../Modal";

import styles from "./PasswordSettingsModal.module.scss";

const { api } = window;

interface FormData {
  password: string;
  askForPassword: boolean;
}

function PasswordSettingsModal({ isOpen, onClose }) {
  const { user, refetch } = useDbUser();
  const { register, errors, handleSubmit, control, reset } = useForm<FormData>({
    defaultValues: {
      password: "",
      askForPassword: user?.askForPassword,
    },
  });

  useEffect(() => {
    reset({
      password: "",
      askForPassword: user?.askForPassword,
    });
  }, [user]);

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    await api.setCurrentUser({
      askForPassword: values.askForPassword,
    });

    refetch();

    toast.success("Changes saved", {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true,
    });

    onClose();
    reset({
      password: "",
      askForPassword: user?.askForPassword,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.ModalContent}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
        <p className={styles.Title}>Security Settings</p>
        <Controller
          name="askForPassword"
          control={control}
          render={({ onChange, value }) => (
            <Checkbox
              id="password-check "
              label="Ask for password before every transaction"
              className={styles.Checkbox}
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
            />
          )}
        />
        <FormInput
          type="password"
          name="password"
          formRef={register({
            required: {
              value: true,
              message: "You need to input your password to change this setting",
            },
            validate: {
              shouldMatch: (value) =>
                value !== user?.pass ? "Incorrect password" : "" || true,
            },
          })}
          wrapperStyles={styles.PasswordInput}
          label="Password"
          error={errors.password}
        />

        <div className={styles.ActionButtons}>
          <Button
            type="button"
            variant="secondary"
            className={styles.ActionButton}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={styles.ActionButton}
            variant="primary"
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default PasswordSettingsModal;
