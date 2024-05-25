import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {

    const [dataset,setData]=useState([]);
    

    useEffect(()=>{
      axios.get('http://localhost:3001/api/home').then((res)=>{
        console.log(res.data.data);
        setData(res.data.data);
      })
    },[]);

    const deleteTodo=(id)=>{
        try {
          axios.delete('http://localhost:3001/api/delete/'+id).then((res)=>{
          alert(res.data.message);
          window.location.reload(false);
        })
        } catch (error) {
          console.log(error);
        }
      }

  return (
    <div>
      <br/>
      <br/>
      <TableContainer  component={Paper} style={{maxWidth:800, maxHeight:600, margin:'auto'}}> 
        <Table aria-label="simple table" stickyHeader>
          <TableHead >
            <TableRow >
              <TableCell style={{fontFamily:'sans-serif',fontSize:20,fontWeight:600,textAlign:"center"}}>Todo Task</TableCell>
              <TableCell style={{fontFamily:'sans-serif',fontSize:20,fontWeight:600,textAlign:"center"}}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {dataset.map((row) => (
          <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell style={{fontFamily:'sans-serif',fontSize:20,fontWeight:500,textAlign:"center"}}>{row.description}</TableCell>
                <TableCell style={{fontFamily:'sans-serif',fontSize:20,fontWeight:500,textAlign:"center"}}>{row.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={()=>{deleteTodo(row._id)}}>Delete</Button>
                  <Checkbox/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
  )
}

export default Dashboard