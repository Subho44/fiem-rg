//variable + datatypes

function x() {
    var name = "subhojit";
    let company = "ardent";
    const age = 30;
    var name = "virat";
    company= "asd"

    let obj = { city: "kolkata",age:56,course:"mern" };
    let students = ["raj", "virat", "rohit"];

    console.log("variables and datatypes:\n");
    console.log("name:", name, "| type:", typeof name,"\n company:",company);
    console.log("age:", age, "| type:", typeof age);
    console.log("object:", obj.city, "| type:", typeof obj);
    console.log("students details:",students, "| type:", typeof students);
}
//condition 
function y(num) {
    if(num %2 == 0) return  `${num} is even`;
    return `${num} is odd`;
}
//array example 
function z() {
    let numbers = [1,2,3,4];
    console.log("orginal:", numbers);
    numbers.push(5);
    console.log("new:", numbers);
     numbers.pop();
    console.log("remove:", numbers);
    let d = numbers.map(x => x*2);
    console.log("map :",d);

     let ev= numbers.filter(x => x%2 == 0);
    console.log("filter :",ev);
    
}

module.exports = {x,y,z}
