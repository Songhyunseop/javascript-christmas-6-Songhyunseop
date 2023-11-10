import MENU from '../Menu.js';

class Order {
  #total;

  constructor() {
    this.#total = 0;
  }

  // 입력된 주문 메뉴를 형식에 맞춰 반환
  menuList(menuInput) {
    const eachMenuAndCount = menuInput.split(',').map((el) => el.split('-'));
    const result = eachMenuAndCount
      .map((el) => `${el[0]} ${el[1]}개`)
      .join('\n');

    return result;
  }

  // 입력된 주문메뉴의 총합 금액 반환
  totalAmount(menuInput) {
    const eachMenuAndCount = menuInput.split(',').map((el) => el.split('-'));

    const result = eachMenuAndCount.reduce((total, menuItem) => {
      const amount = this.#calculateTotalMenuAmount(menuItem);
      return total + amount;
    }, 0);

    this.#total = result;

    return this.#total;
  }

  #calculateTotalMenuAmount(menuItem) {
    const [menu, orderCount] = menuItem;
    const price = MENU.LIST[menu];

    return price * Number(orderCount);
  }

  // 입력된 각 메뉴의 코스타입 반환
  courseType(menuInput) {
    const eachMenuAndCount = menuInput.split(',').map((el) => el.split('-'));
    const allMenu = eachMenuAndCount.map((el) => el[0]);

    const course = allMenu.map((menu) => this.#findCourseType(menu));

    return course;
  }

  #findCourseType(menuName) {
    const found = MENU.CATEGORIES.find((category) =>
      category.list.includes(menuName)
    );

    return found.name;
  }

  // 증정품 여부 체크
  hasFreeMenu() {
    if (this.#total > 120000) return '샴페인 1개';
    return false;
  }
}

export default Order;
