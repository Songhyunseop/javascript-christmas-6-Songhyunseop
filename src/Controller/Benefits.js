import MENU from '../Constant/Menu.js';
import Event from '../Model/Event.js';
import Order from '../Model/Order.js';
import InputView from '../View/InputView.js';
import OutputView from '../View/OutputView.js';

class Benefits {
  constructor() {
    this.order = new Order();
    this.event = null;
  }

  async show() {
    const reserveDay = await InputView.readDate();
    const oredrMenus = await InputView.readMenu();

    const orderedList = this.order.menuList(oredrMenus);
    OutputView.printMenuTitle(); // 타이틀 출력
    OutputView.printThis(orderedList); // 주문메뉴목록 출력

    const totalPaid = this.order.totalAmount(oredrMenus);
    OutputView.printThis(totalPaid); // 총 주문금액 출력

    const courses = this.order.courseType(oredrMenus); // 각 주문 코스별로 분배한 결과 출력

    this.event = new Event(reserveDay, courses);

    this.event.checkAvailable(totalPaid);

    const event1 = this.event.chirstMasDay();
    console.log(`크리스마스할인:${event1}`);
    const event2 = this.event.everyDay();
    console.log(`평일/주말 할인:${event1}`);
    const event3 = this.event.specialDay();
    console.log(`특별할인:${event1}`);

    const arr = [event1, event2, event3];

    const isGift = this.event.hasFreeMenu(totalPaid); // 증정여부

    if (isGift > 0) arr.push(isGift);
    console.log(`증정품: ${MENU.FREE_OPTION[isGift]}`);
  }

  // aaa(name) {

  //   if(name.names === 'totalPaid') {
  //     // 금액에 따른 증정여부 계산로직
  //   }

  //   if(name.names === 'benefit') {
  //     // 혜택 내역에 대한 로직
  //   }

  //   if(name.names==='totalBenefit') {
  //     // 총 혜택 금액에 대한 로직
  //   }

  //   if(name.names === 'eventBattchi') {
  //     // 이벤트 배지에 대한 로직
  //   }
  // }
}

export default Benefits;
