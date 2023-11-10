/* eslint-disable max-lines-per-function */
/* eslint-disable prefer-template */
import { EOL as LINE_SEPARATOR } from 'os';
import Order from '../src/Model/Order';

describe('Order 클래스 unit 테스트', () => {
  test('주문 메뉴 결과 반환', () => {
    const menu = '해산물파스타-2,초코케이크-1';
    const print = '해산물파스타 2개' + LINE_SEPARATOR + '초코케이크 1개';

    const order = new Order();
    const result = order.menuList(menu);

    expect(result).toEqual(expect.stringContaining(print));
  });

  test('총 주문 합계 금액 반환', () => {
    const menu = '해산물파스타-2,초코케이크-1';

    const order = new Order();
    const result = order.totalAmount(menu);

    expect(result).toEqual(85000);
  });

  test('각 주문메뉴들의 코스타입 반환', () => {
    const menu = '티본스테이크-1,초코케이크-1,샴페인-1';
    const answer = ['Main', 'Dessert', 'Drinks'];

    const order = new Order();
    const result = order.courseType(menu);

    result.forEach((orderType, idx) => {
      expect(orderType).toEqual(expect.stringContaining(answer[idx]));
    });
  });
});
