import Promotion from './Controller/Promotion.js';
import OutputView from './View/OutputView.js';

class App {
  async run() {
    const promotion = new Promotion();
    try {
      const { reserveDay, orderMenus } = await promotion.readReservationInput();
      const courses = promotion.generateOrderInfo(orderMenus);

      const event = promotion.createEvent(reserveDay, courses);

      // 이벤트 확인 및 결과처리
      const eventResult = promotion.eventResult(event);
      const totalBenefit = promotion.benefitResult(eventResult);

      // 뱃지 결과 출력
      promotion.getBadgeResult(event, totalBenefit);
    } catch (error) {
      OutputView.printThis(error.message);
      return;
    }
  }
}

export default App;
