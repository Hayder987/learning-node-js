
// console.log(process)

// console.log(process.argv)

const fs = require("fs");

const inputText = process.argv.slice(2);
const message = inputText.join(' ')
const time = new Date().toISOString();
const text = `${message} At:${time} \n`;

if(!text){
    console.log("example: node index.js hello world")
    process.exit(1)
}

const path = require('path')
const pathName = path.join(__dirname, "log.txt")

fs.appendFile(pathName, text, {encoding:"utf-8"}, ()=>{
    console.log("log added successfully");
})


