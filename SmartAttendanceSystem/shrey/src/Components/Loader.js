import React from "react";
import "../Styles/loader.css";
import errorpng from "../Assets/Images/images.png";
import { AiFillWarning } from "react-icons/ai";
const Loader = ({ error }) => {
  return (
    <>
      {error ? (
        <>
          <div className="error">
            <AiFillWarning size={150} />
            Retake or contact to administration to register you as an
            employee.
          </div>
        </>
      ) : (
        <div class="loader"></div>
      )}
    </>
  );
};

export default Loader;
