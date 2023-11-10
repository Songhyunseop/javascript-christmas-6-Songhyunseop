class Event {
  constructor(day) {
    this.day = day;
  }

  dayCheck() {
    // console.log('11111');
  }

  chirstMas() {
    if (this.day <= 25) {
      const result = 1000 + (this.day - 1) * 100;
      return result;
    }
    return '없음';
  }

  //   everyDay () {
  //     if(this.day==='weekdays')
  //     if(this.day==='weekend')
  //   }
}

export default Event;
