import { useState } from "react";
import axios from "axios";
import { Web3Storage } from "web3.storage";
import axiosRetry from "axios-retry";
const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `Enter Your Key`,
            pinata_secret_api_key: `Enter Your Secret Key`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        console.log(ImgHash);
        //const signer = contract.connect(provider.getSigner());
        // const signer = contract.connect(provider.getSigner());
        // signer.add(account, ImgHash);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    setFileName("No image selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0];
    console.log(data); //files array of files object
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  function makeStorageClient() {
    return new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEZkYTVhMjIzZDViNDM5QWY0NjJDYzdhODRiRjcyODQxMTg4NzEyQzkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzY3MjAzOTk0MDEsIm5hbWUiOiJmaXJzdHRva2VuZ2VuZXJhdGUifQ.VbTexNHP_xGRiox5uNdAZVfki4WnuodzQLnhhOabpFI",
    });
  }
  const clickhandle = async (sourceUrl) => {
    const data = await fetch(sourceUrl);
    const myBlob = await data?.blob();
    const filee = new File([myBlob], "image.jpeg", {
      type: myBlob?.type,
    });
    try {
      //   const formDataa = new FormData();

      async function storeFiles(filee) {
        const client = makeStorageClient();
        const cid = await client.put([filee]);
        console.log("stored files with cid:", cid);
        return cid;
      }
      storeFiles(filee);
    } catch (e) {
      alert("Unable to upload image to Pinata");
    }
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload">
          Upload File
        </button>
        <button
          onClick={() => {
            clickhandle(
              "https://upcdn.io/W142hdT/raw/uploads/2023/02/18/file-2zME.jpeg"
            );
          }}
          className="upload"
        >
          temp button
        </button>
      </form>
    </div>
  );
};
export default FileUpload;
