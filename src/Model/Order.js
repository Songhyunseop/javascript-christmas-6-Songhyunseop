import MENU from '../Constant/Menu.js';

class Order {
  constructor(menus) {
    this.menus = menus;
  }

  // 입력된 주문 메뉴를 형식에 맞춰 반환
  menuList() {
    const eachMenuAndCount = this.menus.split(',').map((el) => el.split('-'));
    const result = eachMenuAndCount
      .map((el) => `${el[0]} ${el[1]}개`)
      .join('\n');

    return result;
  }

  // 입력된 주문메뉴의 총합 금액 반환
  totalAmount() {
    const eachMenuAndCount = this.menus.split(',').map((el) => el.split('-'));

    const result = eachMenuAndCount.reduce(
      (total, menuItem) => total + this.#calculateTotalMenuAmount(menuItem),
      0
    );

    return result;
  }

  #calculateTotalMenuAmount(menuItem) {
    const [menu, orderCount] = menuItem;
    const price = MENU.LIST[menu];

    return price * Number(orderCount);
  }

  // 입력된 각 메뉴의 코스타입 반환
  courseType() {
    const eachMenuAndCount = this.menus.split(',').map((el) => el.split('-'));
    const allMenu = eachMenuAndCount.flatMap(([menu, count]) =>
      this.#generateOrderedItems([menu, count])
    );
    return this.#countMenuCourses(allMenu);
  }

  #generateOrderedItems(menuAndCount) {
    const [menu, count] = menuAndCount;
    const result = Array.from({ length: Number(count) }).map((_) => menu);

    return result;
  }

  #countMenuCourses(allMenu) {
    const countResult = { ...MENU.COURSES_COUNT };

    // eslint-disable-next-line array-callback-return
    allMenu.map((menu) => {
      const course = this.#findCourseType(menu);
      countResult[course] += 1;
    });

    return countResult;
  }

  #findCourseType(menuName) {
    const found = MENU.CATEGORIES.find((category) =>
      category.list.includes(menuName)
    );

    return found.name;
  }
}

export default Order;
