import Promotion from './Controller/Benefits.js';

class App {
  async run() {
    await new Promotion().show();
  }
}

export default App;
