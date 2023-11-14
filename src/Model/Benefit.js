import { BADGE, BENEFIT } from '../Constant/Benefit.js';

class Benefits {
  #totalBenefit;

  constructor(benefit) {
    this.benefit = benefit;
    this.#totalBenefit = 0;
  }

  // 총 혜택금액 합산
  total() {
    const result = this.benefit.reduce(
      (total, discount) => total + discount.result,
      0
    );
    this.#totalBenefit = result;

    return result;
  }

  // 증정품 제외 할인 금액
  exceptGift(isGift) {
    return this.#totalBenefit - isGift.result;
  }

  // 혜택에 대한 뱃지 결과
  #isSantaBadge() {
    return Math.abs(this.#totalBenefit) >= BENEFIT.MAX;
  }

  #isTreeBadge() {
    return Math.abs(this.#totalBenefit) >= BENEFIT.MID;
  }

  #isStarBadge() {
    return Math.abs(this.#totalBenefit) >= BENEFIT.MIN;
  }

  returnBadge() {
    if (this.#isSantaBadge()) return BADGE.SANTA;
    if (this.#isTreeBadge()) return BADGE.TREE;
    if (this.#isStarBadge()) return BADGE.STAR;
    return BADGE.NOTHING;
  }
}

export default Benefits;