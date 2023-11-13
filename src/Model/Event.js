class Event {
  constructor(day, courses) {
    this.day = Number(day);
    this.courses = courses;
  }

  checkAvailable(totalPaid) {
    if (totalPaid < 10000) return new Event('NO_EVENT', this.courses);
    return this;
  }

  christMasDay() {
    if (this.day !== 'NO_EVENT' && this.day <= 25) {
      const result = -(1000 + (this.day - 1) * 100);

      return { name: '크리스마스 디데이 할인', result };
    }
    return 'NO_EVENT';
  }

  everyDay() {
    if (this.day !== 'NO_EVENT') {
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

    return 'NO_EVENT';
  }

  specialDay() {
    const specials = [3, 10, 17, 24, 25, 31];

    if (specials.find((day) => day === this.day)) {
      return { name: '특별 할인', result: -1000 };
    }
    return 'NO_EVENT';
  }

  // 증정품 여부 체크
  hasFreeMenu(total) {
    if (total >= 120000) return { name: '증정 이벤트', result: -25000 };
    return { result: 0 };
  }

  getCheckedEventTotal(totalPaid) {
    const eventCheckMethods = [
      this.christMasDay.bind(this),
      this.everyDay.bind(this),
      this.specialDay.bind(this),
      () => this.hasFreeMenu(totalPaid),
    ];

    const result = eventCheckMethods.map((el) => el());

    return this.#getDiscountResults(result);
  }

  // checkBenefitList(isFree) {
  //   const discountMethods = [
  //     this.christMasDay.bind(this),
  //     this.everyDay.bind(this),
  //     this.specialDay.bind(this),
  //     () => isFree,
  //   ];

  //   const details = this.#getDiscountResults(discountMethods);

  //   return details;
  // }

  // 할인 적용 내역 filter
  #getDiscountResults(discountResult) {
    const result = discountResult.filter((el) => el.result);

    return result;
  }
}

export default Event;
