import { copyFolder } from './modules/copyFolder.js';
import { Logger } from './modules/Logger.js';
import { LoggerTwo } from './modules/LoggerTwo.js';

const app3 = async () => {
  try {
    await copyFolder('./testFolder', './newTestFolder', err => {
      if (err) {
        console.error('Ошибка копирования:', err);
      } else {
        console.log('Копирование завершено');
      }
    });
  } catch (error) {
    console.error('Ошибка:', error);
  }
};

//app3();

const logger = new Logger('log.txt', 1024);

logger.on('messageLogged', message => {
  console.log('Записано сообщение:', message);
});

logger.log('Первое сообщение');
logger.log('Второе сообщение');
logger.log('Третье сообщение');
logger.log('Четвертое сообщение');
logger.log('Пятое сообщение');
logger.log('Шестое сообщение');
logger.log('Седьмое сообщение');
logger.log('Восьмое сообщение');
logger.log('Девятое сообщение');



// const loggerTwo = new LoggerTwo('logTwo.txt', 1024);

// loggerTwo.on('messageLogged', message => {
//   console.log('Записано сообщение:', message);
// });

// loggerTwo.log('Первое сообщение');
// loggerTwo.log('Второе сообщение');
// loggerTwo.log('Третье сообщение');
// loggerTwo.log('Четвертое сообщение');
// loggerTwo.log('Пятое сообщение');
// loggerTwo.log('Шестое сообщение');
// loggerTwo.log('Седьмое сообщение');
// loggerTwo.log('Восьмое сообщение');
