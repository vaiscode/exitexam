import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Addtodo = () => {
  
  const navigate = useNavigate();
  const [todo,setTodo]= useState();
  const inputHandler =(e)=>{
    setTodo({...todo,[e.target.name]:e.target.value})
  }

  const addData =()=>{
    console.log(todo);
    axios.post("http://localhost:3001/api/add",todo).then((res)=>{
      alert(res.data.message)
      navigate('/')
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div>
    <Box style={{margin:"5%"}}>
    <TextField
      fullWidth
      multiline
      rows={10}
      variant='filled'
      label='ToDo Description'
      name = "description"
      onChange={inputHandler}/>
      
      <br /><br />
      <TextField
      variant='filled'
      label='Status'
      name = "status"
      onChange={inputHandler}/>

      <br /><br />
      <Button variant='contained' color='primary' onClick={addData}>Submit</Button>
    </Box>
    </div>
  )
}

export default Addtodo