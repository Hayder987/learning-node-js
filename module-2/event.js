
const EventEmitter = require('node:events');
class SchoolBell extends EventEmitter {}

const schoolBell = new SchoolBell();

schoolBell.on('ring', ()=>{
    console.log('ekhon amader chuti')
});

schoolBell.emit('ring')