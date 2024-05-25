const express = require('express');
const router = express.Router();
const todos = require('../Model/todolist');

router.use(express.json());

//to view todo description 

router.get('/home',async(req,res)=>{
  try {
       const data = await todos.find();
       res.status(200).send({message:"data send",data});
       console.log(data);
  } catch (error) {
    console.log(error);
  }
})

//to add a todo description
router.post('/add',async(req,res)=>{
    try {
        const addtodo = req.body;
        const data = await todos(addtodo).save();
        res.status(200).send({message:"Added"});
        console.log(data);

    } catch (error) {
  console.log(error);  
    }
})


//to delete a todo description

router.delete('/delete/:id',async(req,res)=>{
  try {
    const todo = req.body;
    const data = await todos.findByIdAndDelete(req.params.id,todo);
    res.status(200).send({message:'Todo details Removed'});
  }catch(error){
    console.log(error);
  }
})












module.exports = router;