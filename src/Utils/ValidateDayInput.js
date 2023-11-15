import { REGEX } from '../Constant/Config.js';
import { ERROR } from '../Constant/Message.js';

import { getDayofWeeks } from './utils.js';

// 유효한 날짜 입력 체크
const isInvalidDay = (reserveDay) => Number.isNaN(getDayofWeeks(reserveDay));
const isNotNumber = (reserveDay) => REGEX.SPECIAL_SYMBOLS.test(reserveDay);
const isStartWithZero = (reserveDay) => REGEX.STARTS_WITH_ZERO.test(reserveDay);
const isEmpty = (reserveDay) => REGEX.EMPTY.test(reserveDay);

const checkValidDay = (reserveDay) => {
  if (isInvalidDay(reserveDay)) {
    throw new Error(ERROR.INVALID_DAY);
  }
};

const checkNumberType = (reserveDay) => {
  if (isNotNumber(reserveDay)) {
    throw new Error(ERROR.INVALID_DAY);
  }
};
const checkStartWithZero = (reserveDay) => {
  if (isStartWithZero(reserveDay)) {
    throw new Error(ERROR.INVALID_DAY);
  }
};
const checkIsEmpty = (reserveDay) => {
  if (isEmpty(reserveDay)) {
    throw new Error(ERROR.INVALID_DAY);
  }
};

const validateDayInput = (reserveDay) => {
  checkValidDay(reserveDay);
  checkNumberType(reserveDay);
  checkStartWithZero(reserveDay);
  checkIsEmpty(reserveDay);

  return reserveDay;
};

export default validateDayInput;
