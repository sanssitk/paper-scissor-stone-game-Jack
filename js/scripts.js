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
let blackjackGame = {
  you: {
    scoreSpan: "#your-blackjack-result",
    div: "#your-box",
    score: 0,
  },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
  cards: [2, 3, 4, 5, 6, 7, 8, 9, 10, "K", "Q", "J", "A"],
  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    K: 10,
    Q: 10,
    J: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  draw: 0,
  isStand: false,
  turnsOver: false,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const hitSound = new Audio("sounds/swish.m4a");
const lossSound = new Audio("sounds/aww.mp3");
const winSound = new Audio("sounds/cash.mp3");

randomCard = () => {
  let randomCardIndex = Math.floor(Math.random() * 13);
  return blackjackGame.cards[randomCardIndex];
};

blackjackHit = () => {
  if (blackjackGame.isStand === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
};

// Async function for dealer automation
sleep = (ms) => {
  return new Promise((res) => setTimeout(res, ms));
};

async function blackjackStand() {
  blackjackGame.isStand = true;
  while (DEALER.score < 16 && blackjackGame.isStand === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(500);
  }
  blackjackGame.turnsOver = true;
  let winner = computeWinner();
  showResult(winner);
}

showScore = (activePlayer) => {
  if (activePlayer.score > 21) {
    document.querySelector(activePlayer.scoreSpan).textContent = "BUST";
    document.querySelector(activePlayer.scoreSpan).style.color = "red";
  } else {
    document.querySelector(activePlayer.scoreSpan).textContent =
      activePlayer.score;
  }
};

showCard = (card, activePlayer) => {
  if (activePlayer.score <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
};

updateScore = (card, activePlayer) => {
  //with Ace: If adding 11 keeps me below 21 add 11. Otherwise add 1
  if (card == "A") {
    if (activePlayer.score + blackjackGame.cardsMap[card][1] <= 21) {
      activePlayer.score += blackjackGame.cardsMap[card][1];
    } else {
      activePlayer.score += blackjackGame.cardsMap[card][0];
    }
  } else {
    activePlayer.score += blackjackGame.cardsMap[card];
  }
};

blackjackDeal = () => {
  if (blackjackGame.turnsOver === true) {
    blackjackGame.isStand = false;
    let yourImages = document
      .querySelector(".flex-blackjack-row-1")
      .querySelectorAll("img");
    for (yourImage of yourImages) {
      yourImage.remove();
    }
    YOU.score = 0;
    DEALER.score = 0;
    document.querySelector(YOU.scoreSpan).style.color = "white";
    document.querySelector(YOU.scoreSpan).textContent = YOU.score;
    document.querySelector(DEALER.scoreSpan).style.color = "white";
    document.querySelector(DEALER.scoreSpan).textContent = DEALER.score;
    document.querySelector("#blackjack-result").textContent = "Let's Play";
    document.querySelector("#blackjack-result").style.color = "black";
    blackjackGame.turnsOver = false;
  }
};

// compute winner and return who won
// update wins, losses and draws
computeWinner = () => {
  let winner;
  if (YOU.score <= 21) {
    // conditions: higher score than dealer or when dealer busts but you're not
    if (YOU.score > DEALER.score || DEALER.score > 21) {
      winner = YOU;
      blackjackGame.wins++;
    } else if (YOU.score < DEALER.score) {
      winner = DEALER;
      blackjackGame.losses++;
    } else if (YOU.score === DEALER.score) {
      winner = "You Drew!";
      blackjackGame.draw++;
    }
  }
  // conditions: when user bust but dealer doesn't:
  else if (YOU.score > 21 && DEALER.score <= 21) {
    winner = DEALER;
    blackjackGame.losses++;
  }
  // conditions: when user and dealer bust:
  else if (YOU.score > 21 && DEALER.score > 21) {
    winner = "You Drew!";
    blackjackGame.draw++;
  }
  return winner;
};

showResult = (winner) => {
  let message, messageColor;

  if (blackjackGame.turnsOver === true) {
    if (winner === YOU) {
      message = "You Won!";
      messageColor = "green";
      document.getElementById("wins").textContent = blackjackGame.wins;
      winSound.play();
    } else if (winner === DEALER) {
      message = "You Lost!";
      messageColor = "red";
      document.getElementById("losses").textContent = blackjackGame.losses;
      lossSound.play();
    } else {
      message = "You Drew!";
      messageColor = "black";
      document.getElementById("draw").textContent = blackjackGame.draw;
    }

    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
  }
};
