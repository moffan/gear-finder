import { app, BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS
} from "electron-devtools-installer";
import * as path from "path";
import * as url from "url";
import { Channels } from "../common";

import "./auth";
import "./search";
import "./trade";
import "./poe-ninja";
import "./character-window";

let mainWindow: BrowserWindow | null;

// Keep a reference for dev mode
let isDevMode = false;
if (
  process.env.NODE_ENV === "development" ||
  process.defaultApp ||
  /[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
  /[\\/]electron[\\/]/.test(process.execPath)
) {
  isDevMode = true;
}

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = `${isDevMode}`;

const createWindow = () => {
  const windowOptions: BrowserWindowConstructorOptions = {
    frame: isDevMode,
    height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true
    },
    width: 1366
  };

  mainWindow = new BrowserWindow(windowOptions);

  const indexUrl = isDevMode
    ? "http://localhost:8080"
    : url.format({
        pathname: path.join(__dirname, "..", "index.html"),
        protocol: "file:",
        slashes: true
      });

  mainWindow.loadURL(indexUrl);

  mainWindow.on("close", () => {
    if (!!mainWindow) {
      mainWindow.webContents.send(Channels.AppClosing);
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.once("ready-to-show", () => {
    if (!mainWindow) {
      throw new Error("No mainWindow");
    }

    mainWindow.show();

    if (isDevMode) {
      mainWindow.webContents.openDevTools();
    }
  });
};

app.on("ready", () => {
  if (isDevMode) {
    return Promise.all([installExtension(REACT_DEVELOPER_TOOLS)])
      .then(names => {
        for (const name of names) {
          // tslint:disable-next-line: no-console
          console.log("Added Extension: ", name);
        }

        createWindow();
      })
      .catch(err => {
        // tslint:disable-next-line: no-console
        console.log("An error occurred: ", err);
      });
  }

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
