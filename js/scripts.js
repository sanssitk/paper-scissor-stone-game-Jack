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

generateCat = () => {
  var image = document.createElement("img");
  image.src =
    "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  document.getElementById("cats").appendChild(image);
};
