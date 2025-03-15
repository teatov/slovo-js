import readline from 'node:readline';
import slovo from '../src';
import { CASE } from '../src/inflect';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function input() {
  rl.question('> ', function (answer) {
    const [lemma, ...index] = answer.split(' ');
    const word = slovo(lemma as string, index.join(' '));
    if (word) {
      console.log('\tsg\tspl');
      CASE.forEach((inflectionCase) => {
        console.log(
          inflectionCase +
            '\t' +
            word.inflect({ case: inflectionCase, number: 'sg' }) +
            '\t' +
            word.inflect({ case: inflectionCase, number: 'pl' }),
        );
      });
    }
    input();
  });
}

input();
