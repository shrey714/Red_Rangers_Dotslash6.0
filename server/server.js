const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
let cors = require("cors");
app.use(cors());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})
const httpServer = createServer(app);
const io = new Server(httpServer,{
  cors:{
    origin:"*",
    methods:["GET","POST"],
  }
});

io.on("connection", (socket) => {

  socket.on("request",(data)=>{
    console.log(data)
    socket.emit("clickPhoto","please click photo")
    // socket.emit("resPhoto","photo")
  })
  socket.on("sendPhoto",(data)=>{
    console.log(data)
    socket.broadcast.emit("sendUrl",data)
  })
});

httpServer.listen(8000);
