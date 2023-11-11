class Event {
  constructor(day, courses) {
    this.day = Number(day);
    this.courses = courses;
  }

  checkAvailable(totalPaid) {
    if (totalPaid < 10000) this.day = 'noEvent';
  }

  christMasDay() {
    if (this.day !== 'noEvent' && this.day <= 25) {
      const result = -(1000 + (this.day - 1) * 100);

      return { name: '크리스마스 디데이 할인', result };
    }
    return { name: '크리스마스 디데이 할인', result: 0 };
  }

  everyDay() {
    if (this.day) {
      const dayOfWeek = new Date(`2023-12-${this.day}`).getDay();

      if (dayOfWeek <= 5) {
        const result = -(this.courses.Dessert * 2023);
        return { name: '평일 할인', result };
      }
      if (dayOfWeek > 5) {
        const result = -(this.courses.Main * 2023);
        return { name: '주말 할인', result };
      }
    }

    return { name: '주말 할인', result: 0 };
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
    if (total >= 120000) return { name: '증정 이벤트', result: -25000 };
    return { name: '증정 이벤트', result: 0 };
  }

  checkBenefitList(isGift) {
    const discountMethods = [
      this.christMasDay.bind(this),
      this.everyDay.bind(this),
      this.specialDay.bind(this),
      () => isGift,
    ];

    const details = this.#getDiscountMethodResults(discountMethods);

    return details;
  }

  // 할인 적용 내역 filter
  #getDiscountMethodResults(Methods) {
    const result = Methods.filter((method) => {
      const info = method();

      return Math.abs(info.result) !== 0;
    }).map((method) => method());

    return result;
  }

  awardBadge(totalBenefits) {
    if (totalBenefits >= 20000) return '산타';
    if (totalBenefits >= 10000) return '트리';
    if (totalBenefits >= 5000) return '별';
    return '없음';
  }
}

export default Event;
