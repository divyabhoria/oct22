// const express=require("express")
// const path=require("path")
// const app=express()
// const PORT=8080
// app.use(express.json())
// filepath=path.join(__dirname,"/views/index.html")
// app.set('view engine', 'ejs');

// app.get("/",(req,res)=>{
//     res.sendFile (filepath)
// })
// app.listen(PORT,(err)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(`listening to PORT${PORT}`)
//     }
// })




const express = require("express");
const app = express();
const path = require("path");
const PORT = 8080;
app.set('view engine', 'ejs');
app.use(express.json());

filepath = path.join(__dirname, "/views/index.ejs");
app.get("/welcome", (req, res)=>{
    let name="Sam"
    ///let place="Hyderabad"
    res.render(filepath, {name}, );
})

app.listen(PORT, (err)=>{
    if(err) console.log(err);
    else console.log(`Listening to Port ${PORT}`);
})