import { EVENT, CHRISTMAS, EVERY, SPECIAL, GIFT } from '../Constant/Event';
import { getDayofWeeks } from '../Utils/utils';

class Event {
  constructor(day, courses) {
    this.day = Number(day);
    this.courses = courses;
  }

  checkAvailable(totalPaid) {
    if (totalPaid < EVENT.MIN_PAID) {
      return new Event(EVENT.NO_BENEFIT, this.courses);
    }
    return this;
  }

  // 크리스마스 이벤트
  #isChristmasEvent(day) {
    return day !== EVENT.NO_BENEFIT && day <= CHRISTMAS.END;
  }

  christmasDay() {
    if (this.#isChristmasEvent(this.day)) {
      const result = -(
        CHRISTMAS.BASE_DISCOUNT +
        (this.day - 1) * CHRISTMAS.DISCOUNT
      );

      return { name: EVENT.CHRISTMAS, result };
    }
    return EVENT.NO_BENEFIT;
  }

  // 평일, 주말 이벤트
  #isEveryDayEvent() {
    return this.day !== EVENT.NO_BENEFIT;
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

  #checkEveryEventBenefit() {
    if (this.#isWeeks()) return this.#calculateWeeksBenefit();

    return this.#calculateWeekendBenefit();
  }

  everyDay() {
    if (this.#isEveryDayEvent()) return this.#checkEveryEventBenefit();

    return EVENT.NO_BENEFIT;
  }

  // 특별할인 이벤트
  #isSpecialdayEvent() {
    return SPECIAL.DAYS.find((day) => day === this.day);
  }

  specialDay() {
    if (this.#isSpecialdayEvent()) {
      return { name: EVENT.SPECIAL, result: SPECIAL.DISCOUNT };
    }
    return EVENT.NO_BENEFIT;
  }

  // 증정품 이벤트
  hasFreeMenu(total) {
    if (total >= GIFT.MIN_PAID) {
      return { name: EVENT.GIFT, result: GIFT.REWARD };
    }
    return { result: 0 };
  }

  getTotalChecked(totalPaid) {
    const eventCheckMethods = [
      this.christmasDay.bind(this),
      this.everyDay.bind(this),
      this.specialDay.bind(this),
      () => this.hasFreeMenu(totalPaid),
    ];

    const result = eventCheckMethods.map((el) => el());

    return this.#getDiscountResults(result);
  }

  // 혜택 적용내역 filter
  #getDiscountResults(discountResult) {
    const result = discountResult.filter((el) => el.result);

    return result;
  }
}

export default Event;
