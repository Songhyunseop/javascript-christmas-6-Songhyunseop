/* eslint-disable max-lines-per-function */
import { EVENT } from '../src/Constant/Event';
import EventChristmas from '../src/Model/EvenctChristmas';
import Event from '../src/Model/Event';
import EventEvery from '../src/Model/EventEvery';
import EventSpecial from '../src/Model/EventSpecial';

describe('Event 클래스 unit 테스트', () => {
  describe('주문 금액에 따라 이벤트 적용가능 여부 체크', () => {
    test('주문 금액 10000원 이상일 시 이벤트 적용', () => {
      const totalPaid = 15000;
      const day = 25;
      const courses = {
        Appetizer: 0,
        Main: 2,
        Dessert: 1,
        Drinks: 2,
      };

      const event = new Event(day, courses);
      const result = event.checkAvailable(totalPaid);

      expect(result instanceof Event).toBe(true);
      expect(result.day).toBe(25);
    });

    test('주문 금액 10000원 미만일 시 이벤트 미적용', () => {
      const totalPaid = 8000;
      const day = 25;
      const courses = {
        Appetizer: 0,
        Main: 2,
        Dessert: 1,
        Drinks: 2,
      };

      const event = new Event(day, courses);
      const result = event.checkAvailable(totalPaid);

      expect(result instanceof Event).toBe(true);
      expect(result.day).toBe(EVENT.NO_BENEFIT_DAY);
    });
  });

  describe('크리스마스 이벤트 체크', () => {
    test('12월 1일~25일 내에 주문 시 크리스마스 이벤트 적용', () => {
      const day = 15;
      const answer = { name: EVENT.CHRISTMAS, benefit: -2400 };

      const event = new EventChristmas(day);
      const result = event.checkAvailable();

      expect(result).toEqual(expect.objectContaining(answer));
    });

    test('25일 이후 주문 시 크리스마스 이벤트 미적용', () => {
      const day = 30;
      const answer = EVENT.NO_BENEFIT_DAY;

      const event = new EventChristmas(day);
      const result = event.checkAvailable();

      expect(result).toEqual(answer);
    });
  });

  describe('평일,주말에 대한 이벤트 체크', () => {
    test('예약날짜가 평일인 경우 - Dessert 할인 적용', () => {
      const day = 20;
      const orders = {
        Appetizer: 0,
        Main: 1,
        Dessert: 3,
        Drinks: 0,
      };
      const answer = { name: '평일 할인', benefit: -6069 };

      const event = new EventEvery(day, orders);
      const result = event.checkAvailable();

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
      const answer = { name: '주말 할인', benefit: -10115 };

      const event = new EventEvery(day, orders);
      const result = event.checkAvailable();

      expect(result).toEqual(expect.objectContaining(answer));
    });

    test('이벤트 적용 대상이 아닌 경우', () => {
      const day = EVENT.NO_BENEFIT_DAY;
      const orders = {
        Appetizer: 0,
        Main: 5,
        Dessert: 1,
        Drinks: 0,
      };

      const event = new EventEvery(day, orders);
      const result = event.checkAvailable();

      expect(result).toEqual(EVENT.NO_BENEFIT_DAY);
    });
  });

  test('예약날짜가 할인 날짜와 일치할 경우 특별할인 적용', () => {
    const day = 3;
    const answer = { name: '특별 할인', benefit: -1000 };

    const event = new EventSpecial(day, null);
    const result = event.checkAvailable();

    expect(result).toEqual(expect.objectContaining(answer));
  });

  test('주문 금액 12만원 이상 시 증정품(샴페인) 증정 문구 반환', () => {
    const totalPaid = 125000;
    const isFree = Event.checkFreeMenu(totalPaid);

    expect(isFree.name).toEqual(expect.stringContaining('증정 이벤트'));
    expect(isFree.benefit).toBe(-25000);
  });

  describe('각 이벤트 체크결과에 대한 혜택내역 반환', () => {
    const day = 25;
    const courses = {
      Appetizer: 0,
      Main: 2,
      Dessert: 1,
      Drinks: 2,
    };
    const input = [
      () => ({ name: '크리스마스 디데이 할인', benefit: -3400 }),
      () => ({ name: '평일 할인', benefit: -2023 }),
      () => ({ name: '특별 할인', benefit: -1000 }),
      () => ({ name: '증정 이벤트', benefit: -25000 }),
    ];

    test('적용된 이벤트 혜택 내역 반환', () => {
      const event = new Event(day, courses);
      const result = event.getTotalChecked(input);

      const answer = input.map((el) => el());

      expect(result).toEqual(answer);
    });
  });
});
