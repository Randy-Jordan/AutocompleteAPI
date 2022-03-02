const express = require('express');
const path = require('path')
const fs = require('fs');

require('dotenv').config()


const PORT = process.env.PORT

const app = express();

app.use(express.urlencoded({extended: true }))
app.use(express.json({extended:false}))
app.use(express.static(path.join(__dirname,'public')))

let data = fs.readFileSync('data.json')
let list = JSON.parse(data)

app.get('/500',(req,res)=> {
    let matches = list.filter(company => {
        const regex = new RegExp(`^${req.query.input}`,'gi');
        return company.Symbol.match(regex) || company.Security.match(regex)
    });
    res.json(matches)
})


app.listen(PORT, ()=> console.log(`Server Running on ${PORT}`))
