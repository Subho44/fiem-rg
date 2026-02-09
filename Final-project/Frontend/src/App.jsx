import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Appnavbar from './components/Appnavbar';
import Home from './pages/Home';
import Addjob from './pages/Addjob';
import Jobdetails from './pages/Jobdetails';
const App = () => {
  return <>
  <BrowserRouter>
  <Appnavbar/>
  <Container maxWidth="lg" sx={{py:3}}>
   <Routes>
    <Route path='/' element={<Home/>}></Route>
     <Route path='/add' element={<Addjob/>}></Route>
      <Route path='/job/:id' element={<Jobdetails/>}></Route>
  </Routes>

  </Container>
  </BrowserRouter>
  
  </>
}

export default App