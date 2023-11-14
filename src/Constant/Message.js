const MESSAGE = {
  RESERVAE_DATE:
    '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  ORDER_MENU:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
};

const ERROR = {
  INVALID_DAY: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  INVALID_ORDER: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
  EXCEEDED_LIMIT:
    '[ERROR] 5회 이상 잘못 입력하셨습니다. 처음부터 다시 입력하세요.',
  EXCEEDED_ORDER:
    '[ERROR] 메뉴는 20개 이상 주문하실 수 없습니다. 처음부터 다시 입력하세요.',
};

export { MESSAGE, ERROR };
