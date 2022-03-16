import BigNumber from "bignumber.js";

export function getCurrentSold(sold, redeemed) {
  return new BigNumber(sold).minus(redeemed).toNumber();
}

export function getAvaliable(capacity, normalizedAmount, borrowRate) {
  return new BigNumber(capacity).minus(new BigNumber(normalizedAmount).times(borrowRate));
}

export function getAror(period, interestRate) {
  const n = (365 * 24 * 60 * 60) / parseInt(period);
  const r = parseFloat(interestRate);
  const aror = (1.0 + r / n) ** (n * n) - 1.0;

  return aror;
}

export function getPosition(normalizedAmount, borrowRate) {
  const position = new BigNumber(normalizedAmount).times(borrowRate);

  return position.decimalPlaces(8, BigNumber.ROUND_DOWN).toNumber();
}

export function getRedeemPeriod(vm, period) {
  if (period < 3600) {
    // <= 1 hour
    return vm.$t("minutes_suffix", { n: (period / 60).toFixed(0) });
  } else if (period < 3600 * 24) {
    // <= 1 day
    return vm.$t("hours_suffix", { n: (period / 60 / 60).toFixed(0) });
  } else {
    return vm.$t("days_suffix", { n: (period / 60 / 60 / 24).toFixed(0) });
  }
}
