// deno-fmt-ignore-file
// deno-lint-ignore-file

// Copyright Joyent and Node contributors. All rights reserved. MIT license.
// Taken from Node 23.9.0
// This file is automatically generated by `tests/node_compat/runner/setup.ts`. Do not modify this file manually.

'use strict';
require('../common');
const assert = require('assert');
const { spawnSync } = require('child_process');
const { Worker } = require('worker_threads');

// Test that 'exit' events for Workers are not received when the main thread
// terminates itself through process.exit().

if (process.argv[2] !== 'child') {
  const {
    stdout, stderr, status
  } = spawnSync(process.execPath, [__filename, 'child'], { encoding: 'utf8' });
  assert.strictEqual(stderr, '');
  assert.strictEqual(stdout, '');
  assert.strictEqual(status, 0);
} else {
  const nestedWorker = new Worker('setInterval(() => {}, 100)', { eval: true });
  // This console.log() should never fire.
  nestedWorker.on('exit', () => console.log('exit event received'));
  nestedWorker.on('online', () => process.exit());
}
