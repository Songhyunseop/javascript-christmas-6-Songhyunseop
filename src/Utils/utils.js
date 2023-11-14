const isArrayEmpty = (array) => {
  if (array.length === 0) return true;
  return false;
};

const formatOrderDetails = (details) => {
  if (isArrayEmpty(details)) return '없음\n';

  const result = `${details
    .map((info) => `${info.name}: ${info.result}`)
    .join('\n')}\n`;

  return result;
};

const parseStringByDash = (string) => {
  const result = string.split(',').map((el) => el.split('-'));

  return result;
};

const getDayofWeeks = (day) => {
  const dayOfWeek = new Date(`2023-12-${day}`).getDay();

  return dayOfWeek;
};

export { formatOrderDetails, parseStringByDash, getDayofWeeks };
