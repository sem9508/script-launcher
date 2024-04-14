const fs = require('fs')
const path = require('path')
require('dotenv').config()

let back_button = document.getElementById('back');

back_button.onclick = function(){
    window.location.href = path.join(__dirname, '../html/index.html');
}