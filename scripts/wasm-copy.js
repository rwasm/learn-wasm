#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

(function wasmCopy() {
  const baseDir = path.resolve(__dirname, `../dist/_assets`);
  const wasmFile = path.resolve(__dirname, `../rust-crate/pkg/rust_crate_bg.wasm`);
  let distWasmFile = '';
  try {
    const files = fs.readdirSync(baseDir);
    files.some(i => {
      if (/^index.*.js$/.test(i)) {
        distWasmFile = i.split('.js')[0] + '_bg.wasm';
        return;
      }
    })
  } catch (err) {
    console.error(err);
  }
  fs.copyFile(wasmFile, `${baseDir}/${distWasmFile}`, (err) => {
    if (err) return console.error(err);
    console.log(chalk.grey('[copy]'), chalk.green(`wasm file copied successfully!\n`));
  });
})();