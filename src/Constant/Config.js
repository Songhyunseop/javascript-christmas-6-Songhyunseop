const ORDER = Object.freeze({
  MENU_NAME: 0,
  COUNT: 1,
});

const BENEFIT = Object.freeze({
  NAME: 0,
  AMOUNT: 1,
});

const DAY = Object.freeze({
  WEEKDAY_END: 5,
});

const TRY_TIMES = Object.freeze({
  LIMIT: 5,
});

const REGEX = Object.freeze({
  SPECIAL_SYMBOLS: /[!@#$%^&*(),.?":{}|<>]/,
  NUMBER: /^\d+$/,
  STARTS_WITH_ZERO: /^0/,
});

// prettier-ignore
export {
  ORDER, DAY, REGEX, TRY_TIMES, BENEFIT
};
