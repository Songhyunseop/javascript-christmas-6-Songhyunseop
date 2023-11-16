import { EVENT, GIFT } from '../Constant/Event.js';

class Event {
  #courses;

  constructor(day, courses) {
    this.day = day;
    this.#courses = courses;
  }

  checkAvailable(totalPaid) {
    if (totalPaid < EVENT.MIN_PAID) {
      return new Event(EVENT.NO_BENEFIT_DAY, this.#courses);
    }
    return this;
  }

  static #isFreeGift(total) {
    return total >= GIFT.MIN_PAID;
  }

  static checkFreeMenu(total) {
    if (this.#isFreeGift(total)) {
      return { name: EVENT.GIFT, benefit: GIFT.REWARD };
    }
    return { benefit: 0 };
  }

  // 혜택 적용내역 filter
  #getDiscountResults(discountResult) {
    return discountResult.filter((amount) => amount.benefit);
  }

  getTotalChecked(eventCheckFuncs) {
    const result = eventCheckFuncs.map((checkEvent) => checkEvent());

    return this.#getDiscountResults(result);
  }
}

export default Event;
