import { CHRISTMAS, EVENT } from '../Constant/Event.js';
import Event from './Event.js';

class EventChristmas extends Event {
  #day;

  constructor(day) {
    super(day);
    this.#day = day;
  }

  // 크리스마스 이벤트 체크
  #isChristmas() {
    return this.#day !== EVENT.NO_BENEFIT_DAY && this.#day <= CHRISTMAS.END;
  }

  #calculateChristmasDiscount() {
    return CHRISTMAS.BASE_DISCOUNT + (this.#day - 1) * CHRISTMAS.DISCOUNT;
  }

  checkAvailable() {
    if (this.#isChristmas()) {
      const benefit = this.#calculateChristmasDiscount();
      return { name: EVENT.CHRISTMAS, benefit };
    }
    return EVENT.NO_BENEFIT_DAY;
  }
}

export default EventChristmas;
