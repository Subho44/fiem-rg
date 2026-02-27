import React from 'react'
import { AppBar,Toolbar,Typography,Button,Box } from '@mui/material';
import {Link,useLocation,useNavigate} from "react-router-dom"
const Appnavbar = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const token  = localStorage.getItem("token");

    const hl = ()=> {
      localStorage.removeItem("token");
      navigate('/login');
    }

  return <>
  <AppBar position='sticky' elevation={1}>
    <Toolbar>
        <Typography variant='h6' sx={{fontWeight:800,flexGrow:1}}>
            Job Portal 
        </Typography>
        <Box>
            <Button 
            component={Link} 
            to="/" 
            color='inherit'
            variant={pathname === "/" ? "outlined":"text"}>
              Register
            </Button>
            <Button 
            component={Link} 
            to="/login" 
            color='inherit'
            variant={pathname === "/login" ? "outlined":"text"}>
              Login
            </Button>

            {
               token && (
                <>
                 <Button 
            component={Link} 
            to="/home" 
            color='inherit'
            variant={pathname === "/home" ? "outlined":"text"}>
              Jobs
            </Button>
              <Button 
            component={Link} 
            to="/add" 
            color='inherit'
            variant={pathname === "/add" ? "outlined":"text"}>
              Add Job
            </Button>

            <Button 
              color='inherit'
              onClick={hl}
            >
              Logout
            </Button>
            

                
                </>
               )

            }



          
        </Box>
    </Toolbar>
  </AppBar>
  
  </>
}

export default Appnavbar