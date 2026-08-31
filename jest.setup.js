import '@testing-library/jest-dom';

class Worker {
    constructor() {
      this.onmessage = () => {};
    }
  
    postMessage(data) {
      this.onmessage({ data: Math.pow(data.data, 2) });
    }
  }

window.Worker = Worker;
  