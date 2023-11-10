import MENU from '../Menu';

class Order {
  #total;

  constructor() {
    this.#total = 0;
  }

  menuList(menus) {
    const eachMenu = menus.split(',').map((el) => el.split('-'));
    const result = eachMenu.map((el) => `${el[0]} ${el[1]}개`).join('\n');

    return result;
  }

  calculateMenuAmount(menuItem) {
    const [menu, orderCount] = menuItem;
    const price = MENU.LIST[menu];

    return price * Number(orderCount);
  }

  totalAmount(menus) {
    const eachMenu = menus.split(',').map((el) => el.split('-'));

    const result = eachMenu.reduce((total, menuItem) => {
      const amount = this.calculateMenuAmount(menuItem);
      return total + amount;
    }, 0);

    return result;
  }
}

export default Order;
