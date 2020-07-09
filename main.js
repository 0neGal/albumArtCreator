/* Copyrighted by 0neGuyDev */
const electron = require("electron");
const { app, BrowserWindow } = require("electron");

function init() {
	win = new BrowserWindow({
		title: "",
		width: 375,
		height: 650,
		show: false,
		resizable: false,
		transparent: true,
		maximizable: false,
		fullscreenable: false,
		titleBarStyle: "hiddenInset",
		vibrancy: "appearance-based",
		webPreferences: {
			nodeIntegration: true,
			experimentalFeatures: true,
		}
	}); win.loadFile(__dirname + "/src/index.html")
	
	win.on("closed", () => {
		winin = null
	})
	
	.webContents.once("dom-ready", () => {
		win.setMenu(null)
		win.show()
	})
}

app.on("ready", init)
