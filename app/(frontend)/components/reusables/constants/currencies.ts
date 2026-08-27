import currencyCodes from "currency-codes";

export const currencyOptions = currencyCodes.data
  .filter((currency) => currency.code)
  .map((currency) => ({
    label: `${currency.currency} (${currency.code})`,
    value: currency.code,
  }));