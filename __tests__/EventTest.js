import Event from '../src/Model/Event';

describe('Event 클래스 unit 테스트', () => {
  test('12월 1일~25일 내에 주문 시 크리스마스 이벤트 적용', () => {
    const day = 15;

    const event = new Event(day, null);
    const result = event.chirstMasDay();

    expect(result).toEqual(-2400);
  });
});
