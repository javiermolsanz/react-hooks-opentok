import React, { Component } from "react";

const ConnectionStatus = ({ isconnected }) => {
  //console.log(isconnected);
  // if (connected === true) {
  //   status = "Connected";
  // } else {
  //   status = "Disconnected";
  // }
  let status = isconnected ? "Connected" : "Disconnected";
  // let status = true ? "Connected" : "Disconnected";

  return (
    <div>
      <strong>Status:</strong> {status}
    </div>
  );
};

export default ConnectionStatus;
