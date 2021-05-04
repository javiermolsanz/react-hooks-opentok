import React, { Component, useState } from "react";
// import { useState } from "react";

import { OTSession, OTStreams, preloadScript } from "../../src";
import ConnectionStatus from "./ConnectionStatus";
import NetworkWarning from "./NetworkWarning";
import Publisher from "./Publisher";
import Subscriber from "./Subscriber";
import config from "../config";

const App = ({
  apiKey,
  sessionId,
  token,
  eventHandlers,
  onConnect,
  onError
}) => {
  const [isconnected, setisConnected] = useState(false);
  const [networkWarning, setNetworkwarning] = useState(false);

  eventHandlers = {
    sessionConnected: () => {
      console.log("yeyy connected");
      setisConnected(true);
    },
    sessionReconnecting: () => {
      setNetworkwarning(true);
    },
    sessionReconnected: () => {
      setNetworkwarning(false);
    },
    sessionDisconnected: e => {
      setisConnected(false);
      if (e.reason === "networkDisconnected") setNetworkwarning(true);
      //console.log("ups disconnected");
    }
  };

  // publisherEventHandlers = {
  //   accessDenied: () => {
  //     console.log("User denied access to media source");
  //   },
  //   streamCreated: () => {
  //     console.log("Publisher stream created");
  //   },
  //   streamDestroyed: ({ reason }) => {
  //     console.log(`Publisher stream destroyed because: ${reason}`);
  //   }
  // };

  onError = err => {
    console.log(err);
    setisConnected(false);
  };

  return (
    <OTSession
      apiKey={apiKey}
      sessionId={sessionId}
      token={token}
      eventHandlers={eventHandlers}
      onConnect={onConnect}
      onError={onError}
    >
      {/* {this.state.error ? <div>{this.state.error}</div> : null} */}
      <ConnectionStatus isconnected={isconnected} />
      <NetworkWarning networkWarning={networkWarning} />
      <Publisher
      //publisherEventHandlers={publisherEventHandlers}
      // onError={onError}
      // onInit={onInit}
      />
      <OTStreams>
        <Subscriber />
      </OTStreams>
    </OTSession>
  );
};

export default preloadScript(App);
