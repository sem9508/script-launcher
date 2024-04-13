const { shell } = require('electron');
const fs = require('fs')
const path = require('path')
require('dotenv').config()

add_button = document.getElementById('add')

add_button.onclick = function(){
    window.location.href = path.join(__dirname, '../html/add.html')
}

const dataPath = process.env.NODE_ENV === 'development'
? path.join(__dirname, '../../data')
: path.join(process.resourcesPath, 'data');
let jsonObject = JSON.parse(fs.readFileSync(path.join(dataPath, '../../data/scripts.json')))

console.log(dataPath)
console.log(jsonObject)

for (const key in jsonObject){
    script_button = document.createElement('button')
    script_button.innerHTML = key
    script_button.onclick = function(){
        shell.openPath(jsonObject[key])
    }
    script_button.addEventListener('contextmenu', function(event){
        if (event['altKey'] && event['ctrlKey']){
            delete jsonObject[key]

            fs.writeFileSync(path.join(dataPath, '../../data/scripts.json'), JSON.stringify(jsonObject, null, 2))
            window.location.href = path.join(__dirname, '../html/index.html')
        }
    })
    document.body.appendChild(script_button)
}