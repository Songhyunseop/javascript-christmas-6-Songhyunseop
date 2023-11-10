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
});
