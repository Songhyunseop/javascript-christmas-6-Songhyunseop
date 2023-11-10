class Calculate {
  constructor(benefit) {
    this.benefit = benefit;
    this.totalBenefit = null;
  }

  // 총 혜택금액 합산
  totalBenefits() {
    const result = this.benefit.reduce(
      (total, discount) => total + discount.result,
      0
    );
    this.totalBenefit = result;
    return result;
  }

  expectedTotal(isGift) {
    if (isGift.result !== 0) return this.totalBenefit + 25000;

    return this.totalBenefit;
  }
}

export default Calculate;
