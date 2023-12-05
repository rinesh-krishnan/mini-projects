//-------------Selectors--------------------
let quest = document.getElementById("quest");
let qCounter = document.getElementById("qcount");
let sCounter = document.getElementById("scount");
let hidden = document.querySelector(".hidden");
let divi = document.querySelector(".container")
let options = Array.from(document.getElementsByClassName("option"));

let currentQuestion = {}
let scoreCounter = 0
let choosingOption = false
let questionCounter = 0
let data = []
let quizData = []
let randomQuiz

//-------------Counters--------------------
const addPoint = 10
const maxQuestions = 6


//-------------Fetching Data--------------------
divi.classList.add("hidden");
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
	.then((res) => {
		return res.json();
	})

	.then((resdata) => {
		data = resdata.results.map((loadedQuestions) => {
			const quizQuestion = {
				question: loadedQuestions.question,
			}

			quizQuestion.answer = Math.floor(Math.random() * 3) + 1;

			const answerOptions = [...loadedQuestions.incorrect_answers];
			answerOptions.splice(quizQuestion.answer - 1, 0, loadedQuestions.correct_answer);
			answerOptions.forEach((option, index) => {
				quizQuestion["option" + (index + 1)] = option;
			})
			return quizQuestion;
		});
		setTimeout(() => {
			divi.classList.remove("hidden");
			startQuiz();
		}, 1000);
	})

	.catch((err) => {
		console.error(err)
	});

//-------------Functions--------------------
let startQuiz = () => {
	scoreCounter = 0;
	questionCounter = 1;
	quizData = [...data];
	getQuestion();
}


let getQuestion = () => {
	let randomIndex = Math.floor(Math.random() * quizData.length)
	randomQuiz = quizData[randomIndex];


	if (questionCounter >= maxQuestions || quizData.length === 0) {
		localStorage.setItem("scoreTotal", scoreCounter);
		return window.location.assign("./score.html")
	}

	questionCounter++;
	quest.innerHTML = randomQuiz.question;
	options.forEach((option) => {
		const number = option.dataset["number"];
		option.innerHTML = randomQuiz["option" + number]
	})

	quizData.splice(randomIndex, 1)
	choosingOption = true
}


function boardUpdates(update) {
	qCounter.innerText = `${questionCounter}/5`;
	if (update == "correct") { scoreCounter += addPoint }
	sCounter.innerText = `${scoreCounter}/50`
}


options.forEach((option) => {
	option.addEventListener("click", (e) => {
		if (!choosingOption) return

		choosingOption = false
		const selectedOption = e.target
		const selectedAnswer = selectedOption.dataset["number"];
		const validate = selectedAnswer == randomQuiz.answer ? "correct" : "incorrect";

		selectedOption.classList.add(validate);
		selectedOption.classList.remove("paraHover");

		setTimeout(() => {
			selectedOption.classList.remove(validate);
			selectedOption.classList.add("paraHover");
			boardUpdates(validate);
			getQuestion();
		}, 1000);
	})
})