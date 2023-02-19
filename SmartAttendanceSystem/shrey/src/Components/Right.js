import React from "react";
import Activity from "./Activity.js";
import Panelties from "./Panelties.js";

const Right = ({ contract, account, provider }) => {
  return (
    <div style={{ paddingRight: "10px" }}>
      <div className="upper" style={{ height: "46vh", overflowY: "hidden" }}>
        <Activity account={account} provider={provider} contract={contract} />
      </div>
      <div className="lower" style={{ height: "46vh", overflowY: "hidden" }}>
        <Panelties account={account} provider={provider} contract={contract} />
      </div>
    </div>
  );
};

export default Right;
