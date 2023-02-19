import React from "react";
import { FaCircle } from "react-icons/fa";

const PenaltyElement = ({ time, operation }) => {
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
    <div>
      <li
        className="list-group-item"
        style={{
          padding: "0px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FaCircle
            color={
              operation === "LateEntryPenaltyApproved" ||
              operation === "EarlyExitPenaltyApproved"
                ? "#3bff6f"
                : "#eb796a"
            }
            style={{
              marginLeft: "10px",
            }}
          />
          <div style={{ flex: 3, padding: "10px 10px" }}>{converter(time)}</div>
          <div style={{ flex: 3, padding: "10px 10px", fontWeight: "bold" }}>
            {operation}
          </div>
        </div>
      </li>
    </div>
  );
};

export default PenaltyElement;
