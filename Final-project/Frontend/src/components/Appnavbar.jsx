import React from 'react'
import { AppBar,Toolbar,Typography,Button,Box } from '@mui/material';
import {Link,useLocation} from "react-router-dom"
const Appnavbar = () => {
    const {pathname} = useLocation();

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
              Jobs
            </Button>

            <Button 
            component={Link} 
            to="/add" 
            color='inherit'
            variant={pathname === "/add" ? "outlined":"text"}>
              Add Job
            </Button>
        </Box>
    </Toolbar>
  </AppBar>
  
  </>
}

export default Appnavbar