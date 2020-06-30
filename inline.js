/* Copyrighted by 0neGuyDev */

let $ = document;

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