import Event from '../Model/Event.js';
import OutputView from '../View/OutputView.js';

class BenefitProcess {
  constructor(benefit, order) {
    this.benefit = benefit;
    this.order = order;
  }

  getTotalAndBadge() {
    const totalBenefit = this.benefit.total();
    const badge = this.benefit.returnBadge(totalBenefit);

    return { totalBenefit, badge };
  }

  getDiscountedPrice() {
    const event = new Event();
    const totalPaid = this.order.totalAmount();

    const freeGift = event.checkFreeMenu(totalPaid);
    const totalDisCounted = this.benefit.exceptGift(freeGift);

    return { totalDisCounted };
  }

  printResult() {
    const { totalBenefit, badge } = this.getTotalAndBadge();
    const { totalDisCounted } = this.getDiscountedPrice();

    const totalPaid = this.order.totalAmount();

    OutputView.printThis(`<총혜택 금액>\n${totalBenefit}\n`);
    OutputView.printThis(
      `<할인 후 예상 결제 금액>\n${totalPaid + totalDisCounted}\n`
    );
    OutputView.printThis(`<12월 이벤트 배지>\n${badge}`);
  }
}

export default BenefitProcess;
