/* Copyrighted by 0neGuyDev */

var $ = document;
var console = require("console");
var htmlToImage = require('html-to-image');
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

$.getElementById("darkener").addEventListener("click", () => {toggleModal();})
$.getElementById("generate").addEventListener("click", () => {htmlToImg.saveAsPng(art, {forceFixText: true})})
$.getElementById("closeModal").addEventListener("click", () => {toggleModal();})

function updateText() {
	subText.innerHTML = subTextInput.value;
	bigTitle.innerHTML = bigTitleInput.value;
	subTitle.innerHTML = subTitleInput.value;
}

var backgrounds = 11;

function findBackgrounds() {
	for (let i = 1; i < backgrounds; i++) {
		$.getElementById("backgrounds").innerHTML += `<div onclick="setAlbum('backgrounds/${i}.png')" class="image" class="image" style="background-image:url(backgrounds/${i}.png)"></div>`;
	}
}; findBackgrounds()

function setAlbum(url) {
	let cache = new Image().src = url // Pre-load the image
	// I'm trying to force the CSS to re-render
	// Sometimes these do make it work better
	// Depends on the browser and it's version
	// For some reason CSS is pretty bad :p
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

function generate(node) {
	generating = true;
	htmlToImage.toCanvas($.getElementById(node)).then((canvas) => {
		$.body.appendChild(canvas);
		generating = false;
		toggleModal();
	});
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
	let cache = new Image().src = url // Pre-load the image
	// I'm trying to force the CSS to re-render
	// Sometimes these do make it work better
	// Depends on the browser and it's version
	// For some reason CSS is pretty bad :p
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