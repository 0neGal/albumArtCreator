/* Copyrighted by 0neGuyDev */

document.addEventListener("keyup", (e) => {
	updateText();
})

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