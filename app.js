const express = require('express');

require('dotenv').config();
require('./models/db');

const userRouter = require('./routes/user');
const User=require('./models/user');

const app=express();
app.use(express.json());
app.use(userRouter);

// hashing the password with correct that password or not
const test=async(email,password)=>{
    const user=await User.findOne({email:email});
    const result=await user.comparePassword(password);
    console.log(result);
}
test('mahalaskhmi@gmail.com','maha2345');
// ---------------
app.get('/',(request,response)=>{
    response.send('<h1 style="color:gray;">HIII Mahalakshmi</h1>');
});

app.listen(8000,()=>{
    console.log('Port is listening')
})

