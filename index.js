' use strict';

const fs = require('fs');
const path = require('path');

let commands;

try {
  commands = fs.readFileSync(path.resolve(__dirname, 'commands.txt'), 'utf8');
} catch (error) {
  console.error(`error occured while fetching command file... Error => ${error}`)
  process.exitCode = 1;
}

const commandsList = commands.split('\n');

const availableOperations = {
  CREATE: Symbol.for('CREATE'),
  DELETE: Symbol.for('DELETE'),
  MOVE: Symbol.for('MOVE'),
  LIST: Symbol.for('LIST'),
};

const fileTree = {};

for (let i = 0; i < commandsList.length; i++) {
  const [command, ...args] = commandsList[i].split(' ');

  if (!command || !availableOperations[command]) {
    throw new Error(`command validation failed... command => ${command}`);
  }

  if (command === Symbol.keyFor(availableOperations.CREATE)) {
    for (let j = 0; j < args.length; j++) {
      const path = args[j]
        .split('/')
        .slice(0, j + 1)
        .join('.');

      if (!fileTree[path]) {
        fileTree[path] = {};
      }
    }
  } else if (command === Symbol.keyFor(availableOperations.DELETE)) {
    for (let j = 0; j < args.length; j++) {
      const path = args[j]
        .split('/')
        .slice(0, j + 1)
        .join('.');

      if (fileTree[path]) {
        delete fileTree[path];
      }
    }
  } else if (command === Symbol.keyFor(availableOperations.MOVE)) {
    // console.log(args)
    for (let j = 0; j < args.length; j++) {
      const [originPath, newPath] = args
      console.log(originPath, newPath)

      const originPathList = originPath
        .split('/')
        .slice(0, j + 1)
        .join('.');

      const newPathList = newPath
      .split('/')
      .slice(0, j + 1)
      .join('.');

      if (!fileTree[originPathList]) {
        fileTree[path] = {};
      }

      if (fileTree[newPathList]) {
        delete fileTree[path];
      }
    }
  } else if (command === Symbol.keyFor(availableOperations.LIST)) {
    const listString = '';

    // do a dfs search to create the desired structure and print

  } else {
    throw new Error('something has gone horribly wrong')
  }
}
