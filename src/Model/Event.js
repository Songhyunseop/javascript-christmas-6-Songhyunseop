class Event {
  constructor(day, courses) {
    this.day = Number(day);
    this.courses = courses;
  }

  checkAvailable(totalPaid) {
    if (totalPaid < 10000) return;
  }

  christMasDay() {
    if (this.day <= 25) {
      const result = -(1000 + (this.day - 1) * 100);

      return { name: '크리스마스 디데이 할인', result };
    }
    return { name: '크리스마스 디데이 할인', result: 0 };
  }

  everyDay() {
    const dayOfWeek = new Date(`2023-12-${this.day}`).getDay();

    if (dayOfWeek <= 5) {
      const result = -(this.courses.Dessert * 2023);
      return { name: '평일 할인', result };
    }

    const result = -(this.courses.Main * 2023);
    return { name: '주말 할인', result };
  }

  specialDay() {
    const specials = [3, 10, 17, 24, 25, 31];

    if (specials.find((day) => day === this.day)) {
      return { name: '특별 할인', result: -1000 };
    }
    return { name: '특별 할인', result: 0 };
  }

  // 증정품 여부 체크
  hasFreeMenu(total) {
    if (total > 120000) return { name: '증정 이벤트', result: -25000 };
    return { name: '증정 이벤트', result: 0 };
  }

  // 혜택 내역 반환 (아직테스트 작성안함)
  checkBenefitList(isGift) {
    const discountMethods = [
      this.christMasDay.bind(this),
      this.everyDay.bind(this),
      this.specialDay.bind(this),
      () => isGift,
    ];

    // if (isGift) discountMethods.push(() => isGift);
    const details = this.#getDiscountMethodResults(discountMethods);

    return details;
  }

  // 할인 적용 내역 filter
  #getDiscountMethodResults(Methods) {
    const result = Methods.filter((method) => {
      const info = method();

      return info.result !== 0;
    }).map((method) => method());

    return result;
  }

  awardBadge(totalBenefits) {
    if (totalBenefits >= 20000) return '산타';
    if (totalBenefits >= 10000) return '트리';
    return '별';
  }
}

export default Event;
