import React from 'react'

const About = () => {

  const products = [

    {id:1,name:"laptop",price:78988},
     {id:2,name:"watch",price:789},
      {id:3,name:"tab",price:7898},

  ];

  return <>

  <table border={2} width="100%">
    <tr>
      <th>Id</th>
       <th>Name</th>
        <th>Price</th>
    </tr>
    {
      products.map(x=>(
        <tr>
          <td>{x.id}</td>
           <td>{x.name}</td>
            <td>{x.price}</td>
        </tr>
      ))
    }

  </table>
  
  </>
}

export default About