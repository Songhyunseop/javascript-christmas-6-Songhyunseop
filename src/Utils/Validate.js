import MENU from '../Constant/Menu.js';

const validateDayInput = (reserveDay) => {
  if (Number.isNaN(new Date(`2023-12-${reserveDay}`).getDay())) {
    throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
  }
  if (/[!@#$%^&*(),.?":{}|<>]/.test(reserveDay)) {
    throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
  }

  return reserveDay;
};

const validateOrderInput = (orderMenus) => {
  const numberForm = /^\d+$/;
  const orderInfo = orderMenus.split(',').map((el) => el.split('-'));

  const isNotMenu = orderInfo.some(
    ([menu, count]) =>
      MENU.LIST[menu] === undefined || numberForm.test(count) === false
  );
  const isOnlyDrinks = orderInfo.every(([menu]) => {
    const menuCourse = MENU.CATEGORIES.find((category) =>
      category.list.includes(menu)
    );
    return menuCourse?.name === 'Drinks';
  });

  if (isNotMenu) {
    throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
  }
  if (isOnlyDrinks) {
    throw new Error('[ERROR] 음료만 주문할 수 없습니다. 다시 입력해 주세요.');
  }

  return orderMenus;
};

export { validateDayInput, validateOrderInput };
