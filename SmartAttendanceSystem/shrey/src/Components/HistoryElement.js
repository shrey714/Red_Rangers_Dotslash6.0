import React from "react";
import { FaCircle } from "react-icons/fa";
import Zoom from "react-medium-image-zoom";
const HistoryElement = ({ name, time, operation, image }) => {
  const converter = (unix_timestamp) => {
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime =
      date.getDate() +
      "/" +
      date.getMonth() +
      "/" +
      date.getFullYear() +
      "," +
      hours +
      ":" +
      minutes.substr(-2) +
      ":" +
      seconds.substr(-2);
    return formattedTime;
  };
  return (
    <li className="list-group-item">
      <div
        className="temp"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <FaCircle
          color={
            operation === "LateEntryPenaltyApproved" ||
            operation === "EarlyExitPenaltyApproved" ||
            operation === "enter" ||
            operation === "enterwithpenalty" ||
            operation === "LateEntryPenaltyPaid" ||
            operation === "PayEarlyPenaltyPaid"
              ? "#3bff6f"
              : "#eb796a"
          }
          style={{
            marginLeft: "10px",
          }}
        />
        <div style={{ width: "20%" }}>{name}</div>
        <div style={{ width: "20%" }}>{converter(time)}</div>
        <div style={{ width: "20%" }}>{operation}</div>
        <div>
          {image !== "notuploaded" ? (
            <Zoom>
              <img
                style={{ width: "50px", height: "50px" }}
                src={image}
                alt="dfgdg"
              />
            </Zoom>
          ) : (
            <></>
          )}
        </div>
      </div>
    </li>
  );
};

export default HistoryElement;
