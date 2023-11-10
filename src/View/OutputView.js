import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printMenuTitle() {
    Console.print('<주문 메뉴>');
  },

  printMenus(menu) {
    Console.print(menu);
  },
};

export default OutputView;
