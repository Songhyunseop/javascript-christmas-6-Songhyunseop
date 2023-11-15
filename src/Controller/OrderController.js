import InputView from '../View/InputView.js';
import OutputView from '../View/OutputView.js';

import { TRY_TIMES } from '../Constant/Config.js';
import { ERROR } from '../Constant/Message.js';

import validateDayInput from '../Utils/ValidateDayInput.js';
import validateOrderInput from '../Utils/ValidateMenuInput.js';
import Factory from '../Utils/Factory.js';
import { formatAmount } from '../Utils/utils.js';

class OrderProcess {
  #tryCount;

  constructor() {
    this.#tryCount = 0;
  }

  // 입력값 확인 메서드
  async readReservationInput() {
    let reserveDay;
    let orderMenus;

    try {
      reserveDay = validateDayInput(await InputView.readDate());
      orderMenus = validateOrderInput(await InputView.readMenu());
    } catch (error) {
      OutputView.printThis(error.message);
      const result = await this.#countRetryTimes();
      return result;
    }
    this.#tryCount = 0;
    return { reserveDay, orderMenus };
  }

  async #countRetryTimes() {
    if (this.#tryCount < TRY_TIMES.LIMIT) {
      this.#tryCount += 1;
      const result = await this.readReservationInput();
      return result;
    }
    throw new Error(ERROR.EXCEEDED_LIMIT);
  }

  // 주문에 대한 메뉴리스트, 합산 금액 반환
  #generateOrderDetails(orderMenus) {
    const order = Factory.createOrder(orderMenus);
    const orderedList = order.menuList();
    const totalPaid = order.totalAmount();

    return { orderedList, totalPaid };
  }

  async result() {
    const { reserveDay, orderMenus } = await this.readReservationInput();
    const { orderedList, totalPaid } = this.#generateOrderDetails(orderMenus);

    OutputView.printThis(`<주문 메뉴>\n${orderedList}\n`);
    OutputView.printThis(
      `<할인 전 총주문 금액>\n${formatAmount(totalPaid)}원\n`
    );

    return { reserveDay, orderMenus };
  }
}

export default OrderProcess;
