// prettier-ignore
import {
  EVENT, CHRISTMAS, EVERY, SPECIAL, GIFT
} from '../Constant/Event.js';

import { getDayofWeeks } from '../Utils/utils.js';

class Event {
  constructor(day, courses) {
    this.day = day;
    this.courses = courses;
  }

  checkAvailable(totalPaid) {
    if (totalPaid < EVENT.MIN_PAID) {
      return new Event(EVENT.NO_BENEFIT_DAY, this.courses);
    }
    return this;
  }

  // 크리스마스 이벤트 체크
  #isChristmas() {
    return this.day !== EVENT.NO_BENEFIT_DAY && this.day <= CHRISTMAS.END;
  }

  // prettier-ignore
  checkChristmas() {
    if (this.#isChristmas()) {
      const result = (
        CHRISTMAS.BASE_DISCOUNT
        + (this.day - 1) * CHRISTMAS.DISCOUNT
      );

      return { name: EVENT.CHRISTMAS, result };
    }
    return EVENT.NO_BENEFIT_DAY;
  }

  // 평일, 주말 이벤트 체크
  #isEveryDay() {
    return this.day !== EVENT.NO_BENEFIT_DAY;
  }

  #isWeeks() {
    const dayofWeek = getDayofWeeks(this.day);
    if (dayofWeek > 5) return true;
    return false;
  }

  #calculateWeeksBenefit() {
    const result = -(this.courses.Main * EVERY.DISCOUNT);
    return { name: EVENT.EVERY_WEEKS, result };
  }

  #calculateWeekendBenefit() {
    const result = -(this.courses.Dessert * EVERY.DISCOUNT);
    return { name: EVENT.EVERY_WEEKEND, result };
  }

  #checkEveryBenefit() {
    if (this.#isWeeks()) return this.#calculateWeeksBenefit();

    return this.#calculateWeekendBenefit();
  }

  checkEveryDay() {
    if (this.#isEveryDay()) return this.#checkEveryBenefit();

    return EVENT.NO_BENEFIT_DAY;
  }

  // 특별할인 이벤트 체크
  #isSpecialday() {
    return SPECIAL.DAYS.find((day) => day === this.day);
  }

  checkSpecialDay() {
    if (this.#isSpecialday()) {
      return { name: EVENT.SPECIAL, result: SPECIAL.DISCOUNT };
    }
    return EVENT.NO_BENEFIT_DAY;
  }

  // 증정품 이벤트 체크

  #isFreeGift(total) {
    return total >= GIFT.MIN_PAID;
  }

  checkFreeMenu(total) {
    if (this.#isFreeGift(total)) {
      return { name: EVENT.GIFT, result: GIFT.REWARD };
    }
    return { result: 0 };
  }

  // 혜택 적용내역 filter
  #getDiscountResults(discountResult) {
    return discountResult.filter((el) => el.result);
  }

  getTotalChecked(totalPaid) {
    const eventCheckMethods = [
      () => this.checkChristmas(),
      () => this.checkEveryDay(),
      () => this.checkSpecialDay(),
      () => this.checkFreeMenu(totalPaid),
    ];

    const result = eventCheckMethods.map((el) => el());

    return this.#getDiscountResults(result);
  }
}

export default Event;
