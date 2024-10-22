"use strict";

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
var express = require("express");

var app = express();

var path = require("path");

var PORT = 8080;
app.set('view engine', 'ejs');
app.use(express.json());
filepath = path.join(__dirname, "/views/index.ejs");
app.get("/welcome", function (req, res) {
  var name = "Sam"; ///let place="Hyderabad"

  res.render(filepath, {
    name: name
  });
});
app.listen(PORT, function (err) {
  if (err) console.log(err);else console.log("Listening to Port ".concat(PORT));
});