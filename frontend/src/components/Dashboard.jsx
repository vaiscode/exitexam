import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [dataset, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      axios.get('http://localhost:3001/api/home')
        .then((res) => {
          setData(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }, []);
  
    const deleteTodo = (id) => {
      axios.delete(`http://localhost:3001/api/delete/${id}`)
        .then((res) => {
          alert(res.data.message);
          setData((prevData) => prevData.filter((row) => row._id !== id));
        })
        .catch((error) => {
          console.error('Error deleting data:', error);
        });
    };
  
    const onCompletion = (id) => {
      const updatedDataset = dataset.map((item) => {
        if (item._id === id) {
          const updatedItem = { ...item, status: item.status === 'completed' ? 'ongoing' : 'completed' };
          // Update the task status in the backend
          axios.put(`http://localhost:3001/api/update/${id}`, { status: updatedItem.status })
            .catch((error) => {
              console.error('Error updating status:', error);
            });
          return updatedItem;
        }
        return item;
      });
      setData(updatedDataset);
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <br/>
        <br/>
        <TableContainer component={Paper} style={{ maxWidth: 800, maxHeight: 600, margin: 'auto' }}>
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontFamily: 'sans-serif', fontSize: 20, fontWeight: 600, textAlign: 'center' }}>Todo Task</TableCell>
                <TableCell style={{ fontFamily: 'sans-serif', fontSize: 20, fontWeight: 600, textAlign: 'center' }}>Status</TableCell>
                <TableCell style={{ fontFamily: 'sans-serif', fontSize: 20, fontWeight: 600, textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataset.map((row) => (
                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell style={{ 
                      fontFamily: 'sans-serif', 
                      fontSize: 20, 
                      fontWeight: 500, 
                      textAlign: 'center',
                      textDecoration: row.status === 'completed' ? 'line-through' : 'none' 
                    }}>
                    {row.description}
                  </TableCell>
                  <TableCell style={{ 
                      fontFamily: 'sans-serif', 
                      fontSize: 20, 
                      fontWeight: 500, 
                      textAlign: 'center' 
                    }}>
                    {row.status}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <Button variant="contained" color="error" onClick={() => deleteTodo(row._id)}>Delete</Button>
                    <Checkbox 
                      checked={row.status === 'completed'}
                      onChange={() => onCompletion(row._id)} 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };
  
  export default Dashboard;