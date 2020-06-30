/* Copyrighted by 0neGuyDev */

var $ = document;
const fs = require('fs');
var console = require("console");
var htmlToImg = require("save-html-as-image");

$.addEventListener("keyup", (e) => {
	updateText();
	if (e.key === "Backspace") {
		if ($.activeElement.tagName === "INPUT") {
			if ($.activeElement.value === "") {
				$.activeElement.style.left = "-2px";
				setTimeout(() => {
					$.activeElement.style.left = "0px";
				}, 100)
			}
		}
	}
});

$.addEventListener("touchmove", (event) => {
	if (event.scale !== 1) {event.preventDefault();}
}, { passive: false });

function updateText() {
	subText.innerHTML = subTextInput.value;
	bigTitle.innerHTML = bigTitleInput.value;
	subTitle.innerHTML = subTitleInput.value;
}

function findBackgrounds() {
	files = new Array;
	fs.readdirSync("./src/backgrounds/").forEach((file) => {
		if (file.indexOf(".png") !== -1) {
			files.push(file)
		}
	})
	
	backgrounds.innerHTML = "";
	for (let i = 0; i < files.length; i++) {
		backgrounds.innerHTML += `<div onclick="setAlbum('backgrounds/${files[i]}')" class="image" class="image" style="background-image:url(backgrounds/${files[i]})"></div>`;
	}
}; findBackgrounds()

function generate(node) {
	generating = true;
	htmlToImg.saveAsPng(art, {forceFixText: true, filename: getFileName(), printDate: false})
}

function getFileName() {
	let name = "";
	let bigT = false;
	if (bigTitleInput.value.replace(/ /g, "") !== "") {
		bigT = true;
		name = bigTitleInput.value;
	}
	
	if (subTitleInput.value.replace(/ /g, "") !== "") {
		if (bigT) {
			name += " - ";
		}
		name += subTitleInput.value;
	}
	
	if (name === "") {
		if (subTextInput.value.replace(/ /g, "") !== "") {
			name += subTextInput.value;
		} else {
			name = "Artwork";
		}
	}
	
	return name;
}

function toggleModal() {
	modal.toggleAttribute("active");
}

function randomColor() {
	let colors = ["#55efc4", "#81ecec", "#74b9ff", "#a29bfe", "#ffeaa7", "#fab1a0", "#ff7675", "#fd79a8"];
	setVariable("activecolor", colors[Math.floor(Math.random() * colors.length)]);
}; randomColor();

function setVariable(variable, value) {
	$.getElementsByTagName('html')[0].style.cssText = `--${variable}: ${value}`;
}

function setAlbum(url) {
	artShadow.style.opacity = "0.0";
	artDiv.style.transform = "scale(1.03)";
	art.style.backgroundImage = `url(${url})`;
	artShadow.style.filter = "blur(calc(var(--shadowamount - 1px)";
	setTimeout(() => {
		artShadow.style.opacity = "1.0";
		setVariable("artbg", `url("${url}")`);
		artDiv.style.transform = "scale(1.0)";
		artShadow.style.filter = "blur(var(--shadowamount)";
	}, 300);
}

function setVariable(variable, value) {
	$.getElementsByTagName('html')[0].style.cssText = `--${variable}: ${value}`;
}