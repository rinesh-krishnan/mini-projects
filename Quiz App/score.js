let username = document.querySelector(".username");
let saveScoreBtn = document.querySelector(".save");
let displayFinalScore = document.querySelector(".finalScore");

let scoreTotal = localStorage.getItem("scoreTotal");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const max_scores = 5;

displayFinalScore.innerText = scoreTotal;

username.addEventListener("keyup", () => {
	saveScoreBtn.disabled = !username.value;
})

saveYourScore = (event) => {	
	event.preventDefault();

	const score = {
		name: username.value,
		score: scoreTotal
	}

	highScores.push(score);
	highScores.sort((a, b) => {
		return b.score - a.score
	});
	highScores.splice(5);

	localStorage.setItem("highScores", JSON.stringify(highScores));
	
};
