

const fs = require('fs');

// const text = 'learning file system'

//  fs.writeFileSync('./hello.txt', text);


// const data = fs.readFileSync('./hello.txt', { encoding: 'utf8', flag: 'r' });


// console.log(data);

const readStream = fs.createReadStream('./hello.txt', {encoding:'utf-8'});
const writeStrem = fs.createWriteStream('./new.txt', {encoding:'utf-8'});

readStream.on('data', (data)=>{
    console.log(data)
    writeStrem.write(data, (err)=>{
        if(err){
            throw Error("error", err)
        }
    })
})