/* Copyrighted by 0neGuyDev */

document.addEventListener("keyup", (e) => {
	updateText();
});

document.addEventListener('touchmove', function (event) {
	if (event.scale !== 1) { event.preventDefault(); }
}, { passive: false });

function updateText() {
	subText.innerHTML = subTextInput.value
	bigTitle.innerHTML = bigTitleInput.value
	subTitle.innerHTML = subTitleInput.value
}

function generate() {
	toggleModal();
}

function toggleModal() {
	modal.toggleAttribute("active");
}

function randomColor() {
	let colors = ["#55efc4", "#81ecec", "#74b9ff", "#a29bfe", "#ffeaa7", "#fab1a0", "#ff7675", "#fd79a8"]
	setVariable("activecolor", colors[Math.floor(Math.random() * colors.length)])
}; randomColor()

function setVariable(variable, value) {
	document.getElementsByTagName('html')[0].style.cssText = `--${variable}: ${value}`;
}