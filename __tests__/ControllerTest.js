/* eslint-disable max-lines-per-function */
import { MissionUtils } from '@woowacourse/mission-utils';
import OrderProcess from '../src/Controller/OrderController';
import InputView from '../src/View/InputView';
import { ERROR } from '../src/Constant/Message';
import EventProcess from '../src/Controller/EventController';
import OutputView from '../src/View/OutputView';
import Order from '../src/Model/Order';

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
  test.each([
    ['AB', '티본스테이크-1'],
    ['#$@', '티본스테이크-1'],
  ])('숫자 이외의 값 입력할 경우', async ([reserveDay, orderMenus]) => {
    mockQuestions([reserveDay, orderMenus]);
    const logSpy = getLogSpy();
    const orderController = new OrderProcess();

    await expect(orderController.readReservationInput()).rejects.toThrowError(
      ERROR.EXCEEDED_LIMIT
    );
    expect(logSpy).toHaveBeenCalledWith(ERROR.INVALID_DAY);
  });

  test('잘못된 형식의 숫자 입력할 경우', async () => {
    const logSpy = getLogSpy();
    mockQuestions(['009', '바비큐립-1']);

    const orderController = new OrderProcess();

    await expect(orderController.readReservationInput()).rejects.toThrowError();
    expect(logSpy).toHaveBeenCalledWith(ERROR.INVALID_DAY);
  });

  test('빈 공백을 입력할 경우', async () => {
    const logSpy = getLogSpy();
    mockQuestions(['', '바비큐립-1']);

    const orderController = new OrderProcess();

    await expect(orderController.readReservationInput()).rejects.toThrow();
    expect(logSpy).toHaveBeenCalledWith(ERROR.INVALID_DAY);
  });

  test('공백을 두고 입력할 경우', async () => {
    const logSpy = getLogSpy();
    mockQuestions([' 3', '바비큐립-1']);

    const orderController = new OrderProcess();

    await expect(orderController.readReservationInput()).rejects.toThrow();
    expect(logSpy).toHaveBeenCalledWith(ERROR.INVALID_DAY);
  });
});

describe('잘못된 메뉴 입력에 대한 예외처리', () => {
  test('메뉴에 없는 음식을 주문할 경우', async () => {
    mockQuestions(['9', '그냥-가짜파스타-1,바비큐립-1']);
    const logSpy = getLogSpy();

    const orderController = new OrderProcess();
    await expect(orderController.readReservationInput()).rejects.toThrowError();

    expect(logSpy).toHaveBeenCalledWith(ERROR.INVALID_ORDER);
  });

  test('음료만 주문한 경우', async () => {
    mockQuestions(['3', '제로콜라-1']);
    const logSpy = getLogSpy();

    const orderController = new OrderProcess();
    await expect(orderController.readReservationInput()).rejects.toThrowError();
    expect(logSpy).toHaveBeenCalledWith(ERROR.INVALID_ORDER);
  });

  test('잘못된 주문개수를 입력할 경우', async () => {
    mockQuestions(['3', '제로콜라-*a^^']);
    const logSpy = getLogSpy();

    const orderController = new OrderProcess();
    await expect(orderController.readReservationInput()).rejects.toThrowError();

    expect(logSpy).toHaveBeenCalledWith(ERROR.INVALID_ORDER);
  });

  test('같은 메뉴를 중복 주문할 경우', async () => {
    mockQuestions(['3', '해산물파스타-1,해산물파스타-2']);
    const logSpy = getLogSpy();

    const orderController = new OrderProcess();
    await expect(orderController.readReservationInput()).rejects.toThrowError();

    expect(logSpy).toHaveBeenCalledWith(ERROR.INVALID_ORDER);
  });
});

test('20개 이상 주문 시 예외처리', async () => {
  mockQuestions(['3', '해산물파스타-10,바비큐립-10']);

  const orderController = new OrderProcess();
  await expect(orderController.readReservationInput()).rejects.toThrowError();
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
    ['AB', '티본스테이크-1', ERROR.INVALID_DAY],
    ['3', '티본스테이크1개', ERROR.INVALID_ORDER],
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

test('각 이벤트 적용이 처리된 결과를 통해 증정내역과 혜택내역을 반환', () => {
  mockQuestions(['3', '해산물파스타-3,바비큐립-2', '양송이수프-3']);

  const logSpy = jest.spyOn(OutputView, 'printThis');
  logSpy.mockClear();

  const menu = '해산물파스타-2,초코케이크-1';
  const order = new Order(menu);

  const eventController = new EventProcess(3, order);
  eventController.result();

  expect(logSpy).toHaveBeenCalledWith(
    expect.stringContaining('<증정 메뉴>\n없음')
  );
  expect(logSpy).toHaveBeenCalledWith(
    expect.stringContaining(
      '<혜택 내역>\n크리스마스 디데이 할인: -1,200원\n평일 할인: -2,023원\n특별 할인: -1,000원'
    )
  );
});
