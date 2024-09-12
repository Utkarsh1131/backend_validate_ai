import express from 'express';
import bodyParser from 'body-parser';
import * as fs from 'node:fs';
import data from './MOCK_DATA.json' assert { type: "json" };
import DataScraper from '../backend_validate_ai/components/scrape.js'


let url="https://www.washingtonpost.com/world/2024/09/11/israel-gaza-west-bank-biden-aysenur-eygi/";
const app=express();
const users = data;
// Parse JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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
app.get("/api/web",async(req,res)=>{
    try{
        const query=req.query.query;
        console.log(query);
        const output = await DataScraper(query);
        return res.status(200).json(output);
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:"Internal Server Error"})
    }
    
    
})
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

app.listen(8000,()=>console.log("server started!!!!!"))
