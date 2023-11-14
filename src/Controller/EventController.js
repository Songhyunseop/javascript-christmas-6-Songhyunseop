import Event from '../Model/Event.js';
import OutputView from '../View/OutputView.js';
import MENU from '../Constant/Menu.js';
import { formatOrderDetails } from '../Utils/utils.js';

class EventProcess {
  constructor(reserveDay, order) {
    this.day = Number(reserveDay);
    this.order = order;
    this.event = null;
  }

  #checkEventAvailable(totalPaid) {
    const courses = this.order.getMenuCourse();
    const event = new Event(this.day, courses);

    this.event = event.checkAvailable(totalPaid);
  }

  #generateFreeGiftDetails(totalPaid) {
    const freeGift = this.event.checkFreeMenu(totalPaid);

    return freeGift;
  }

  #generateAppliedBenefits(isFreeGift) {
    const BenefitsDetail = this.event.getTotalChecked(isFreeGift);
    return BenefitsDetail;
  }

  #isFree(freeGiftBenefit) {
    return `${MENU.FREE_OPTION[Math.abs(freeGiftBenefit)]}\n`;
  }

  result() {
    const totalPaid = this.order.totalAmount();

    this.#checkEventAvailable(totalPaid);
    const freeGift = this.#generateFreeGiftDetails(totalPaid);
    const benefitsDetail = this.#generateAppliedBenefits(totalPaid);

    OutputView.printThis(`<증정 메뉴>\n${this.#isFree(freeGift.benefit)}`);
    OutputView.printThis(`<혜택 내역>\n${formatOrderDetails(benefitsDetail)}`);

    return benefitsDetail;
  }
}

export default EventProcess;
