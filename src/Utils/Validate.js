const validateInput = (reserveDay, orderMenus) => {
  if (Number.isNaN(new Date(`2023-12-${reserveDay}`).getDay())) {
    throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(reserveDay)) {
    throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
  }
};
const validateanyThing = () => {};

export { validateInput, validateanyThing };
