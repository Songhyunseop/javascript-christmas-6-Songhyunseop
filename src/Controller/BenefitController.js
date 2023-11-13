import Event from '../Model/Event.js';
import OutputView from '../View/OutputView.js';

class BenefitProcess {
  constructor(calculate, order) {
    this.calculate = calculate;
    this.order = order;
  }

  returnBadge(totalBenefits) {
    if (Math.abs(totalBenefits) >= 20000) return '산타';
    if (Math.abs(totalBenefits) >= 10000) return '트리';
    if (Math.abs(totalBenefits) >= 5000) return '별';
    return '없음';
  }

  getTotalAndBadge() {
    const totalBenefit = this.calculate.totalBenefits();
    const badge = this.returnBadge(totalBenefit);

    return { totalBenefit, badge };
  }

  getDiscountedPrice() {
    const event = new Event();
    const totalPaid = this.order.totalAmount();

    const isFreeGift = event.hasFreeMenu(totalPaid);
    const totalDisCounted = this.calculate.expectedTotal(isFreeGift);

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
