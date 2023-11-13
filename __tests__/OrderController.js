/* eslint-disable max-lines-per-function */
import { MissionUtils } from '@woowacourse/mission-utils';
import Promotion from '../src/Controller/Promotion';
import OrderProcess from '../src/Controller/OrderController';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();

  return logSpy;
};

describe('잘못된 날짜 입력에 대한 예외처리', () => {
  test('범위 내의 날짜를 입력할 경우', async () => {
    mockQuestions(['99', '티본스테이크-1']);
    const orderController = new OrderProcess();

    await expect(orderController.readReservationInput()).rejects.toThrowError(
      '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.'
    );
  });

  test.each([
    ['AB', '티본스테이크-1'],
    ['#$@', '티본스테이크-1'],
  ])('숫자 이외의 값 입력할 경우', async ([reserveDay, orderMenus]) => {
    mockQuestions([reserveDay, orderMenus]);

    const orderController = new OrderProcess();

    expect(orderController.readReservationInput()).rejects.toThrowError(
      '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.'
    );
  });
});

describe('잘못된 메뉴 입력에 대한 예외처리', () => {
  test('메뉴에 없는 음식을 주문할 경우', async () => {
    mockQuestions(['9', '그냥가짜파스타-1,바비큐립-1']);

    const orderController = new OrderProcess();

    await expect(orderController.readReservationInput()).rejects.toThrowError(
      '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.'
    );
  });
});
