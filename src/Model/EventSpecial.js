import { EVENT, SPECIAL } from '../Constant/Event.js';
import Event from './Event.js';

class EventSpecial extends Event {
  #day;

  constructor(day) {
    super(day);
    this.#day = day;
  }

  // 특별할인 이벤트 체크
  #isSpecialday() {
    return SPECIAL.DAYS.find((day) => day === this.#day);
  }

  checkAvailable() {
    if (this.#isSpecialday()) {
      return { name: EVENT.SPECIAL, benefit: SPECIAL.DISCOUNT };
    }
    return EVENT.NO_BENEFIT_DAY;
  }
}

export default EventSpecial;
