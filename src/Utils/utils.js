const isArrayEmpty = (array) => {
  if (array.length === 0) return true;
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
export { formatOrderDetails, parseStringByDash };
