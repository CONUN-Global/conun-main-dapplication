import { useMutation } from "react-query";

const { api } = window;

function useCheckTransferWindow() {
  const { mutateAsync: checkTransferWindow } = useMutation(
    api.checkTransferWindow
  );

  return { checkTransferWindow };
}

export default useCheckTransferWindow;
