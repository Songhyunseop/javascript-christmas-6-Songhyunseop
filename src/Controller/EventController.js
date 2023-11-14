import Event from '../Model/Event.js';
import OutputView from '../View/OutputView.js';
import MENU from '../Constant/Menu.js';
import { formatOrderDetails } from '../Utils/utils.js';

class EventProcess {
  constructor(reserveDay, order) {
    this.day = reserveDay;
    this.order = order;
    this.event = null;
  }

  #checkEventAvailable(totalPaid) {
    const courses = this.order.getMenuCourse();
    const event = new Event(this.day, courses);

    this.event = event.checkAvailable(totalPaid);
  }

  #generateFreeGiftDetails(totalPaid) {
    const isFreeMenu = this.event.hasFreeMenu(totalPaid);

    return isFreeMenu;
  }

  #generateAppliedBenefits(isFreeGift) {
    const BenefitsDetail = this.event.getCheckedEventTotal(isFreeGift);
    return BenefitsDetail;
  }

  #isFree(freeGiftResult) {
    return `${MENU.FREE_OPTION[Math.abs(freeGiftResult)]}\n`;
  }

  result() {
    const totalPaid = this.order.totalAmount();

    this.#checkEventAvailable(totalPaid);
    const FreeGiftResult = this.#generateFreeGiftDetails(totalPaid);
    const BenefitsDetail = this.#generateAppliedBenefits(totalPaid);

    OutputView.printThis(`<증정 메뉴>\n${this.#isFree(FreeGiftResult.result)}`);
    OutputView.printThis(`<혜택 내역>\n${formatOrderDetails(BenefitsDetail)}`);

    return BenefitsDetail;
  }
}

export default EventProcess;
