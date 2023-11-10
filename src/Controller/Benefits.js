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

  async show() {
    const reserveDay = await InputView.readDate();
    const oredrMenus = await InputView.readMenu();

    const orderedList = this.order.menuList(oredrMenus);
    OutputView.printMenuTitle(); // 타이틀 출력
    OutputView.printThis(orderedList); // 주문메뉴목록 출력

    const totalPaid = this.order.totalAmount(oredrMenus);
    OutputView.printThis('<할인 전 총주문 금액>');
    OutputView.printThis(totalPaid); // 총 주문금액 출력

    const courses = this.order.courseType(oredrMenus); // 각 주문 코스별로 분배한 결과 출력
    this.event = new Event(reserveDay, courses);

    this.event.checkAvailable(totalPaid);

    const isGift = this.event.hasFreeMenu(totalPaid); // 증정여부
    OutputView.printThis('<증정 메뉴>');
    console.log(`${MENU.FREE_OPTION[Math.abs(isGift.result)]}`);

    const BenefitsDetail = this.event.checkBenefitList(isGift);
    OutputView.printThis('<혜택 내역>');
    OutputView.printThis(BenefitsDetail);

    this.calculate = new Calculate(BenefitsDetail);

    const totalBenefits = this.calculate.totalBenefits();
    OutputView.printThis('<총혜택 금액>');
    OutputView.printThis(totalBenefits);

    const expectedDiscount = this.calculate.expectedTotal(isGift);
    OutputView.printThis('<할인 후 예상 결제 금액>');
    OutputView.printThis(totalPaid + expectedDiscount); // 최종 결제금
  }
}

export default Promotion;
