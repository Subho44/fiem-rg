import './App.css';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import Service from './components/Service';

const App = ()=> {
  const title = "E-stock Market"
  return <>
  <div className="header">
  <h1>{title}</h1>
  </div> 
  <Home/>
  <About/>
  <Contact/>
  <Service/>
  
  </>
}

export default App;