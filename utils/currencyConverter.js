export const currentConverter = (
  amount,
  locale = "en-US",
  currency = "USD"
) => {
  return amount?.toLocaleString(locale, {
    style: "currency",
    currency,
  });
};
