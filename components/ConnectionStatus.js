import React, { Component } from "react";

const ConnectionStatus = ({ isconnected }) => {
  return (
    <div>
      <strong>Status:</strong> {isconnected}
    </div>
  );
};

export default ConnectionStatus;
