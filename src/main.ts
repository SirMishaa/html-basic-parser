import * as fs from 'fs';
import path from 'path';
import readline, { Interface } from 'readline';
import events from 'node:events';
import { Lexer } from './Lexer.js';

const ROOT_PATH = process.cwd();

const readerInterface: Interface = readline.createInterface({
  input: fs.createReadStream(path.join(ROOT_PATH, 'build/src/index.html')),
  /* \r\n as new line */
  crlfDelay: Infinity,
});

readerInterface.on('line', (line) => {
  const lexer = new Lexer(line);
  const tokens = lexer.parse();
  tokens.forEach((token) => {
    console.log(token.type);
  });
});

await events.once(readerInterface, 'close');
const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`Script memory usage of ${Math.round(memoryUsage * 100) / 100} MB`);
