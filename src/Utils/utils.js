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

const funcccc = () => {
  console.log('hello');
};

export { formatOrderDetails, funcccc };
