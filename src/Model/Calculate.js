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
    return this.totalBenefit + isGift.result;
  }
}

export default Calculate;
