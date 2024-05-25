const mongoose = require('mongoose');

mongoose.connect(process.env.mongodb_URL)
.then(()=>{
    console.log('DB is Connected');
})
.catch((err)=>{
    console.log(err);
})