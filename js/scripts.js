// Challenge 1: Your age in days
clickMe = () => {
  var year = new Date().getFullYear();
  const birthYear = prompt("What is your year of Birth?");
  const AgeInDays = (year - birthYear) * 365;
  document.getElementById(
    "age-in-days"
  ).innerText = `You are ${AgeInDays} Days old`;
};

reset = () => {
  document.getElementById("age-in-days").innerText = "";
  document.getElementById("cats").innerHTML = "";
};

// Challenge 2: Generating Cat
generateCat = () => {
  var image = document.createElement("img");
  image.src =
    "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  document.getElementById("cats").appendChild(image);
};

// Challenge 3: Rock, Paper & Scissors
rpsGame = (yourChoice) => {
  let humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randToRpsInt());
  result = decideWinner(humanChoice, botChoice);
  message = finalMessage(result);
  rpsFrontEnd(yourChoice.id, botChoice, message);
};

randToRpsInt = () => {
  return Math.floor(Math.random() * 3);
};

numberToChoice = (number) => {
  return ["rock", "paper", "scissors"][number];
};

decideWinner = (yourChoice, computerChoice) => {
  var rpsDatabase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    scissors: { scissors: 0.5, rock: 0, paper: 1 },
    paper: { scissors: 0, rock: 1, paper: 0.5 },
  };
  let yourScore = rpsDatabase[yourChoice][computerChoice];
  let computerScore = rpsDatabase[computerChoice][yourChoice];
  return [yourScore, computerScore];
};

finalMessage = ([yourScore, computerScore]) => {
  if (yourScore === 0) {
    return { message: "Your Lost!", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "You Tied!", color: "yellow" };
  } else {
    return { message: "You Won!", color: "green" };
  }
};

rpsFrontEnd = (humanImagechoice, botImageChoice, finalMessage) => {
  let imagesDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };
  // removing all images tags
  document.getElementById("flex-box-rps-div").innerHTML = "";

  // creating div on accordingly
  let humanDiv = document.createElement("div");
  let botDiv = document.createElement("div");
  let messageDiv = document.createElement("div");

  humanDiv.innerHTML = `<img src="${imagesDatabase[humanImagechoice]}" height="150" width="150"/>`;
  document.getElementById("flex-box-rps-div").append(humanDiv);

  messageDiv.innerHTML = `<h1 style= "color:${finalMessage.color}"}>${finalMessage.message}</h1>`;
  document.getElementById("flex-box-rps-div").append(messageDiv);

  botDiv.innerHTML = `<img src="${imagesDatabase[botImageChoice]}" height="150" width="150"/>`;
  document.getElementById("flex-box-rps-div").append(botDiv);
};

// Challenge : 4 --- Change the colors of buttons
let all_buttons = document.getElementsByTagName("button");

let copyAllButtons = [];
for (button of all_buttons) {
  copyAllButtons.push(button.classList[1]);
}
console.log(copyAllButtons);
buttonChangeColor = (buttonThingy) => {
  if (buttonThingy.value === "red") {
    buttonsRed();
  } else if (buttonThingy.value === "green") {
    buttonsGreen();
  } else if (buttonThingy.value === "reset") {
    buttonColorReset();
  } else {
    randomColors();
  }
};

buttonsRed = () => {
  for (allbotton of all_buttons) {
    allbotton.classList.remove(allbotton.classList[1]);
    allbotton.classList.add("btn-danger");
  }
};
buttonsGreen = () => {
  for (allbotton of all_buttons) {
    allbotton.classList.remove(allbotton.classList[1]);
    allbotton.classList.add("btn-success");
  }
};
buttonColorReset = () => {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
};

randomColors = () => {
  let choices = ["btn-primary", "btn-danger", "btn-success", "btn-warning"];

  for (allbutton of all_buttons) {
    let randomNumber = Math.floor(Math.random() * 4);
    allbutton.classList.remove(allbutton.classList[1]);
    allbutton.classList.add(choices[randomNumber]);
  }
};

// Challenge: 5 BlackJack