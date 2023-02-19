import React from "react";
import HistoryElement from "./HistoryElement";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const History = ({ contract, account }) => {
  const [mainspinner, setmainspinner] = useState(false);
  const [data, setdata] = useState(null);
  useEffect(() => {
    const temp = async () => {
      setmainspinner(true);
      try {
        let temp = await contract?.ARRAYgetGlobalActivity();
        setdata(temp);
        setmainspinner(false);
      } catch (error) {
        toast(error.reason);
        setmainspinner(false);
      }
    };
    temp();
  }, []);

  return (
    <>
      {mainspinner ? <Spinner /> : <></>}
      <div className="container">
        <div className="historyElements">
          <ul className="list-group">
            {data?.map((item, index) => {
              return (
                <HistoryElement
                  key={index}
                  name={item.name}
                  time={item.time}
                  operation={item.operation}
                  image={item.image}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default History;
