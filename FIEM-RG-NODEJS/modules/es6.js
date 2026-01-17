const sumall = (...nums)=>{
    return nums.reduce((total,n)=>total +n, 0);
};
const printuser = (user)=>{
    const {name,age,city} = user;
  return `User: ${name} , age:${age},city:${city}`;
}
module.exports = {sumall,printuser}