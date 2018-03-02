const { app, BrowserWindow } = require("electron");
let mainWindow;

const dev = process.mainModule.filename.indexOf("app.asar") === -1

const mainUrl = dev ? "http://localhost:3000" : "file://" + __dirname + "/index.html";
//console.log("Using url: %s", mainUrl);

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        height: 768,
        width: 1024
    });
    mainWindow.loadURL(mainUrl);
    if (dev) {
        const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require("electron-devtools-installer");
        installExtension(REACT_DEVELOPER_TOOLS)
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log("An error occurred: ", err));

        installExtension(REDUX_DEVTOOLS)
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log("An error occurred: ", err));
        mainWindow.webContents.openDevTools()
    }
});

// Start development server
if (dev) {
    const webpack = require("webpack");
    const WebpackDevServer = require("webpack-dev-server");
    const config = require("./webpack.config");
    console.log("Starting the dev web server...");
    const port = 3000;
    const path = require("path");

    const options = {
        publicPath: "/static/",
        hot: true,
        inline: true,
        //contentBase: "www",
        stats: { colors: true }
    };

    const server = new WebpackDevServer(webpack(config), options);

    server.listen(port, "localhost", function (err) {
        if (err) {
            console.log(err);
        }
        console.log("WebpackDevServer listening at localhost:", port);
    });
}