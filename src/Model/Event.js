class Event {
  constructor(day, courses) {
    this.day = Number(day);
    this.courses = courses;
  }

  checkAvailable(totalPaid) {
    if (totalPaid < 10000) return;
  }

  chirstMasDay() {
    if (this.day <= 25) {
      return -(1000 + (this.day - 1) * 100);
    }
    return 0;
  }

  everyDay() {
    const dayOfWeek = new Date(`2023-12-${this.day}`).getDay();

    if (dayOfWeek >= 5) return -(this.courses.Main * 2023);
    if (dayOfWeek <= 5) return -(this.courses.Dessert * 2023);

    return 0;
  }

  specialDay() {
    const specials = [3, 10, 17, 24, 25, 31];

    if (specials.find((day) => day === this.day)) return -1000;
    return 0;
  }

  // 증정품 여부 체크
  hasFreeMenu(total) {
    if (total > 120000) return 25000;
    return 0;
  }
}

export default Event;
