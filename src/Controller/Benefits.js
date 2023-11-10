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
    OutputView.printThis(`<주문 메뉴>\n${orderedList}\n`); // 주문메뉴목록 출력

    const totalPaid = this.order.totalAmount(oredrMenus);
    OutputView.printThis(`<할인 전 총주문 금액>\n${totalPaid}\n`);
    // 총 주문금액 출력

    const courses = this.order.courseType(oredrMenus); // 각 주문 코스별로 분배한 결과 출력
    this.event = new Event(reserveDay, courses);

    //
    // 어차피 총혜택금액, 할인 후 예상금액은 '없음' 처리가 아니라 계산된 금액이어야 함 (적용없으면 0원으로 계산처리해보자)
    const isGift = this.event.hasFreeMenu(totalPaid); // 증정여부
    OutputView.printThis('<증정 메뉴>');
    console.log(`${MENU.FREE_OPTION[Math.abs(isGift.result)]}\n`);

    const BenefitsDetail = this.event.checkBenefitList(isGift);
    OutputView.printThis('<혜택 내역>');
    OutputView.printThis(BenefitsDetail);
    this.calculate = new Calculate(BenefitsDetail);

    const totalBenefits = this.calculate.totalBenefits();
    OutputView.printThis(`<총혜택 금액>\n${totalBenefits}\n`);

    const expectedDiscount = this.calculate.expectedTotal(isGift);
    OutputView.printThis(
      `<할인 후 예상 결제 금액>\n${totalPaid + expectedDiscount}\n`
    );

    const badge = this.event.awardBadge(totalBenefits);
    OutputView.printThis(`<12월 이벤트 배지>\n${badge}`);
  }
}

export default Promotion;
