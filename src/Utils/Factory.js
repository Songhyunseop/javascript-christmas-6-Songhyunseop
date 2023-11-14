import Benefits from '../Model/Benefit.js';
import Event from '../Model/Event.js';
import Order from '../Model/Order.js';

class Factory {
  static createOrder(orderMenus) {
    return new Order(orderMenus);
  }

  static createEvent(day, courses) {
    return new Event(day, courses);
  }

  static createBenefit(benefits) {
    return new Benefits(benefits);
  }
}

export default Factory;
