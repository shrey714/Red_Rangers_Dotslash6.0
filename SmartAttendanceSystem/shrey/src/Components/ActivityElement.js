import React from "react";
import Zoom from "react-medium-image-zoom";
import { FaCircle } from "react-icons/fa";
const ActivityElement = ({ time, operation, image }) => {
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
              operation === "enterwithpenalty" ||
              operation === "leavewithpenalty"
                ? "#eb796a"
                : "#3bff6f"
            }
            style={{
              marginLeft: "10px",
            }}
          />
          <div style={{ flex: 3, padding: "10px 10px" }}>{converter(time)}</div>
          <div style={{ flex: 3, padding: "10px 10px", fontWeight: "bold" }}>
            {operation}
          </div>
          <div style={{ flex: 1, paddingRight: "10px" }}>
            <Zoom>
              <img
                style={{ width: "100%", height: "100%" }}
                src={image}
                alt="new"
              />
            </Zoom>
          </div>
        </div>
      </li>
    </div>
  );
};

export default ActivityElement;
