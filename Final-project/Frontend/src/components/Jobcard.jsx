import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Chip,
  Button,
  CardActions
} from "@mui/material";
import { Link } from 'react-router-dom';
import { getimageurl } from '../api/api';

const Jobcard = ({job,onDelete,onSubscribe}) => {
  const img = job?.jobimage ? getimageurl(job.jobimage) :"";

  return <>
  <Card sx={{height:"100%",borderRadius:3}}>
  {
    img ? (
      <CardMedia component="img" height="160" image={img} alt="job"/>
    ):(
      <CardMedia
      component="div"
      sx={{
        height:160,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        bgcolor:"grey.200"
      }}
      >
     <Typography>
      No Image
     </Typography>
      </CardMedia>

    )}

    <CardContent>
      <Typography variant='h6' sx={{fontWeight:700}} noWrap>
        {job.title}
      </Typography>
      <Typography variant='body2' color='text.secondary' noWrap>
        {job.company} - {job.location}
      </Typography>
        <Stack direction="row" spacing={1} sx={{mt:1,flexWrap:"wrap"}}>
      <Chip size='small' label={`$ ${job.salary || 0}`}/>
    </Stack> 
    <Typography variant='body2' sx={{mt:1}} color='text.secondary' noWrap >
      {job.description}
    </Typography>

    </CardContent>
    <CardActions sx={{px:2,pb:2,gap:1}}>
      <Button 
      component={Link}
      to={`/job/${job._id}`}
      size='small'
      variant='contained'
      
      >View</Button>
       <Button
       size='small'
       variant='outlined'
       color='error'
       onClick={()=>onDelete(job._id)}
       >Delete</Button>

       <Button
       size='small'
       variant='outlined'
       color='error'
       onClick={()=>onSubscribe(job)}
       >Buy Now</Button>
    </CardActions>
  
  </Card>
  
  </>
}

export default Jobcard