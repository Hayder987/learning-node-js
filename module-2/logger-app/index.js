
// console.log(process)

// console.log(process.argv)

const inputText = process.argv.slice(2);
const text = inputText.join(' ');

if(!text){
    console.log("example: node index.js hello world")
    process.exit(1)
}

console.log(text);