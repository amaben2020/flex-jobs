export const formatCurrency = (amount: Number) => {
  const formattedCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(amount));

  return formattedCurrency;
};
