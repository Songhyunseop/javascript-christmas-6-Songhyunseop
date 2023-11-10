import Order from '../Model/Order.js';
import InputView from '../View/InputView.js';
import OutputView from '../View/OutputView.js';

class Benefits {
  async show() {
    const reserveDay = await InputView.readDate();
    const oredrMenus = await InputView.readMenu();

    const orderedList = new Order().menuList(oredrMenus);
  }
}

export default Benefits;
