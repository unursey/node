import { EventEmitter } from 'node:events';

// Таймер
class Timer extends EventEmitter {
  constructor({ name }) {
    super();
    this.name = name;
  }

  start(ms) {
    let tickCount = 1;

    this.timerInterval = setInterval(() => {
      this.emit('tick', tickCount);
      tickCount++;
    }, 1000);

    setTimeout(() => {
      clearInterval(this.timerInterval);
      this.emit('boom');
    }, ms);
  }

  emit(name, ...args) {
    super.emit(name, ...args);
    console.log('logger', name, ...args);
  }
}

const user = new Timer({ name: 'Timer' });

user.on('tick', tickCount => {
  console.log(`Tick ${tickCount}`);
});

user.on('boom', () => {
  console.log('BOOM');
});

user.start(5000);

// Чат
class Messenger extends EventEmitter {
  constructor({ name }) {
    super();
    this.name = name;
  }

  sendMessage(username, message) {
    this.emit('message', { username, message });
  }

  receiveMessage() {
    this.on('message', ({ username, message }) => {
      console.log(`${username}: ${message}`);
    });
  }

  emit(name, ...args) {
    super.emit(name, ...args);
    console.log('logger', name, ...args);
  }
}

const messenger = new Messenger({ name: 'Messenger' });

messenger.receiveMessage();
messenger.sendMessage('Марк', 'Выключи утюг');
messenger.sendMessage('Алиса', 'Я его не включала');
