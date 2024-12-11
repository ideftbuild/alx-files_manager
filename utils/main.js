#!/usr/bin/node
import dbClient from './db.js';

const waitConnection = () => {
  return new Promise((resolve, reject) => {
    let i = 0;
    const repeatFct = async () => {
      setTimeout(() => {
        i += 1;
        if (i >= 10) {
          reject();
        } else if (!dbClient.isAlive()) {
          repeatFct().then(null).catch(null);
        } else {
          resolve();
        }
      }, 1000);
    };
    repeatFct().then(null).catch();
  });
};

(async () => {
  console.log(dbClient.isAlive());
  await waitConnection();
  // console.log(dbClient.isAlive());
  // console.log(await dbClient.nbUsers());
  // console.log(await dbClient.nbFiles());
})();
