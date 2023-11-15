import Benefits from '../Model/Benefit.js';
import EventChristmas from '../Model/EvenctChristmas.js';
import Event from '../Model/Event.js';
import EventEvery from '../Model/EventEvery.js';
import EventSpecial from '../Model/EventSpecial.js';
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

  static createChristmas(day) {
    return new EventChristmas(day);
  }

  static createEvery(day, courses) {
    return new EventEvery(day, courses);
  }

  static createSpecial(day) {
    return new EventSpecial(day);
  }

  static checkAllEvent(day, courses) {
    const eventCreators = [
      () => this.createChristmas(day).checkAvailable(),
      () => this.createEvery(day, courses).checkAvailable(),
      () => this.createSpecial(day).checkAvailable(),
    ];

    return eventCreators;
  }
}

export default Factory;
