import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import React from "react";
import PenaltyElement from "./PenaltyElement";
const Panelties = ({ contract, account, provider }) => {
  const [mainspinner, setmainspinner] = useState(false);
  const [data, setdata] = useState(null);
  useEffect(() => {
    const getbtnstate = async () => {
      setmainspinner(true);
      try {
        let temp = await contract?.ARRAYgetEmployeePenalty(
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
        Penalty
      </span>
      <div
        className="historyElements scrollbar"
        id="style-3"
        style={{ height: "40vh", overflowY: "scroll" }}
      >
        <ul className="list-group">
          {data?.map((item, index) => {
            return (
              <PenaltyElement key={index} time={item.time} operation={item.operation} />
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Panelties;
