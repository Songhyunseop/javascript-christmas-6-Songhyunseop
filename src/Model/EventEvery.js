import { DAY } from '../Constant/Config.js';
import { EVENT, EVERY } from '../Constant/Event.js';
import { getDayofWeeks } from '../Utils/utils.js';
import Event from './Event.js';

class EventEvery extends Event {
  #day;

  #courses;

  constructor(day, courses) {
    super(day, courses);
    this.#day = day;
    this.#courses = courses;
  }

  // 평일, 주말 이벤트 체크
  #isEveryDay() {
    return this.#day !== EVENT.NO_BENEFIT_DAY;
  }

  #isWeekend() {
    const dayofWeek = getDayofWeeks(this.#day);
    if (dayofWeek > DAY.WEEKDAY_END) return true;
    return false;
  }

  #calculateWeeksBenefit() {
    const benefit = -(this.#courses.Main * EVERY.DISCOUNT);
    return { name: EVENT.EVERY_WEEKEND, benefit };
  }

  #calculateWeekendBenefit() {
    const benefit = -(this.#courses.Dessert * EVERY.DISCOUNT);
    return { name: EVENT.EVERY_WEEKS, benefit };
  }

  #checkEventBenefit() {
    if (this.#isWeekend()) return this.#calculateWeeksBenefit();

    return this.#calculateWeekendBenefit();
  }

  checkAvailable() {
    if (this.#isEveryDay()) return this.#checkEventBenefit();

    return EVENT.NO_BENEFIT_DAY;
  }
}

export default EventEvery;
