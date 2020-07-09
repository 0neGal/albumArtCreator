/* Copyrighted by 0neGuyDev */

var $ = document;
const fs = require('fs');
var console = require("console");
var htmlToImg = require("save-html-as-image");
const { dialog } = require("electron").remote;

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
		backgrounds.innerHTML += `<div onclick="setAlbum('backgrounds/${files[i]}')" class="image" class="image" style="background-image:url(backgrounds/${files[i]}) !important"></div>`;
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
	art.style.filter = "";
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

const templates = [
	{
		title: "Jazz",
		subtitle: randomSubTitle(),
		subtext: "new orleans style"
	},
	{
		title: "Opera",
		subtitle: randomSubTitle(),
		subtext: "the genre not the singer"
	},
	{
		title: "Rock/Metal",
		subtitle: randomSubTitle(),
		subtext: ""
	},
	{
		title: "Minecraft",
		subtitle: "Soundtrack",
		subtext: ""
	},
	{
		title: "Video Game",
		subtitle: "Soundtracks",
		subtext: ""
	},
	{
		title: "Favorites",
		subtitle: randomSubTitle(),
		subtext: "all the good stuff"
	},
	{
		title: "Lofi",
		subtitle: randomSubTitle(),
		subtext: "very chill and good vibes"
	},
	{
		title: "Epic Music",
		subtitle: randomSubTitle(),
		subtext: "what they use in the trailers!"
	},
	{
		title: "Opera",
		subtitle: randomSubTitle(),
		subtext: "the genre not the singer"
	},
	{
		title: "Old Music",
		subtitle: randomSubTitle(),
		subtext: "the old is new"
	},
	{
		title: "70-80s",
		subtitle: randomSubTitle(),
		subtext: "the old never dies"
	},
	{
		title: "AC/DC",
		subtitle: randomSubTitle(),
		subtext: "great hard rock music"
	},
	{
		title: "Queen",
		subtitle: randomSubTitle(),
		subtext: "the band not the person"
	},
	{
		title: "Sabaton",
		subtitle: randomSubTitle(),
		subtext: "this should be the swedish anthem"
	},
	{
		title: "Shazam",
		subtitle: randomSubTitle(),
		subtext: "discovered through the power of magic"
	},
]

function randomSubTitle() {
	let subTitles = ["Playlist", "Collection", ""]
	let which = Math.floor(Math.random()*(subTitles.length-0)+0)
	
	return subTitles[which];
}

let randomizing = false;
let lastWhich;

function randomize() {
	if (randomizing) {
		return;
	}; randomizing = true;
	
	let which = Math.floor(Math.random()*(templates.length-0)+0)
	
	if (lastWhich === which) {
		randomizing = false;
		randomize();
		return;
	}; lastWhich = which;
	
	bigTitle.innerHTML = templates[which].title;
	bigTitleInput.value = templates[which].title;
	
	subTitle.innerHTML = templates[which].subtitle;
	subTitleInput.value = templates[which].subtitle;
	
	if (Math.floor(Math.random()*(1-0+1)+0) === 1) {
		subText.innerHTML = templates[which].subtext;
		subTextInput.value = templates[which].subtext;
	} else {
		subText.innerHTML = "";
		subTextInput.value = "";
	}
	
	randomImage()
	setTimeout(() => {
		randomizing = false;
	}, 1000)
}

function randomImage() {
	$.querySelectorAll(".image")[Math.floor(Math.random()*($.querySelectorAll(".image").length-0)+0)].click()
}

function generateImage() {
	randomImage();
	let sepia = Math.random()*(1-0.2)+0.2;
	let saturation = Math.random()*(100-70)+70;
	
	setTimeout(() => {
		artShadow.style.filter = `blur(var(--shadowamount)) sepia(${sepia}) saturate(${saturation}%)`;
		art.style.filter = `sepia(${sepia}) saturate(${saturation}%)`;
	}, 300)
}

function chooseImage() {
	dialog.showOpenDialog({
		filters: [
			{ name: "Images", extensions: ["jpg", "png", "jpeg"] },
		]}, { properties: [ "openFile" ]}).then(result => {
		if (result.canceled) {return};
		setAlbum(result.filePaths[0])
	})
}