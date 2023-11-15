import Event from '../Model/Event.js';
import OutputView from '../View/OutputView.js';

import { formatDetails } from '../Utils/utils.js';
import { GIFT } from '../Constant/Event.js';
import Factory from '../Utils/Factory.js';

class EventProcess {
  #day;

  constructor(reserveDay, order) {
    this.#day = Number(reserveDay);
    this.order = order;
    this.event = null;
  }

  #checkEventAvailable(totalPaid) {
    const courses = this.order.getMenuCourse();
    const event = Factory.createEvent(this.#day, courses);

    this.event = event.checkAvailable(totalPaid);
  }

  #generateFreeGiftDetails(totalPaid) {
    const freeGift = Event.checkFreeMenu(totalPaid);

    return freeGift;
  }

  #generateAppliedBenefits(freeGift) {
    const BenefitsDetail = this.event.getTotalChecked(freeGift);

    return BenefitsDetail;
  }

  #isFree(freeGiftBenefit) {
    return `${GIFT.FREE_OPTION[Math.abs(freeGiftBenefit)]}\n`;
  }

  result() {
    const totalPaid = this.order.totalAmount();

    this.#checkEventAvailable(totalPaid);
    const freeGift = this.#generateFreeGiftDetails(totalPaid);
    const benefitsDetail = this.#generateAppliedBenefits(freeGift);

    OutputView.printThis(`<증정 메뉴>\n${this.#isFree(freeGift.benefit)}`);
    OutputView.printThis(`<혜택 내역>\n${formatDetails(benefitsDetail)}`);

    return benefitsDetail;
  }
}

export default EventProcess;
