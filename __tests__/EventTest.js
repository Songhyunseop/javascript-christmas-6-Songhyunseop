/* eslint-disable max-lines-per-function */
import Event from '../src/Model/Event';

describe('Event 클래스 unit 테스트', () => {
  test('12월 1일~25일 내에 주문 시 크리스마스 이벤트 적용', () => {
    const day = 15;
    const answer = { name: '크리스마스 디데이 할인', result: -2400 };

    const event = new Event(day, null);
    const result = event.christMasDay();

    expect(result).toEqual(expect.objectContaining(answer));
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
      const answer = { name: '평일 할인', result: -6069 };

      const event = new Event(day, orders);
      const result = event.everyDay();

      expect(result).toEqual(expect.objectContaining(answer));
    });

    test('예약날짜가 주말인 경우 - Main 할인 적용', () => {
      const day = 23;
      const orders = {
        Appetizer: 0,
        Main: 5,
        Dessert: 1,
        Drinks: 0,
      };
      const answer = { name: '주말 할인', result: -10115 };

      const event = new Event(day, orders);
      const result = event.everyDay();

      expect(result).toEqual(expect.objectContaining(answer));
    });
  });

  test('예약날짜가 할인 날짜와 일치할 경우 특별할인 적용', () => {
    const day = 3;
    const answer = { name: '특별 할인', result: -1000 };

    const event = new Event(day, null);
    const result = event.specialDay();

    expect(result).toEqual(expect.objectContaining(answer));
  });

  test('주문 금액 12만원 이상 시 증정품(샴페인) 증정 문구 반환', () => {
    const totalPaid = 125000;

    const event = new Event();
    const isFree = event.hasFreeMenu(totalPaid);

    expect(isFree.name).toEqual(expect.stringContaining('증정 이벤트'));
    expect(isFree.result).toBe(-25000);
  });

  test('각 혜택할인 목록에 증정품 있을 시 증정품내역 추가하여 목록 반환', () => {
    const totalPaid = 170000;
    const day = 25;
    const courses = {
      Appetizer: 0,
      Main: 2,
      Dessert: 1,
      Drinks: 2,
    };
    const answer = [
      { name: '크리스마스 디데이 할인', result: -3400 },
      { name: '평일 할인', result: -2023 },
      { name: '특별 할인', result: -1000 },
      { name: '증정 이벤트', result: -25000 },
    ];
    const event = new Event(day, courses);
    const result = event.getCheckedEventTotal(totalPaid);

    answer.forEach((el, idx) => {
      expect(result[idx]).toEqual(el);
    });
  });
});
