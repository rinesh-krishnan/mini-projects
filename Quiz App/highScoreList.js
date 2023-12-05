let highScoreList = document.querySelector("ol");
console.log(highScoreList);
const highScore = JSON.parse(localStorage.getItem("highScores"));
console.log(highScore);

highScoreList.innerHTML =
	highScore.map((score) => {
		return `<li class="list">${score.name} : ${score.score}</li>`
	}).join(" ");