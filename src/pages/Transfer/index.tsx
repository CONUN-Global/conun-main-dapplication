import React, { useEffect, useState } from "react";

import Button from "../../components/Button";

import useTransfer from "../../hooks/useTransfer";

const { api } = window;

function Tranfer() {
  const [transferData, setTransferData] = useState(null);
  const [success, setSuccess] = useState(null);

  const { transfer, loading } = useTransfer({
    token: transferData?.token,
  });

  useEffect(() => {
    api.listenToTransferData((args) => {
      setTransferData(args);
    });
  }, []);

  const handleTransfer = async () => {
    try {
      const data = await transfer(transferData);

      setSuccess(data?.payload);

      api.requestBalanceRefetch();
    } catch (error) {
      // TODO: handle error
    }
  };

  if (success) {
    return (
      <div>
        <div>
          <p>
            Transaction ID:{" "}
            <a
              href={`https://ropsten.etherscan.io/tx/${
                success?.TxID ?? success
              }`}
              target="_blank"
              rel="noreferrer"
            >
              <strong>{success?.TxID ?? success}</strong>
            </a>
          </p>
          <p>
            Amount:{" "}
            <strong>{success?.Func?.Amount ?? transferData?.amount}</strong>
          </p>
          {success?.Timestamp?.seconds && (
            <p>
              Timestamp:{" "}
              <strong>
                {new Date(success?.Timestamp?.seconds * 1000).toLocaleString()}
              </strong>
            </p>
          )}
        </div>

        <Button type="button" onClick={() => api.closeTransferWindow()}>
          Close
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <p>
          To: <span>{transferData?.to}</span>
        </p>

        <p>
          Amount:{" "}
          <strong>
            {transferData?.amount} {transferData?.type}
          </strong>
        </p>

        {transferData?.token !== "conx" && (
          <>
            <p>
              Fee:{" "}
              <strong>
                {transferData?.fee?.toFixed(6)} {transferData?.type}
              </strong>
            </p>

            <p>
              Total:{" "}
              <strong>
                {(+transferData?.amount + +transferData?.fee).toFixed(6)}{" "}
                {transferData?.type}
              </strong>
            </p>
          </>
        )}
      </div>
      <div>
        <Button
          type="button"
          disabled={loading}
          onClick={() => api.closeTransferWindow()}
        >
          Cancel
        </Button>
        <Button type="button" loading={loading} onClick={handleTransfer}>
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default Tranfer;
