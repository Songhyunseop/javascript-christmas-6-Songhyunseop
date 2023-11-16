import { BENEFIT } from '../Constant/Config.js';

const isArrayEmpty = (array) => {
  if (array.length === 0) return true;
  return false;
};
const convertObjectToArray = (objects) =>
  objects.map((obj) => Object.values(obj));

// 각 숫자값을 1000 단위로 구분
const formatAmount = (amount) => new Intl.NumberFormat('en-US').format(amount);

// 각 객체의 key, value를 한 쌍의 문자열로 변환
const formatDetails = (details) => {
  if (isArrayEmpty(details)) return BENEFIT.NO_DISCOUNT;

  const detailsArray = convertObjectToArray(details);

  const result = `${detailsArray
    .map((detail) => `${detail[0]}: ${formatAmount(detail[1])}원`)
    .join('\n')}\n`;

  return result;
};

const parseStringByDash = (string) => {
  const result = string.split(',').map((el) => el.split('-'));

  return result;
};

// 입력 날짜의 요일 계산
const getDayofWeeks = (day) => {
  const dayOfWeek = new Date(`2023-12-${day}`).getDay();

  return dayOfWeek;
};

// prettier-ignore
export {
  formatDetails, parseStringByDash, getDayofWeeks, formatAmount
};
