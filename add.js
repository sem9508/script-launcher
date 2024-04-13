const fs = require('fs')
const path = require('path')
require('dotenv').config()

let back_button = document.getElementById('back');
let name_input = document.getElementById('name');
let path_input = document.getElementById('path');
let submit_button = document.getElementById('submit');

back_button.onclick = function(){
    console.log('1')
    window.location.href = path.join(__dirname, 'index.html');
    console.log('2')
}
const dataPath = process.env.NODE_ENV === 'development'

? path.join(__dirname, 'data')
: path.join(process.resourcesPath, 'data');
let jsonObject = JSON.parse(fs.readFileSync(path.join(dataPath, 'scripts.json')))

submit_button.onclick = function(){
    new_name = name_input.value;
    new_path = path_input.value;

    if (jsonObject.hasOwnProperty(new_name)){
        error_message = document.createElement('h2');
        error_message.innerHTML = 'Name already in use...'
        document.body.appendChild(error_message);
    }

    else {
        jsonObject[new_name] = new_path
        fs.writeFileSync(path.join(dataPath, 'scripts.json'), JSON.stringify(jsonObject, null, 2))
        window.location.href = path.join(__dirname, 'index.html')
    }
}