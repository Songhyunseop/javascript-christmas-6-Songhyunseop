import OrderProcess from './Controller/OrderController.js';
import EventProcess from './Controller/EventController.js';
import BenefitProcess from './Controller/BenefitController.js';

import Order from './Model/Order.js';
import Benefits from './Model/Benefit.js';

import OutputView from './View/OutputView.js';

class App {
  constructor() {
    this.orderProcess = new OrderProcess();
  }

  createOrder(orderMenus) {
    return new Order(orderMenus);
  }

  createEvent() {
    return new Event();
  }

  createBenefit(benefits) {
    return new Benefits(benefits);
  }

  async run() {
    try {
      const { reserveDay, orderMenus } = await this.orderProcess.result();

      const order = this.createOrder(orderMenus);

      const eventProcess = new EventProcess(reserveDay, order);
      const benefits = this.createBenefit(eventProcess.result());

      const benefitPrcess = new BenefitProcess(benefits, order);
      benefitPrcess.printResult();
    } catch (error) {
      OutputView.printThis(error.message);
    }
  }
}

export default App;
