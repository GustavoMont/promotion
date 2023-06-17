export function currencyFormatter(value: number) {
  const valueNumber = parseFloat(value.toFixed(2));
  const userLang = navigator.language;
  const localeOptions = {
    style: "currency",
    currency: "BRL",
  };
  return parseFloat(valueNumber.toFixed(2)).toLocaleString(
    userLang,
    localeOptions
  );
}
