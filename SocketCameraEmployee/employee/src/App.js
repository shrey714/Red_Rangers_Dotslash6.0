import "./App.css";
import React,{ useEffect, useState } from "react";
import { io } from "socket.io-client";

var socket;
var i = 0;
function App() {
  const [txt, setTxt] = useState("");

  useEffect(() => {
    socket = io.connect("https://socketServer.jeetoza.repl.co");
    // socket = io.connect("http://localhost:8000");
    socket.on("takePhoto", (data) => {
      console.log(data);
      // setCam(true);
    });
    socket.on("sendUrl",(data)=>{
      console.log(data)
      console.log("url received")
    })
    return () => {
      socket.off();
    };
  }, []);

  const sendReq = () => {
    socket.emit("request", "please send photo");
  };


  return (
    <>
      <input
        type="text"
        value={txt}
        onChange={(e) => {
          setTxt(e.target.value);
        }}
      />
      <button onClick={sendReq}>send otp</button>
    </>
  );
}

export default App;
