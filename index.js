import { createReadStream, createWriteStream } from 'node:fs';
import { readdir } from 'node:fs/promises';
import sharp from 'sharp';

// ! Задание 1
const textToBuffer = (text, encoding) => Buffer.from(text, encoding);

const bufferToText = (buffer, encoding) => buffer.toString(encoding);

const text = 'Привет, мир!';
const utf8Buffer = textToBuffer(text, 'utf8');
console.log(utf8Buffer);

const decoderText = bufferToText(utf8Buffer, 'utf8');
console.log('decoderText: ', decoderText);

// ! Задание 2
const catalog = async (from, to) => {
  try {
    const wStream = createWriteStream(to);
    const files = await readdir(from, { withFileTypes: true });

    for (const { name } of files) {
      if (name.includes('.txt')) {
        const newFile = `${from}/${name}`;
        const rStream = createReadStream(newFile);

        wStream.write(`[${name.replace('.txt', '')}]\n`);

        await new Promise((resolve, reject) => {
          rStream.pipe(wStream, { end: false });

          rStream.on('end', () => {
            wStream.write('\n');
            resolve();
          });

          rStream.on('error', err => {
            console.error(err);
            reject();
          });
        });
      }
    }
    wStream.end();
    console.log('Завершено');
  } catch (err) {
    console.error(`Ошибка: ${err.message}`);
  }
};

catalog('./test', './newTest.txt');

// ! Задание 3

const resizeImage = (inputPath, outputPath) => {
  sharp(inputPath)
    .resize(400, 400)
    .toFormat('jpeg')
    .toFile(outputPath, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Размер изменен успешно', info);
      }
    });
};

const filterImage = (inputPath, outputPath) => {
  sharp(inputPath)
    .greyscale()
    .blur(3)
    .toFile(outputPath, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Изображение отредактировано', info);
      }
    });
};

resizeImage('./test/kinopoisk.jpg', './newKinopoisk.jpg');
filterImage('./test/kinopoisk.jpg', './filterKinopoisk.jpg');
