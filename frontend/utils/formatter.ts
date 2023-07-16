export function currencyFormatter(value: number) {
  const valueNumber = parseFloat(value.toFixed(2));
  const userLang = "pt-Br";
  const localeOptions = {
    style: "currency",
    currency: "BRL",
  };
  return parseFloat(valueNumber.toFixed(2)).toLocaleString(
    userLang,
    localeOptions
  );
}
