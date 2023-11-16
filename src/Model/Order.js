import MENU from '../Constant/Menu.js';
import { ORDER } from '../Constant/Config.js';
import { parseStringByDash } from '../Utils/utils.js';

class Order {
  constructor(menus) {
    this.menus = menus;
  }

  // 입력된 주문 메뉴를 형식에 맞춰 반환
  menuList() {
    const eachMenuAndCount = parseStringByDash(this.menus);
    const result = eachMenuAndCount
      .map((each) => `${each[ORDER.MENU_NAME]} ${each[ORDER.COUNT]}개`)
      .join('\n');

    return result;
  }

  // 입력된 주문메뉴의 총합 금액 반환
  #calculateTotalAmount(menuItem) {
    const [menu, orderCount] = menuItem;
    const price = MENU.LIST[menu];

    return price * Number(orderCount);
  }

  totalAmount() {
    const eachMenuAndCount = parseStringByDash(this.menus);

    const result = eachMenuAndCount.reduce(
      (total, menuItem) => total + this.#calculateTotalAmount(menuItem),
      0
    );

    return result;
  }

  // 입력된 각 메뉴의 코스타입 반환

  #findCourseType(menuName) {
    const found = MENU.CATEGORIES.find((category) =>
      category.list.includes(menuName)
    );

    return found.name;
  }

  #countMenuCourses(allMenu) {
    const countResult = { ...MENU.COURSES_COUNT };

    allMenu.forEach((menu) => {
      const course = this.#findCourseType(menu);
      countResult[course] += 1;
    });

    return countResult;
  }

  #generateOrderedItems(menuAndCount) {
    const [menu, count] = menuAndCount;
    const result = Array.from({ length: Number(count) }).map((_) => menu);

    return result;
  }

  getMenuCourse() {
    const eachMenuAndCount = parseStringByDash(this.menus);

    const allMenu = eachMenuAndCount.flatMap(([menu, count]) =>
      this.#generateOrderedItems([menu, count])
    );

    return this.#countMenuCourses(allMenu);
  }
}

export default Order;
