import React from "react";
import "../Styles/navbar.css";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
const Navbar = ({ contract, account, provider }) => {
  const [mainspinner, setmainspinner] = useState(false);
  const [nameval, setnameval] = useState("USER");
  const [status, setstatus] = useState("---");
  const [liveclock, setliveclock] = useState(null);
  useEffect(() => {
    const func = async () => {
      setmainspinner(true);
      try {
        let temp = await contract?.getuser(account);
        setnameval(temp.name);
        setstatus(temp.status);
        setmainspinner(false);
      } catch (error) {
        toast(error.reason);
        setmainspinner(false);
      }
    };
    func();
  }, []);
  const livetime = () => {
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    setliveclock(h + ":" + m + ":" + s);
  };
  setInterval(livetime, 1000);
  const addUser = async () => {
    setmainspinner(true);
    var address = document.getElementById("inputaddress1").value;
    var name = document.getElementById("inputname").value;
    try {
      await contract.addEmployee(address, name);
      setmainspinner(false);
    } catch (error) {
      toast(error);
      setmainspinner(false);
    }
  };
  const removeUser = async () => {
    setmainspinner(true);
    var address = document.getElementById("inputaddress2").value;
    try {
      await contract.removeEmployee(address);
      setmainspinner(false);
    } catch (error) {
      toast(error.reason);
      setmainspinner(false);
    }
  };
  return (
    <>
      {mainspinner ? <Spinner /> : <></>}
      <div style={{ height: "8vh" }}>
        <nav style={{ height: "100%" }} class="navbar navbar-light bg-light">
          <div class="container-fluid">
            <div
              style={{ padding: 0, marginLeft: 10 }}
              class="navbar-brand center"
            >
              {liveclock}
              <div
                style={{
                  background: status === "home" ? "#eb796a" : "#3bff6f",
                  color: "#000",
                  fontWeight: "bold",
                  borderColor: "#000",
                  borderWidth: 0,
                }}
                class="btn btn-outline-primary mx-4"
              >
                {status}
              </div>
            </div>
            <div class="d-flex">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style={{ marginRight: "10px" }}
              >
                ADD EMPLOYEE
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal1"
                style={{ marginRight: "10px" }}
              >
                REMOVE EMPLOYEE
              </button>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                class="btn btn-outline-primary mx-2"
              >
                <FaStar style={{ marginRight: "8px" }} />
                {nameval}
              </div>
              <CopyToClipboard
                text={account}
                onCopy={() => {
                  toast(`Copied ! (${account})`);
                }}
              >
                <div class="btn btn-outline-primary mx-2">{account}</div>
              </CopyToClipboard>
            </div>
          </div>
        </nav>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add new user
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="inputaddress" class="form-label">
                    Address
                  </label>
                  <input type="text" class="form-control" id="inputaddress1" />
                </div>
                <div class="mb-3">
                  <label for="inputname" class="form-label">
                    Name
                  </label>
                  <input type="text" class="form-control" id="inputname" />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" onClick={addUser}>
                Add user
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add new user
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="inputaddress" class="form-label">
                    Address
                  </label>
                  <input type="text" class="form-control" id="inputaddress2" />
                </div>
              </form>
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
                type="button"
                class="btn btn-primary"
                onClick={removeUser}
              >
                Remove user
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
