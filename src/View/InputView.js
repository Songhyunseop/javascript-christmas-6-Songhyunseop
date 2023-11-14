import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../Constant/Message';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(MESSAGE.RESERVAE_DATE);

    return input;
  },

  async readMenu() {
    const input = await Console.readLineAsync(MESSAGE.ORDER_MENU);

    return input;
  },
};

export default InputView;
