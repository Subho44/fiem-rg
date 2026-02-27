import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form,setForm] = useState({name:"",email:"",password:""});
  const navigate = useNavigate();
  const hc = e=> setForm({...form,[e.target.name]:e.target.value});
  const hs = async(e)=> {
    e.preventDefault();
    await axios.post('http://localhost:5600/api/auth/register',form);
    alert('registration successfully');
    navigate("/login");
    
  }

  return <>
  <form onSubmit={hs}>
  <input name='name' placeholder='name...' onChange={hc} />
  <br></br>
  <input name='email' placeholder='email...' onChange={hc} />
  <br></br>
  <input name='password' type='password' placeholder='password...' onChange={hc} />
  <br></br>
  <button>Register</button>
  </form>
  
  </>
}

export default Register