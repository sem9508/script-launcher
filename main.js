const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      icon: path.join(__dirname, 'logo.ico'),
      title: 'Script Launcher',
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        
        preload: path.join(__dirname, 'preload.js')
      }
    })
 
    win.setMenu(null)
    win.loadFile(path.join(__dirname, 'index.html'))
}

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })