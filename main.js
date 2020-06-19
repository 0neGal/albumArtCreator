/* Copyrighted by 0neGuyDev */

document.addEventListener("keyup", (e) => {
	updateText();
})

function updateText() {
	if (notEmpty(bigTitleInput.value)) {
		bigTitle.innerHTML = bigTitleInput.value
	} else {
		bigTitle.innerHTML = "Big Title"
	}
	
	if (notEmpty(subTitleInput.value)) {
		subTitle.innerHTML = subTitleInput.value
	} else {
		subTitle.innerHTML = "Sub Title"
	}
	
	if (notEmpty(subTextInput.value)) {
		subText.innerHTML = subTextInput.value
	} else {
		subText.innerHTML = "Sub Text"
	}
}

function notEmpty(variable) {
	if (variable.replace(/ /g, "") !== "") {
		return true
	} else {
		return false
	}
}