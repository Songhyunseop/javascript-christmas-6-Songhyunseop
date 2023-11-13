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
    } catch (error) {
      OutputView.printThis(error.message);
      const result = await this.countRetryTimes();
      return result;
    }
    this.tryCount = 0;
    return { reserveDay, orderMenus };
  }

  async countRetryTimes() {
    if (this.tryCount < 5) {
      this.tryCount += 1;
      const result = await this.readReservationInput();
      return result;
    }
    throw new Error(
      '[ERROR] 5회 이상 잘못 입력하셨습니다. 처음부터 다시 입력하세요.'
    );
  }

  // 주문에 대한 메뉴리스트, 합산 금액 반환
  #generateOrderDetails(orderMenus) {
    const order = new Order(orderMenus);
    const orderedList = order.menuList();
    const totalPaid = order.totalAmount();

    return { orderedList, totalPaid };
  }

  async result() {
    const { reserveDay, orderMenus } = await this.readReservationInput();
    console.log('여기 undefined됨');
    const { orderedList, totalPaid } = this.#generateOrderDetails(orderMenus);

    OutputView.printThis(`<주문 메뉴>\n${orderedList}\n`);
    OutputView.printThis(`<할인 전 총주문 금액>\n${totalPaid}\n`);

    return { reserveDay, orderMenus };
  }
}

export default OrderProcess;
