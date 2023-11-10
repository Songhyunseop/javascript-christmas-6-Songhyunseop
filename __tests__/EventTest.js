/* eslint-disable max-lines-per-function */
import Event from '../src/Model/Event';

describe('Event 클래스 unit 테스트', () => {
  test('12월 1일~25일 내에 주문 시 크리스마스 이벤트 적용', () => {
    const day = 15;

    const event = new Event(day, null);
    const result = event.chirstMasDay();

    expect(result).toEqual(-2400);
  });

  describe('예약날짜에 따라 메뉴할인 항목 부분 적용', () => {
    test('예약날짜가 평일인 경우 - Dessert 할인 적용', () => {
      const day = 20;
      const orders = {
        Appetizer: 0,
        Main: 1,
        Dessert: 3,
        Drinks: 0,
      };

      const event = new Event(day, orders);
      const result = event.everyDay();

      expect(result).toEqual(6069);
    });

    test('예약날짜가 주말인 경우 - Main 할인 적용', () => {
      const day = 23;
      const orders = {
        Appetizer: 0,
        Main: 5,
        Dessert: 1,
        Drinks: 0,
      };

      const event = new Event(day, orders);
      const result = event.everyDay();

      expect(result).toEqual(10115);
    });
  });
});
