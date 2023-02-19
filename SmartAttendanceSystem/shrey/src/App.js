import "./App.css";
import Attende from "./artifacts/contracts/Attende.sol/Attende.json";
import Navbar from "./Components/Navbar";
import Left from "./Components/Left";
import Right from "./Components/Right";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import WebcamComponent from "./Components/WebcamComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-medium-image-zoom/dist/styles.css";
import TempFile from "./Components/TempFile";
function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [cam, setCam] = useState(false); // make it true initially
  const [lisenceNumber, setLisenceNumber] = useState("");
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Attende.abi,
          signer
        );
        setContract(contract);
        setProvider(provider);
      } else {
        toast("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <>
      <ToastContainer />
      <div
        style={{
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {contract && provider && account ? (
          <>
            <Navbar account={account} provider={provider} contract={contract} />
            <div className="row" style={{ height: "92vh" }}>
              <div className="col-8">
                <Left
                  account={account}
                  provider={provider}
                  contract={contract}
                />
              </div>
              <div className="col-4">
                <Right
                  account={account}
                  provider={provider}
                  contract={contract}
                />
              </div>
            </div>
            {cam && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                  width: "100%",
                  overflow: "hidden",
                  position: "absolute",
                  top: 0,
                  background: "rgba(0,0,0,0.6)",
                }}
              >
                <WebcamComponent
                  setLisenceNumber={setLisenceNumber}
                  lisenceNumber={lisenceNumber}
                  setCam={setCam}
                />
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
  // return <TempFile />;
}

export default App;
