const ORDER = Object.freeze({
  MENU_NAME: 0,
  COUNT: 1,
});

const DAY = {
  WEEKDAY_END: 5,
};

const REGEX = {
  SPECIAL_SYMBOLS: /[!@#$%^&*(),.?":{}|<>]/,
  NUMBER: /^\d+$/,
  STARTS_WITH_ZERO: /^0/,
};

export { ORDER, DAY, REGEX };
