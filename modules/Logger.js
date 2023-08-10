import { EventEmitter } from 'node:events';
import { writeFile, stat, readFile, access } from 'node:fs/promises';

export class Logger extends EventEmitter {
  constructor(filename, maxSize) {
    super();
    this.filename = filename;
    this.maxSize = maxSize;
    this.logQueue = [];
    this.writing = false;
  }

  async checkLogFile(filename) {
    try {
      await access(filename);
    } catch (err) {
      console.log(`Создали лог файл ${filename}: `, err);
      await writeFile(filename, '');
    }
  }

  log(message) {
    this.logQueue.push(message);

    if (!this.writing) {
      this.writeLog();
    }
  }

  async writeLog() {
    if (this.logQueue.length === 0) {
      this.writing = false;
      return;
    }

    this.writing = true;
    // eslint-disable-next-line max-len
    const message = `${new Date().toLocaleString()} - ${this.logQueue.shift()}\n`;

    try {
      await this.checkLogFile(this.filename);

      const fileContent = await readFile(this.filename, 'utf8');
      const updateContent = message + fileContent;

      await writeFile(this.filename, updateContent);

      this.emit('messageLogged', message);

      const fileSize = await this.getFileSize();
      if (fileSize > this.maxSize) {
        await this.rotateLog();
      }

      if (this.logQueue.length > 0) {
        this.writeLog();
      }

      this.writing = false;
    } catch (err) {
      console.error(err);
    }
  }

  async getFileSize() {
    try {
      const stats = await stat(this.filename);
      return stats.size;
    } catch (err) {
      console.error(err);
      return 0;
    }
  }

  async rotateLog() {
    try {
      await this.checkLogFile(`${this.filename}.bak`);

      let fileSize = await this.getFileSize();

      while (fileSize > this.maxSize) {
        const content = await readFile(this.filename, 'utf8');
        const lines = content.trim().split('\n');

        if (lines.length === 0) {
          break;
        }

        const lastLine = lines.pop();
        await writeFile(this.filename, lines.join('\n'));

        const bakContent = await readFile(`${this.filename}.bak`, 'utf8');
        const updateBakContent = lastLine + '\n' + bakContent;

        await writeFile(`${this.filename}.bak`, updateBakContent);

        fileSize = await this.getFileSize();
      }
    } catch (err) {
      console.error(err);
    }
  }
}
