import Order from '../Model/Order.js';
import { validateDayInput, validateOrderInput } from '../Utils/Validate.js';
import InputView from '../View/InputView.js';
import OutputView from '../View/OutputView.js';

class OrderProcess {
  constructor() {
    this.tryCount = 0;
  }

  // 입력값 확인 메서드
  async readReservationInput() {
    let reserveDay;
    let orderMenus;

    try {
      reserveDay = validateDayInput(await InputView.readDate());
      orderMenus = validateOrderInput(await InputView.readMenu());
      this.tryCount = 0;
    } catch (error) {
      OutputView.printThis(error.message);
      await this.countRetryTimes();
    }
    return { reserveDay, orderMenus };
  }

  async countRetryTimes() {
    this.tryCount += 1;
    if (this.tryCount < 5) await this.readReservationInput();
    throw new Error(
      '[ERROR] 5회 이상 잘못 입력하셨습니다. 처음부터 다시 입력하세요.'
    );
  }

  #generateOrderDetails(orderMenus) {
    const order = new Order(orderMenus);
    const orderedList = order.menuList();
    const totalPaid = order.totalAmount();

    return { orderedList, totalPaid };
  }

  async result() {
    const { reserveDay, orderMenus } = await this.readReservationInput();
    const { orderedList, totalPaid } = this.#generateOrderDetails(orderMenus);

    OutputView.printThis(`<주문 메뉴>\n${orderedList}\n`);
    OutputView.printThis(`<할인 전 총주문 금액>\n${totalPaid}\n`);

    return { reserveDay, orderMenus };
  }
}

export default OrderProcess;
