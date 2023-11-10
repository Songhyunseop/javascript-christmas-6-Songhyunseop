import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printMenuTitle() {
    Console.print('<주문 메뉴>');
  },

  printThis(menu) {
    Console.print(menu);
  },
};

export default OutputView;
