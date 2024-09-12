const express=require("express");
const bodyParser = require('body-parser');
const fs=require("fs")

const app=express();

// Parse JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const users=require("./MOCK_DATA.json")
app.get('/', (req,res)=>{
    return res.send("hello from express server")
})
app.get('/about', (req,res)=>{
    return res.send("we are validate_ai from express server")
})
app.get('/hey', (req,res)=>{
    return res.end("hey " +req.query.name +"   from express server")
})
app.get("/api/users",(req,res)=>{
    return res.json(users);
})
app.get("/api/users/:id",(req,res)=>{
    const id= Number(req.params.id);
    const user=users.find((user)=> user.id===id);
    return res.json(user);
    
})
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

app.listen(8000,()=>console.log("server started!!!!!"))
