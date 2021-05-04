import React, { Component } from "react";

const NetworkWarning = ({ networkWarning }) => {
  return (
    networkWarning && <div>Your network connection terminated the session</div>
  );
};

export default NetworkWarning;
