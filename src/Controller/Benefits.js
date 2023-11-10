import Order from '../Model/Order.js';
import InputView from '../View/InputView.js';
import OutputView from '../View/OutputView.js';

class Benefits {
  constructor() {
    this.order = new Order();
  }

  async show() {
    const reserveDay = await InputView.readDate();
    const oredrMenus = await InputView.readMenu();

    const orderedList = this.order.menuList(oredrMenus);
    OutputView.printMenuTitle(); // 타이틀 출력
    OutputView.printThis(orderedList); // 주문메뉴목록 출력

    this.order.totalAmount(oredrMenus);
  }
}

export default Benefits;
