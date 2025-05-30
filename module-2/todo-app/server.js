
// const http = require("http");

// const data = [
//     {
//         name: "hayder",
//         age : 30
//     },
//     {
//         name: "rasel",
//         age : 28
//     }
// ]

// const server = http.createServer((req, res)=>{
//     // console.log(req.url, req.method)
//     // res.end("welcome to server")
// if(req.url === "/todo/all-todo" && req.method==="GET"){
//     // send plain text
//     // res.writeHead(201, {
//     //     "content-type":"text/plain",
//     //     "email":"hayder@gmail.com"
//     // })
//     // res.end("display all Todo")
  
//     // send json data
//     res.writeHead(201, {
//         "content-type":"application/json",
//     })
//     res.end(JSON.stringify(data))

// }
// else if(req.url === "/todo/update-todo" && req.method==="PATCH"){
//      res.end("update todo")
// }
// else{
//     res.end("no route match")
// }
 
// });




// read file data other folder
const http = require("http");

const path = require("path")
const filePath = path.join(__dirname, "./db/todo.json")
const fs = require("fs");
const data = fs.readFileSync(filePath, {encoding:"utf-8"})

const server = http.createServer((req, res)=>{
   const url = new URL(req.url, `http://${req.headers.host}`);
  

    // get all todo
if(req.url === "/todo/all-todo" && req.method==="GET"){
    
    res.writeHead(201, {
        "content-type":"application/json",
    })
    res.end(data)
}

// get single todo
else if (req.url.startsWith("/todo") && req.method==="GET"){
    res.writeHead(201, {
        "content-type":"application/json",
    })

    const name = url.searchParams.get("name");
    const data = fs.readFileSync(filePath, {encoding:"utf-8"});
    const parseData = JSON.parse(data);

    const singleData = parseData.find(item=> item.name === name);
    const result = JSON.stringify(singleData, null, 2);

    res.end(result);
}

// post todo
else if(req.url === "/todo/create-todo" && req.method==="POST"){
     let data = "";
     req.on("data", (reqData)=>{
        
       data = data + reqData
     });

     req.on("end", ()=>{
        const {name, age} = JSON.parse(data)
        const alltodos = fs.readFileSync(filePath, {encoding:"utf-8"});
        const parseTodo = JSON.parse(alltodos);
         parseTodo.push({name, age});
        const strAlltodos = JSON.stringify(parseTodo, null, 2);
        fs.writeFileSync(filePath, strAlltodos, {encoding:"utf-8"});
        res.end(JSON.stringify({name, age} ,null, 2));
     })
}

// update todo
else if(req.url.startsWith("/todo/update-todo") && req.method==="PATCH"){
    const name = url.searchParams.get("name");
     let data = "";
     req.on("data", (reqData)=>{  
       data = data + reqData
     });

     req.on("end", ()=>{
        const {age} = JSON.parse(data)
        const alltodos = fs.readFileSync(filePath, {encoding:"utf-8"});
        const parseTodo = JSON.parse(alltodos);
         const todoIndex = parseTodo.findIndex((item)=> item.name === name)
         parseTodo[todoIndex].age = age;

        const strAlltodos = JSON.stringify(parseTodo, null, 2);
        fs.writeFileSync(filePath, strAlltodos, {encoding:"utf-8"});
        res.end(JSON.stringify({name, age} ,null, 2));
     })
}
else if (req.url.startsWith("/todo/delete-todo") && req.method==="DELETE"){
    const name = url.searchParams.get("name")
    const alltodos = fs.readFileSync(filePath, {encoding:"utf-8"});
    const parseTodos = JSON.parse(alltodos);
    const remaingTodos = parseTodos.filter(item=> item.name !== name)
    const strtodos = JSON.stringify(remaingTodos);

    fs.writeFileSync(filePath, strtodos, {encoding:"utf-8"});

    res.end("delete successfully")
}

else{
    res.end("no route match")
}
 
});



server.listen(5000, "127.0.0.1", ()=>{
    console.log("server is running At 5000 port")
});