const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const {addData,getData}=require('./controller/control.js');


const app= express();
app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();
const port=process.env.PORT || 8000;

app.post('/api',addData);
app.post('/api/query',getData);

app.use('/',(req,res)=>{
    res.send("Api Running");
})


mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(port,()=>{
        console.log("Connected");
    })
}).catch(err=>console.log(err));
