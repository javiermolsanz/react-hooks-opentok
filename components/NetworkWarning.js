import React, { Component } from "react";

const NetworkWarning = ({ networkWarning }) => {
  if (networkWarning === "error") {
    return <div>Your network connection terminated the session</div>;
  }
  return (
    networkWarning && (
      <div>We're trying to reconnect you. Check your network connection</div>
    )
  );
};

export default NetworkWarning;
