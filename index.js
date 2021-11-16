const spawnCommand = require('spawn-command');

const args = process.argv.slice(2).join(" ");

const child = spawnCommand(args);

child.on('exit', () => {
  process.exit();
});

child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);

process.stdin.on('data', () => {});
process.stdin.once('close', () => {
    child.kill();
});