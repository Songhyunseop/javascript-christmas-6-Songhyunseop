import MENU from '../Constant/Menu.js';
import Calculate from '../Model/Calculate.js';
import Event from '../Model/Event.js';
import Order from '../Model/Order.js';
import { validateInput } from '../Utils/Validate.js';
import InputView from '../View/InputView.js';
import OutputView from '../View/OutputView.js';

class Promotion {
  #totalPaid;

  constructor() {
    this.order = new Order();
    this.#totalPaid = 0;
  }

  async readReservationInput() {
    let reserveDay;
    let orderMenus;

    try {
      reserveDay = await InputView.readDate();
      orderMenus = await InputView.readMenu();
      validateInput(reserveDay, orderMenus);
    } catch (error) {
      OutputView.printThis(error.message);
    }

    return { reserveDay, orderMenus };
  }

  generateOrderInfo(oredrMenus) {
    const orderedList = this.order.menuList(oredrMenus);
    const totalPaid = this.order.totalAmount(oredrMenus);
    const courses = this.order.courseType(oredrMenus);

    this.#totalPaid = totalPaid;

    OutputView.printThis(`<주문 메뉴>\n${orderedList}\n`);
    OutputView.printThis(`<할인 전 총주문 금액>\n${totalPaid}\n`);

    return courses;
  }

  generateFreeGiftDetails(event) {
    const isFreeMenu = event.hasFreeMenu(this.#totalPaid);

    OutputView.printThis('<증정 메뉴>');
    OutputView.printThis(`${MENU.FREE_OPTION[Math.abs(isFreeMenu.result)]}\n`);

    return isFreeMenu;
  }

  generateDiscountEventDetails(event, isFree) {
    const BenefitsDetail = event.checkBenefitList(isFree);
    const formattedBenefits = event.formatOrderDetails(BenefitsDetail);

    OutputView.printThis(`<혜택 내역>\n${formattedBenefits}`);

    return BenefitsDetail;
  }

  benefitResult({ eventDetail, isFreeMenu }) {
    const calculate = new Calculate(eventDetail);

    const totalBenefit = calculate.totalBenefits();
    const disCounted = calculate.expectedTotal(isFreeMenu);

    OutputView.printThis(`<총혜택 금액>\n${totalBenefit}\n`);
    //
    //
    OutputView.printThis(
      `<할인 후 예상 결제 금액>\n${this.#totalPaid + disCounted}\n`
    );
    return totalBenefit;
  }

  createEvent(reserveDay, courses) {
    return new Event(reserveDay, courses);
  }

  eventResult(event) {
    event.checkAvailable(this.#totalPaid);
    const isFreeMenu = this.generateFreeGiftDetails(event);
    const eventDetail = this.generateDiscountEventDetails(event, isFreeMenu);

    return { eventDetail, isFreeMenu };
  }

  getBadgeResult(event, totalBenefit) {
    const badge = event.awardBadge(totalBenefit);
    OutputView.printThis(`<12월 이벤트 배지>\n${badge}`);
  }
}

export default Promotion;
