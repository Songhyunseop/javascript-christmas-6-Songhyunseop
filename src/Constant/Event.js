const EVENT = {
  MIN_PAID: 10000,
  NO_BENEFIT: 'NO_EVENT',
  CHRISTMAS: '크리스마스 디데이 할인',
  EVERY_WEEKS: '주말 할인',
  EVERY_WEEKEND: '평일 할인',
  SPECIAL: '특별 할인',
  GIFT: '증정 이벤트',
};

const CHRISTMAS = {
  END: 25,
  BASE_DISCOUNT: 1000,
  DISCOUNT: 100,
};

const EVERY = {
  DISCOUNT: 2023,
};

const SPECIAL = {
  DAYS: [3, 10, 17, 24, 25, 31],
  DISCOUNT: -1000,
};

const GIFT = {
  MIN_PAID: 120000,
  REWARD: -25000,
};

export { EVENT, CHRISTMAS, EVERY, SPECIAL, GIFT };
