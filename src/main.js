const { app, BrowserWindow } = require('electron')
// include the Node.js 'path' module at the top of your file 
const path = require('path')
// modify your existing createWindow() function 
function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    win.loadURL("http://localhost:3000")
}
app.whenReady().then(() => {
    createWindow()
})
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})