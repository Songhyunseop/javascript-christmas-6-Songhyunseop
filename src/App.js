import Benefits from './Controller/Benefits.js';

class App {
  async run() {
    await new Benefits().show();
  }
}

export default App;
