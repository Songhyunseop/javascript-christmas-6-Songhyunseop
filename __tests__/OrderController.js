/* eslint-disable max-lines-per-function */
import { MissionUtils } from '@woowacourse/mission-utils';
import OrderProcess from '../src/Controller/OrderController';
import InputView from '../src/View/InputView';

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

test.each([
  ['AB', '티본스테이크-1'],
  ['#$@', '티본스테이크-1'],
])('숫자 이외의 값 입력할 경우', async ([reserveDay, orderMenus]) => {
  mockQuestions([reserveDay, orderMenus]);
  const logSpy = getLogSpy();

  const orderController = new OrderProcess();

  await expect(orderController.readReservationInput()).rejects.toThrowError(
    '[ERROR] 5회 이상 잘못 입력하셨습니다. 처음부터 다시 입력하세요.'
  );
  expect(logSpy).toHaveBeenCalledWith(
    '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.'
  );
});

describe('잘못된 메뉴 입력에 대한 예외처리', () => {
  test('메뉴에 없는 음식을 주문할 경우', async () => {
    mockQuestions(['9', '그냥-가짜파스타-1,바비큐립-1']);
    const logSpy = getLogSpy();

    const orderController = new OrderProcess();
    await expect(orderController.readReservationInput()).rejects.toThrowError();

    expect(logSpy).toHaveBeenCalledWith(
      '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.'
    );
  });

  test('음료만 주문한 경우', async () => {
    mockQuestions(['3', '제로콜라-1']);
    const logSpy = getLogSpy();

    const orderController = new OrderProcess();
    await expect(orderController.readReservationInput()).rejects.toThrowError();
    expect(logSpy).toHaveBeenCalledWith(
      '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.'
    );
  });

  test('잘못된 주문개수를 입력할 경우', async () => {
    mockQuestions(['3', '제로콜라-*a^^']);
    const logSpy = getLogSpy();

    const orderController = new OrderProcess();
    await expect(orderController.readReservationInput()).rejects.toThrowError();

    expect(logSpy).toHaveBeenCalledWith(
      '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.'
    );
  });

  test('같은 메뉴를 중복 주문할 경우', async () => {
    mockQuestions(['3', '해산물파스타-1,해산물파스타-2']);
    const logSpy = getLogSpy();

    const orderController = new OrderProcess();
    await expect(orderController.readReservationInput()).rejects.toThrowError();

    expect(logSpy).toHaveBeenCalledWith(
      '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.'
    );
  });
});

test('잘못된 입력 시 올바른 입력할 때 까지 재입력', async () => {
  mockQuestions(['999', '1', '해산물파스타-1']);
  const spying = jest.spyOn(InputView, 'readDate');

  const orderController = new OrderProcess();

  await expect(orderController.readReservationInput()).resolves.toEqual({
    orderMenus: '해산물파스타-1',
    reserveDay: '1',
  });
  expect(spying).toHaveBeenCalledTimes(2);
});

describe('입력날짜와 주문메뉴 입력에 대한 결과처리', () => {
  test('올바른 날짜와 메뉴를 입력할 경우', async () => {
    mockQuestions(['25', '해산물파스타-2', '초코케이크-1']);

    const orderController = new OrderProcess();
    const result = await orderController.result();

    const answer = { orderMenus: '해산물파스타-2', reserveDay: '25' };

    expect(result).toEqual(answer);
  });

  test.each([
    [
      'AB',
      '티본스테이크-1',
      '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
    ],
    [
      '3',
      '티본스테이크1개',
      '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
    ],
  ])(
    '잘못된 날짜 입력할 경우',
    async (reserveDay, orderMenus, expectedError) => {
      mockQuestions([reserveDay, orderMenus]);
      const logSpy = getLogSpy();

      const orderController = new OrderProcess();

      await expect(
        orderController.readReservationInput()
      ).rejects.toThrowError();

      expect(logSpy).toHaveBeenCalledWith(expectedError);
    }
  );
});
