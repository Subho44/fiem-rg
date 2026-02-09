import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import Navbardata from './components/Navbardata'
import About from './components/About'
import Contact from './components/Contact'
import Service from './components/Service'
import './App.css'
const App = () => {

  return <>
  <BrowserRouter>
  <Navbardata/>
  <Routes>
    <Route path='/home' element={<Home name="raj" location="kolkata"/>}></Route>
     <Route path='/about' element={<About/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
       <Route path='/service' element={<Service/>}></Route>
  </Routes>
  
  
  </BrowserRouter>
  
  </>
}

export default App