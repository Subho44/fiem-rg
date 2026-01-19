const http = require("http");
const url = require("url");

// const students = [
//     { id: 1, name: "raj", course: "b.tech" },
//     { id: 2, name: "ravi", course: "m.tech" },
//     { id: 3, name: "raja", course: "bca" },
// ];
//create server
const server = http.createServer((req, res) => {
   const parsedurl = url.parse(req.url,true);
   const path = parsedurl.pathname;
   const query = parsedurl.query;
   res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.write("welcome to ardent \n");
    // res.write("we are learning mern stack course\n");
    // res.write("we are learning nodejs now\n");
    // res.end(JSON.stringify(students));
    //routes
    if(path==="/" && req.method ==="GET") {
        res.end(JSON.stringify({
            message:"home page",
            routes:["/about","/contact"]
        }));
    }
    else if(path==="/about" && req.method ==="GET") {
        res.end(JSON.stringify({
            page:"about",
            info:"this is about page"
        }));
    }
     else if(path==="/contact" && req.method ==="GET") {
        res.end(JSON.stringify({
            page:"contact",
            phone:"916289619338",
            email:"raj@gmail.com"
        }));
    }
    else {
       
       res.end(JSON.stringify({error:"page not found"})); 
    }



});
const port = 4500;
server.listen(port, () => {
    console.log("server is running port  4500");
})