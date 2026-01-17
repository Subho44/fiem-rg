const basics = require("./modules/basics");
const es6 = require("./modules/es6");

basics.x();
console.log(basics.y(78));
console.log(basics.y(67));
basics.z();

console.log("Sum: ",es6.sumall(10,20,30));
const user = {name:"rahul", age:34,city:"kolkata"};
console.log(es6.printuser(user));

