import MENU from '../Constant/Menu';

const validateInput = (reserveDay, orderMenus) => {
  if (Number.isNaN(new Date(`2023-12-${reserveDay}`).getDay())) {
    throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
  }
  if (/[!@#$%^&*(),.?":{}|<>]/.test(reserveDay)) {
    throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
  }

  const aa = orderMenus.split(',').map((el) => el.split('-'));
  const bb = aa.map((el) => el[0]);
  const isNotMenu = bb.some((menu) => MENU.LIST[menu] === undefined);

  if (isNotMenu) {
    throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
  }

  return { reserveDay, orderMenus };
};
const validateanyThing = () => {};

export { validateInput, validateanyThing };
