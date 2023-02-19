import "./App.css";
import React,{ useEffect, useState } from "react";
import { io } from "socket.io-client";
import Webcam from "react-webcam";
import { Upload } from "upload-js";


var socket;
var i = 0;
function App() {
  const [txt, setTxt] = useState("");
  const [cam, setCam] = useState(false);

  useEffect(() => {
    socket = io.connect("https://socketServer.jeetoza.repl.co");
    // socket = io.connect("http://localhost:8000");
    socket.on("clickPhoto", (data) => {
      console.log(data);
      setTimeout(()=>{
        document.getElementById("captureBtn").click();
      },1000)
    });
    return () => {
      socket.off();
    };
    // console.log("hello")
  }, []);

  const [lisenceNumber, setLisenceNumber] = useState(false);
  const sendReq = () => {
    socket.emit("jeet", "req for photo");
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  const webcamRef = React.useRef(null);
 const [loader,Setloader] =useState(false)



  const stop = () => {
    let stream = webcamRef.current.video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    webcamRef.current.video.srcObject = null;
  };
  const fetchLisenceNo = async (fileUrl) => {
    console.log(`{"url":${fileUrl}}`);
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "046462f9demshe72468c53183484p19fe9ajsne5c3a90a47ef",
        "X-RapidAPI-Host": "license-plate-detection.p.rapidapi.com",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
      // body: '{"url":"https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/body-image/public/giulianumberplate.jpg"}',
      // body: '{"url":"https://upcdn.io/W142hdT/raw/Screenshot%202023-02-17%20114515.jpg"}',
      // body: '{"url":"https://upcdn.io/W142hdT/raw/uploads/2023/02/17/file-6x28.jpeg"}',
      body: `{"url":"${fileUrl}"}`,
    };
    fetch(
      "https://license-plate-detection.p.rapidapi.com/license-plate-detection",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        console.log(response[0]?.value);
        setLisenceNumber(response[0]?.value);
        // if (!response[0]?.value) {
        //   setCam(true);
        // } else {
        //   setCam(false);
        // }
        // Setloader(true);
      })
      .catch((err) => console.error(err));
  };
  const [imgSrc, setImgSrc] = useState(null);

  const detectNumber = async (getScreenshot) => {
    console.log("clicked")
    const imgBase64 = getScreenshot();
    setImgSrc(imgBase64);
    const temp = await fetch(imgBase64);
    // stop();
    const blob = await temp.blob();
    const upload = Upload({
      apiKey: "public_W142hdT8eBHaAp1k7bVWCVaUvaru", // Replace "free" with your API key.
    });
    const { fileUrl } = await upload.uploadFile(blob, {
      mime: ["image/jpeg"],
    });
    socket.emit("sendPhoto",fileUrl)
    console.log(fileUrl)
    await fetchLisenceNo(fileUrl);
  };

  return (
    <>
      <div>
        <Webcam
          audio={false}
          ref={webcamRef}
          height={360}
          screenshotFormat="image/jpeg"
          width={640}
          videoConstraints={videoConstraints}
          style={{
            display: "block",
            background: "#000",
            borderRadius: 10,
          }}
        >
          {({ getScreenshot }) => (
            <div
              style={{
                width: "50%",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <button
                type="button"
                disabled={loader}
                id="captureBtn"
                className="btn btn-primary btn-lg"
                onClick={() => detectNumber(getScreenshot)}
                style={{ borderRadius: "0 0 20px 20px", height: "50px",visibility:"hidden" }}
              >
                capture
              </button>
            </div>
          )}
        </Webcam>
      </div>
    </>
  );
}

export default App;
