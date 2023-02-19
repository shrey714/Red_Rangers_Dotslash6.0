import React from "react";
import "../Styles/card.css";
import ActivityElement from "./ActivityElement";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Activity = ({ contract, account, provider }) => {
  const [mainspinner, setmainspinner] = useState(false);
  const [data, setdata] = useState(null);
  // const data = [
  //   { name: "p", time: "1" },
  //   { name: "p", time: "2" },
  //   { name: "p", time: "3" },
  //   { name: "p", time: "3" },
  //   { name: "p", time: "3" },
  //   { name: "p", time: "3" },
  //   { name: "p", time: "3" },
  //   { name: "p", time: "3" },
  //   { name: "p", time: "3" },
  //   { name: "p", time: "3" },
  //   { name: "p", time: "3" },
  //   { name: "p", time: "3" },
  //   { name: "p", time: "3" },
  //   { name: "p", time: "3" },
  // ];
  useEffect(() => {
    const getbtnstate = async () => {
      setmainspinner(true);
      try {
        let temp = await contract?.ARRAYgetEmployeeActivity(
          "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        );
        setdata(temp);
        setmainspinner(false);
      } catch (error) {
        toast(error.reason);
        setmainspinner(false);
      }
    };
    getbtnstate();
  }, []);
  return (
    <>
      {mainspinner ? <Spinner /> : <></>}
      <span className="heading center" style={{ height: "6vh" }}>
        Activity
      </span>
      <div
        className="historyElements scrollbar"
        id="style-3"
        style={{ height: "40vh", overflowY: "scroll" }}
      >
        <ul className="list-group">
          {data?.map((item, index) => {
            return (
              <ActivityElement
                key={index}
                time={item[0].toNumber()}
                operation={item[1]}
                image={item[2]}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Activity;
