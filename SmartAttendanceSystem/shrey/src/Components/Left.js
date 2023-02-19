import React from "react";
import History from "./History";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { FaCircle } from "react-icons/fa";
import { io } from "socket.io-client";
import Zoom from "react-medium-image-zoom";
import { Web3Storage } from "web3.storage";
var socket;
const Left = ({ contract, account, provider }) => {
  const [mainspinner, setmainspinner] = useState(false);
  const [currenttimenote, setcurrenttimenote] = useState("helloo");
  const [btnvissibility, setbtnvissibility] = useState([false, false]);
  const currenttime = () => {
    let d = new Date();
    let h = d.getHours();
    if (0 <= h && h <= 8) {
      console.log(h);
      setcurrenttimenote("you are on time");
    } else if (8 < h && h < 18) {
      console.log(h);
      setcurrenttimenote("Office hour");
    } else {
      console.log(h);
      setcurrenttimenote("you can go");
    }
  };
  useEffect(() => {
    currenttime();
    const getbtnstate = async () => {
      setmainspinner(true);
      try {
        let temp = await contract?.getuser(account);
        setbtnvissibility([
          temp?.requestedLateEntry,
          temp?.lateEntryPenaltyPaid,
        ]);
        setmainspinner(false);
      } catch (error) {
        toast(error.reason);
        setmainspinner(false);
      }
    };
    socket = io.connect("https://socketServer.jeetoza.repl.co");
    // socket = io.connect("http://localhost:8000");
    socket.on("takePhoto", (data) => {
      console.log(data);
      // setCam(true);
    });
    socket.on("sendUrl", async (data) => {
      setimgurl(data);
      console.log(data);
      setmainspinner(false);
    });
    getbtnstate();
    return () => {
      socket.off();
    };
  }, []);
  function makeStorageClient() {
    return new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEZkYTVhMjIzZDViNDM5QWY0NjJDYzdhODRiRjcyODQxMTg4NzEyQzkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzY3MjAzOTk0MDEsIm5hbWUiOiJmaXJzdHRva2VuZ2VuZXJhdGUifQ.VbTexNHP_xGRiox5uNdAZVfki4WnuodzQLnhhOabpFI",
    });
  }
  const EnterUser = async () => {
    setmainspinner(true);
    // const data = await fetch(imgurl);
    // const myBlob = await data?.blob();
    // let linkgenerated;
    // const file = new File([myBlob], "image.jpeg", {
    //   type: myBlob?.type,
    // });
    // try {
    //   async function storeFiles(file) {
    //     const client = makeStorageClient();
    //     const cid = await client.put([file]);
    //     return cid;
    //   }
    //   linkgenerated = storeFiles(file);
    // } catch (e) {
    //   toast(e);
    //   setmainspinner(false);
    // }
    try {
      // const ImgHash = `ipfs://${linkgenerated}`;
      await contract.enter(imgurl);
      setmainspinner(false);
    } catch (error) {
      setmainspinner(false);
      toast(error.reason);
    }
  };
  const [imgurl, setimgurl] = useState(null);
  const sendReq = () => {
    setmainspinner(true);
    socket.emit("request", "please send photo");
  };
  const LeaveUser = async () => {
    setmainspinner(true);
    try {
      await contract.leave(imgurl);
      setmainspinner(false);
    } catch (error) {
      toast(error.reason);
      setmainspinner(false);
    }
  };
  const LateEntryRequeste = async () => {
    setmainspinner(true);
    try {
      await contract.requestLateEntry();
      setmainspinner(false);
    } catch (error) {
      toast(error.reason);
      setmainspinner(false);
    }
  };
  const EarlyExitRequeste = async () => {
    setmainspinner(true);
    try {
      await contract.requestEarlyExit();
      setmainspinner(false);
    } catch (error) {
      toast(error.reason);
      setmainspinner(false);
    }
  };
  const payLEPenalty = async () => {
    setmainspinner(true);
    try {
      await contract.payLateEntryPenalty(imgurl);
      setmainspinner(false);
    } catch (error) {
      toast(error.reason);
      setmainspinner(false);
    }
  };
  const payEEPenalty = async () => {
    setmainspinner(true);
    try {
      await contract.payEarlyExitPenalty(imgurl);
      setmainspinner(false);
    } catch (error) {
      toast(error.reason);
      setmainspinner(false);
    }
  };
  return (
    <>
      {mainspinner ? <Spinner /> : <></>}
      <div
        className="lupper box"
        style={{
          height: "8vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 0,
        }}
      >
        <span
          style={{ fontSize: "20px", fontWeight: "bolder", marginLeft: "20px" }}
        >
          <FaCircle
            style={{ marginRight: "20px" }}
            color={currenttimenote === "Office hour" ? "#3bff6f" : "#eb796a"}
          />
          {currenttimenote}
        </span>
        <div>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal1"
            style={{ marginRight: "10px" }}
          >
            Enter
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal2"
            style={{ marginRight: "10px" }}
          >
            Leave
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal3"
            style={{ marginRight: "10px" }}
          >
            LateEntryRequeste
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal4"
            style={{ marginRight: "10px" }}
          >
            EarlyExitRequeste
          </button>
          {/* {btnvissibility[0] ? ( */}
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal5"
            style={{ marginRight: "10px", background: "#0f8500" }}
          >
            payEEPenalty
          </button>
          {/* ) : ( */}
          {/* <></> */}
          {/* )} */}
          {/* {btnvissibility[1] ? ( */}
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal6"
            style={{ marginRight: "10px", background: "#0f8500" }}
          >
            payLEPenalty
          </button>
          {/* ) : ( */}
          {/* <></> */}
          {/* )} */}
        </div>
      </div>
      <div
        className="llower box scrollbar"
        id="style-3"
        style={{ height: "84vh", overflowY: "scroll" }}
      >
        <History contract={contract} account={account} />
      </div>
      {/* =========== modal-1 ================= */}
      <div
        class="modal fade"
        id="modal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Enter
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              class="modal-body"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <button type="button" class="btn btn-primary" onClick={sendReq}>
                request image url
              </button>
              {imgurl ? (
                <Zoom>
                  <img
                    src={imgurl}
                    alt="fdgd"
                    style={{
                      width: "300px",
                      margin: "50px 0 20px 0",
                      borderRadius: "8px",
                      boxShadow: "0px 0px 10px 3px rgba(28,28,28,0.75",
                    }}
                  />
                </Zoom>
              ) : (
                <></>
              )}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" onClick={EnterUser} class="btn btn-primary">
                Enter User
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* =========== modal-2 ================= */}
      <div
        class="modal fade"
        id="modal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Leave
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <button type="button" class="btn btn-primary" onClick={sendReq}>
                request image url
              </button>
              {imgurl ? (
                <Zoom>
                  <img
                    src={imgurl}
                    alt="fdgd"
                    style={{
                      width: "300px",
                      margin: "50px 0 20px 0",
                      borderRadius: "8px",
                      boxShadow: "0px 0px 10px 3px rgba(28,28,28,0.75",
                    }}
                  />
                </Zoom>
              ) : (
                <></>
              )}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={LeaveUser} type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* =========== modal-3 ================= */}
      <div
        class="modal fade"
        id="modal3"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                LateEntryRequeste
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body"></div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={LateEntryRequeste}
                type="button"
                class="btn btn-primary"
              >
                Request for Late Entry
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* =========== modal-4 ================= */}
      <div
        class="modal fade"
        id="modal4"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                EarlyExitRequeste
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body"></div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={EarlyExitRequeste}
                type="button"
                class="btn btn-primary"
              >
                Request for Early Exit
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* =========== modal-5 ================= */}
      <div
        class="modal fade"
        id="modal5"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                EarlyExitPay
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <button type="button" class="btn btn-primary" onClick={sendReq}>
                request image url
              </button>
              {imgurl ? (
                <Zoom>
                  <img
                    src={imgurl}
                    alt="fdgd"
                    style={{
                      width: "300px",
                      margin: "50px 0 20px 0",
                      borderRadius: "8px",
                      boxShadow: "0px 0px 10px 3px rgba(28,28,28,0.75",
                    }}
                  />
                </Zoom>
              ) : (
                <></>
              )}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={payEEPenalty}
                type="button"
                class="btn btn-primary"
              >
                Pay Early Exit
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* =========== modal-6 ================= */}
      <div
        class="modal fade"
        id="modal6"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                LateEntryPay
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <button type="button" class="btn btn-primary" onClick={sendReq}>
                request image url
              </button>
              {imgurl ? (
                <Zoom>
                  <img
                    src={imgurl}
                    alt="fdgd"
                    style={{
                      width: "300px",
                      margin: "50px 0 20px 0",
                      borderRadius: "8px",
                      boxShadow: "0px 0px 10px 3px rgba(28,28,28,0.75",
                    }}
                  />
                </Zoom>
              ) : (
                <></>
              )}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={payLEPenalty}
                type="button"
                class="btn btn-primary"
              >
                Pay Early Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Left;
