import OrderProcess from './Controller/OrderController.js';
import EventProcess from './Controller/EventController.js';
import BenefitProcess from './Controller/BenefitController.js';

import Order from './Model/Order.js';
import Benefits from './Model/Benefit.js';

import OutputView from './View/OutputView.js';
import Factory from './Utils/Factory.js';

class App {
  constructor() {
    this.orderProcess = new OrderProcess();
  }

  async run() {
    try {
      const { reserveDay, orderMenus } = await this.orderProcess.result();
      const order = Factory.createOrder(orderMenus);

      const eventProcess = new EventProcess(reserveDay, order);
      const benefits = Factory.createBenefit(eventProcess.result());

      const benefitProcess = new BenefitProcess(benefits, order);

      benefitProcess.printResult();
    } catch (error) {
      OutputView.printThis(error.message);
    }
  }
}

export default App;
