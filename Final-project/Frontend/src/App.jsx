import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Appnavbar from './components/Appnavbar';
import Home from './pages/Home';
import Addjob from './pages/Addjob';
import Jobdetails from './pages/Jobdetails';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from './utils/PrivateRoute';
const App = () => {
  return <>
  <BrowserRouter>
  <Appnavbar/>
  <Container maxWidth="lg" sx={{py:3}}>
   <Routes>
     <Route path='/' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route element={<PrivateRoute/>}>
       <Route path='/home' element={<Home/>}></Route>
       <Route path='/add' element={<Addjob/>}></Route>
      <Route path='/job/:id' element={<Jobdetails/>}></Route>
      </Route>
   
  </Routes>

  </Container>
  </BrowserRouter>
  
  </>
}

export default App