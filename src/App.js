import OrderProcess from './Controller/OrderController.js';
import EventProcess from './Controller/EventController.js';
import BenefitProcess from './Controller/BenefitController.js';
import OutputView from './View/OutputView.js';
import Order from './Model/Order.js';
import Calculate from './Model/Calculate.js';

class App {
  constructor() {
    this.orderProcess = new OrderProcess();
  }

  createOrder(orderMenus) {
    return new Order(orderMenus);
  }

  // createEvent() {
  //   return new Event();
  // }

  createCalculate(benefits) {
    return new Calculate(benefits);
  }

  async run() {
    try {
      const { reserveDay, orderMenus } = await this.orderProcess.result();

      const order = this.createOrder(orderMenus);
      const eventProcess = new EventProcess(reserveDay, order);

      const calculate = this.createCalculate(eventProcess.result());
      const benefitPrcoess = new BenefitProcess(calculate, order);

      benefitPrcoess.printResult();
    } catch (error) {
      OutputView.printThis(error.message);
    }
  }
}

export default App;
