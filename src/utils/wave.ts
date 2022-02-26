export function getAror(period, interestRate) {
  const n = (365 * 24 * 60 * 60) / parseInt(period);
  const r = parseFloat(interestRate);
  const aror = (1.0 + r / n) ** (n * n) - 1.0;

  return aror;
}
