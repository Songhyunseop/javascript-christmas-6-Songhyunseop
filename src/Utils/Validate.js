import { ORDER, REGEX } from '../Constant/Config.js';
import MENU from '../Constant/Menu.js';
import { ERROR } from '../Constant/Message.js';
import { getDayofWeeks, parseStringByDash } from './utils.js';

// 유효한 날짜 입력 체크
const isInvalidDay = (reserveDay) => Number.isNaN(getDayofWeeks(reserveDay));
const isNotNumber = (reserveDay) => REGEX.SPECIAL_SYMBOLS.test(reserveDay);
const isStartWithZero = (reserveDay) => REGEX.STARTS_WITH_ZERO.test(reserveDay);

const validateDayInput = (reserveDay) => {
  if (isInvalidDay(reserveDay)) {
    throw new Error(ERROR.INVALID_DAY);
  }
  if (isNotNumber(reserveDay)) {
    throw new Error(ERROR.INVALID_DAY);
  }
  if (isStartWithZero(reserveDay)) {
    throw new Error(ERROR.INVALID_DAY);
  }

  return reserveDay;
};

// 유효한 메뉴 입력 체크
const isNotMenu = (ordersInfo) => {
  const result = ordersInfo.some(
    ([menu, count]) =>
      MENU.LIST[menu] === undefined || REGEX.NUMBER.test(count) === false
  );
  return result;
};

const isOnlyDrinks = (ordersInfo) => {
  const result = ordersInfo.every(([menu]) => {
    const menuCourse = MENU.CATEGORIES.find((category) =>
      category.list.includes(menu)
    );
    return menuCourse?.name === 'Drinks';
  });

  return result;
};

const isDuplicate = (ordersInfo) => {
  const orderedList = ordersInfo.map((info) => info[ORDER.MENU_NAME]);

  return orderedList.length !== new Set(orderedList).size;
};

const checkValidMenu = (ordersInfo) => {
  if (isNotMenu(ordersInfo)) {
    throw new Error(ERROR.INVALID_ORDER);
  }
};

const checkOnlyDrinks = (ordersInfo) => {
  if (isOnlyDrinks(ordersInfo)) {
    throw new Error(ERROR.INVALID_ORDER);
  }
};

const checkDuplicate = (ordersInfo) => {
  if (isDuplicate(ordersInfo)) {
    throw new Error(ERROR.INVALID_ORDER);
  }
};

const validateOrderInput = (orderMenus) => {
  const ordersInfo = parseStringByDash(orderMenus);

  checkValidMenu(ordersInfo);
  checkOnlyDrinks(ordersInfo);
  checkDuplicate(ordersInfo);

  return orderMenus;
};

export { validateDayInput, validateOrderInput };
