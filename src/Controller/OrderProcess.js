import Order from '../Model/Order.js';
import { validateDayInput, validateOrderInput } from '../Utils/Validate.js';
import InputView from '../View/InputView.js';
import OutputView from '../View/OutputView.js';

class OrderProcess {
  // 입력값 확인 메서드
  async readReservationInput() {
    let reserveDay;
    let orderMenus;

    try {
      reserveDay = await InputView.readDate();
      validateDayInput(reserveDay);
      orderMenus = await InputView.readMenu();
      validateOrderInput(orderMenus);
    } catch (error) {
      throw new Error(error.message);
    }

    return { reserveDay, orderMenus };
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
