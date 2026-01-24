const express = require('express');
const app = express();
const port = 5000;

const products = [
    { id: 1, name: "Laptop", price: 78000 },
    { id: 2, name: "Watch", price: 7800 },

];

function genid() {
    const maxid = products.reduce((max,p)=>(p.id > max ? p.id: max),0);
    return maxid +1
}
app.use(express.json());
app.get('/', (req, res) => {
    res.send("welcome to  home page");
});
//all product view
app.get('/about', (req, res) => {
    res.json({
        total:products.length,
        products
    })
});
//new product insert
app.post("/insert",(req,res)=>{
    const {name,price}= req.body;
    const newproduct = {
        id:genid(),
        name,
        price
    };
    products.push(newproduct);
    res.status(200).json({
        message:"product added",
        product:newproduct
    });

});
//singel data view
app.get('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(x=>x.id === id);
    res.json(product);
});
app.listen(port, () => {
    console.log("server is running port 5000");
});
