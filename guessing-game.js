const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let secretNumber = 0;
let numAttempts = 0;

function randomInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkGuess(number) {
  if (number > secretNumber) {
    console.log("Too high.");
    return false;
  } else if (number < secretNumber) {
    console.log("Too low");
    return false;
  } else {
    console.log("Correct!");
    return true;
  }
}

function askGuess() {
  numAttempts--;
  rl.question("Enter a guess: ", (answer) => {
    let guess = Number(answer);
    let check = checkGuess(guess);

    if (numAttempts === 0 && check === false) {
      console.log("You Lose");
      return;
    }
    
    if (check === false) {
      return askGuess();
    } else {
      console.log("You win");
    }

    rl.close();
  });
}

function askRange() {
  rl.question("Enter a min number: ", (min) => {
    rl.question("Enter a max number: ", (max) => {
      console.log(`I'm thinking of a number between ${min} and ${max}..`);
      let minNum = Number(min);
      let maxNum = Number(max);
      secretNumber = randomInRange(minNum, maxNum);
      return askGuess();
    });
  });
}

function askLimit() {
  rl.question("Enter a attempts: ", (attempts) => {
    let limitNum = Number(attempts);
    numAttempts = limitNum;
    return askRange();
  });
}

askLimit();
// function handleResponseOne(firstAnswer) {
//   console.log(firstAnswer + " is up.");
//   rl.question("Enter a min number ", handleResponseTwo);
// }

// function handleResponseTwo(secondAnswer) {
//   console.log(secondAnswer + " is down.");
//   rl.question("Enter a guess: ", handleResponseThree);
// }

// function handleResponseThree(thirdAnswer) {
//   console.log(thirdAnswer + " is left.");
//   rl.close();
// }
