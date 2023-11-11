import MENU from '../Constant/Menu.js';
import Calculate from '../Model/Calculate.js';
import Event from '../Model/Event.js';
import Order from '../Model/Order.js';
import InputView from '../View/InputView.js';
import OutputView from '../View/OutputView.js';

class Promotion {
  constructor() {
    this.order = new Order();
  }

  async readReservationInput() {
    return {
      reserveDay: await InputView.readDate(),
      orderMenus: await InputView.readMenu(),
    };
  }

  generateOrderInfo(oredrMenus) {
    const orderedList = this.order.menuList(oredrMenus);
    const totalPaid = this.order.totalAmount(oredrMenus);
    const courses = this.order.courseType(oredrMenus);

    OutputView.printThis(`<주문 메뉴>\n${orderedList}\n`);
    OutputView.printThis(`<할인 전 총주문 금액>\n${totalPaid}\n`);

    return { totalPaid, courses };
  }

  generateFreeGiftDetails(event, totalPaid) {
    const isFreeMenu = event.hasFreeMenu(totalPaid);

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

  processEventResult({ eventDetail, isFreeMenu }, totalPaid) {
    const calculate = new Calculate(eventDetail);

    const totalBenefit = calculate.totalBenefits();
    const disCounted = calculate.expectedTotal(isFreeMenu);

    OutputView.printThis(`<총혜택 금액>\n${totalBenefit}\n`);
    OutputView.printThis(
      `<할인 후 예상 결제 금액>\n${totalPaid + disCounted}\n`
    );
    return totalBenefit;
  }

  createEvent(reserveDay, courses) {
    return new Event(reserveDay, courses);
  }

  checkEventResult(event, totalPaid) {
    event.checkAvailable(totalPaid);
    const isFreeMenu = this.generateFreeGiftDetails(event, totalPaid);
    const eventDetail = this.generateDiscountEventDetails(event, isFreeMenu);

    return { eventDetail, isFreeMenu };
  }

  getBadgeResult(event, totalBenefit) {
    const badge = event.awardBadge(totalBenefit);
    OutputView.printThis(`<12월 이벤트 배지>\n${badge}`);
  }
}

export default Promotion;
