import { readFile } from 'fs';
import { ILga } from 'src/Types/ILga';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const lga = require('./states.json');

readFile('./states.json', 'utf8', (err, contents) => {
  if (err) {
    console.log(err);
    return;
  }
  const json = JSON.parse(contents) as ILga[];

  console.log(json[0]);
});
