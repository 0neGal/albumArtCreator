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
	
	files.sort(() => Math.random() - 0.5); // A pseudo random way of randomizing an array.
	// It doesn't actually have the same amount of chance for it to randomize in a certain way
	// But it's good enough.
	backgrounds.innerHTML = "";
	for (let i = 0; i < files.length; i++) {
		backgrounds.innerHTML += `<div onclick="setAlbum('backgrounds/${files[i]}')" class="image" class="image" style="background-image:url(backgrounds/${files[i]})"></div>`;
	}
	setAlbum("backgrounds/" + files[0])
}; findBackgrounds()

async function generate() {
	fading(false);
	
	setTimeout(async () => {
		drag.style.zIndex = "10";
		generating.style.opacity = "1.0";
		generating.style.transform = "scale(1.0)";
		
		await htmlToImg.saveAsPng(art, {forceFixText: true, filename: getFileName(), printDate: false})
		
		drag.style.zIndex = "-1";
		generating.style.opacity = "0.0";
		generating.style.transform = "scale(0.9)";
		
		setTimeout(() => {fading(true)}, 500);
	}, 1300);
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

function fading(transition) {
	let scale = 0.9;
	let timeout = 100;
	let opacity = 0.0;
	let delay = (evaluation) => {
		setTimeout(() => {
			eval(evaluation);
		}, timeout)
		timeout += 100;
	}
	
	let fade = () => {
		delay(`artShadow.style.opacity = '${opacity}'`)
		delay(`artDiv.style.opacity = '${opacity}';artDiv.style.transform = 'scale(${scale})'`)
		for (let i = 0; i < $.querySelectorAll(".box").length; i++) {
			delay(`$.querySelectorAll('.box')[${i}].style.opacity = '${opacity}';$.querySelectorAll('.box')[${i}].style.transform = 'scale(${scale})'`)
		}
		for (let i = 0; i < $.querySelectorAll(".input").length; i++) {
			delay(`$.querySelectorAll('.input')[${i}].style.opacity = '${opacity}';$.querySelectorAll('.input')[${i}].style.transform = 'scale(${scale})'`)
		}
		for (let i = 0; i < $.querySelectorAll(".button").length; i++) {
			delay(`$.querySelectorAll('.button')[${i}].style.opacity = '${opacity}';$.querySelectorAll('.button')[${i}].style.transform = 'scale(${scale})'`)
		}
	}
	
	if (transition) {
		scrollTo(0,0);
		opacity = "1.0";
		scale = "1.0";
	}
	
	fade()
}