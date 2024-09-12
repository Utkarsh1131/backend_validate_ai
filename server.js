import express from 'express';
import bodyParser from 'body-parser';
import * as fs from 'node:fs';
import data from './MOCK_DATA.json' assert { type: "json" };
import DataScraper from '../backend_validate_ai/components/scrape.js'


let url="https://www.news18.com/cricket/essex-handed-12-point-deduction-over-bat-controversy-dashing-hopes-of-title-run-9047933.html";
const app=express();
const users = data;
// Parse JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const output = await DataScraper(url);
console.log(output.pTagsText);

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
