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

    const courses = this.order.courseType(orderedList);

    this.event = new Event(reserveDay);
    this.event.dayCheck();

    const freeGift = this.order.hasFreeMenu(); // 증정여부
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
