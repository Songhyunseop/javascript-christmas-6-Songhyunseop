import Event from '../Model/Event.js';
import { formatAmount } from '../Utils/utils.js';
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
    const totalPaid = this.order.totalAmount();
    const freeGift = Event.checkFreeMenu(totalPaid);

    const totalDisCounted = this.benefit.exceptGift(freeGift);

    return { totalDisCounted, totalPaid };
  }

  printResult() {
    const { totalBenefit, badge } = this.getTotalAndBadge();
    const { totalDisCounted, totalPaid } = this.getDiscountedPrice();

    OutputView.printThis(`<총혜택 금액>\n${formatAmount(totalBenefit)}원\n`);
    OutputView.printThis(
      `<할인 후 예상 결제 금액>\n${formatAmount(
        totalPaid + totalDisCounted
      )}원\n`
    );
    OutputView.printThis(`<12월 이벤트 배지>\n${badge}`);
  }
}

export default BenefitProcess;
