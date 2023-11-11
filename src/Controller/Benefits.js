import MENU from '../Constant/Menu.js';
import Calculate from '../Model/Calculate.js';
import Event from '../Model/Event.js';
import Order from '../Model/Order.js';
import InputView from '../View/InputView.js';
import OutputView from '../View/OutputView.js';

class Promotion {
  constructor() {
    this.order = new Order();
    this.event = null;
    this.calculate = null;
  }

  generateOrderInfo(oredrMenus) {
    const orderedList = this.order.menuList(oredrMenus);
    const totalPaid = this.order.totalAmount(oredrMenus);
    const courses = this.order.courseType(oredrMenus);

    OutputView.printThis(`<주문 메뉴>\n${orderedList}\n`);
    OutputView.printThis(`<할인 전 총주문 금액>\n${totalPaid}\n`);

    return { totalPaid, courses };
  }

  generateFreeGiftDetails(isGift) {
    OutputView.printThis('<증정 메뉴>');
    OutputView.printThis(`${MENU.FREE_OPTION[Math.abs(isGift.result)]}\n`);
  }

  generateDiscountEventDetails(isGift) {
    const BenefitsDetail = this.event.checkBenefitList(isGift);
    OutputView.printThis('<혜택 내역>');
    if (BenefitsDetail.length === 0) OutputView.printThis('없음\n');
    else OutputView.printThis(BenefitsDetail);

    return BenefitsDetail;
    //
  }

  calculateDiscounted(isGift) {
    const totalBenefits = this.calculate.totalBenefits();
    OutputView.printThis(`<총혜택 금액>\n${totalBenefits}\n`);

    const expectedDiscount = this.calculate.expectedTotal(isGift);

    return { totalBenefits, expectedDiscount };
  }

  async show() {
    const reserveDay = await InputView.readDate();
    const oredrMenus = await InputView.readMenu();

    const { totalPaid, courses } = this.generateOrderInfo(oredrMenus);

    this.event = new Event(reserveDay, courses);

    this.event.checkAvailable(totalPaid);

    const isGift = this.event.hasFreeMenu(totalPaid);
    const giftResult = this.generateFreeGiftDetails(isGift);

    const BenefitsDetail = this.generateDiscountEventDetails(isGift);

    this.calculate = new Calculate(BenefitsDetail);
    const { expectedDiscount, totalBenefits } =
      this.calculateDiscounted(isGift);

    OutputView.printThis(
      `<할인 후 예상 결제 금액>\n${totalPaid + expectedDiscount}\n`
    );
    const badge = this.event.awardBadge(totalBenefits);
    OutputView.printThis(`<12월 이벤트 배지>\n${badge}`);
  }
}

export default Promotion;
