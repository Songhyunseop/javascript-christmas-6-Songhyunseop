import { ORDER, REGEX } from '../Constant/Config.js';
import MENU from '../Constant/Menu.js';
import { ERROR } from '../Constant/Message.js';
import { parseStringByDash } from './utils.js';

// 유효한 메뉴 입력 여부 검사
const isNotMenu = (ordersInfo) => {
  const result = ordersInfo.some(
    ([menu, count]) =>
      MENU.LIST[menu] === undefined || REGEX.NUMBER.test(count) === false
  );
  return result;
};

const isOnlyDrinks = (ordersInfo) =>
  ordersInfo.every(([menu]) =>
    MENU.CATEGORIES.some(
      (category) => category.list.includes(menu) && category.name === 'Drinks'
    )
  );

const isDuplicate = (ordersInfo) => {
  const orderedList = ordersInfo.map((info) => info[ORDER.MENU_NAME]);

  return orderedList.length !== new Set(orderedList).size;
};

const isOrderExceeded = (ordersInfo) => {
  const result = ordersInfo.reduce(
    (total, orderCount) => total + Number(orderCount[ORDER.COUNT]),
    0
  );

  return result >= 20;
};

// 검사 결과에 따른 예외처리 메서드
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

const checkOrderExceeded = (ordersInfo) => {
  if (isOrderExceeded(ordersInfo)) {
    throw new Error(ERROR.EXCEEDED_ORDER);
  }
};

const validateOrderInput = (orderMenus) => {
  const ordersInfo = parseStringByDash(orderMenus);

  checkValidMenu(ordersInfo);
  checkOnlyDrinks(ordersInfo);
  checkDuplicate(ordersInfo);
  checkOrderExceeded(ordersInfo);

  return orderMenus;
};

export default validateOrderInput;
