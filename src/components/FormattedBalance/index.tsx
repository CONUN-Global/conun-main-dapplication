import React from 'react';

interface FormattedBalanceProps {
  balance: string | number;
}

function FormattedBalance({ balance = 0 }: FormattedBalanceProps) {
  const formmatedBalance = +Number(balance)?.toFixed(6);
  return <>{formmatedBalance}</>;
}

export default FormattedBalance;
