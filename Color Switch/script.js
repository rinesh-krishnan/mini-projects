const buttons = document.querySelectorAll(".buttons");
const body = document.querySelector("body");

let currentColor = null;

buttons.forEach(function (btns) {
	btns.addEventListener("click", (colour) => {
		if (currentColor === colour.target.id) {
			body.style.background = "#212121";
			currentColor = null;
		} else {
			body.style.background = colour.target.id;
			currentColor = colour.target.id;
		}
	});
});