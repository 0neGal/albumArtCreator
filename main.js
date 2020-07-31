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
			enableRemoteModule: true,
			experimentalxFeatures: true,
		}
	}); win.loadFile(__dirname + "/src/index.html")
	
	win.on("closed", () => {
		winin = null
	})
	
	win.webContents.once("dom-ready", () => {
		win.setMenu(null)
		win.show()
		win.openDevTools()
	})
}

app.on("ready", init)
