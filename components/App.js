import React, { Component, useState, useEffect } from "react";
// import { useState } from "react";

import { OTSession, OTStreams, preloadScript } from "../../src";
import ConnectionStatus from "./ConnectionStatus";
import NetworkWarning from "./NetworkWarning";
import Publisher from "./Publisher";
import Subscriber from "./Subscriber";
import config from "../config";

//am I destructuring below what's coming from preloadScriptm and OTSession

//COULD i just reference the library on the index.html file and then in the App component useEffect to retrieve apikey, sessionId and token?
const App = ({ eventHandlers, onConnect, onError }) => {
  const [isconnected, setisConnected] = useState("connecting");
  const [networkWarning, setNetworkwarning] = useState(null);
  const [creds, setCreds] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (config.SERVER_URL != "") {
      fetch(config.SERVER_URL + "/session")
        .then(res => {
          return res.json();
        })
        .then(json => {
          setisLoading(false);
          setCreds(json);
        })
        .catch(function catchErr(error) {
          handleError(error);
          alert(
            "Failed to get opentok sessionId and token. Make sure you have updated the config.js file."
          );
        });
      return;
    }
    setisLoading(false);
    setCreds({
      apiKey: config.API_KEY,
      sessionId: config.SESSION_ID,
      token: config.TOKEN
    });
  }, []);

  eventHandlers = {
    sessionConnected: () => {
      console.log("yeyy connected");
      setisConnected("connected");
    },
    sessionReconnecting: () => {
      setNetworkwarning("warning");
      setisConnected("reconnecting");
    },
    sessionReconnected: () => {
      setNetworkwarning(false);
      setisConnected("connected");
    },
    sessionDisconnected: e => {
      setisConnected("disconnected");
      if (e.reason === "networkDisconnected") setNetworkwarning("error");
    }
  };

  onError = err => {
    console.log(err);
    setError(true);
    setisConnected(false);
  };
  if (error) return <div>error</div>;
  if (isLoading) return <div> Loading creds</div>;
  return (
    creds && (
      <OTSession
        apiKey={creds.apiKey}
        sessionId={creds.sessionId}
        token={creds.token}
        eventHandlers={eventHandlers}
        onConnect={onConnect}
        onError={onError}
      >
        <ConnectionStatus isconnected={isconnected} />
        <NetworkWarning
          networkWarning={networkWarning}
          setisConnected={setisConnected}
        />
        <Publisher />
        <OTStreams>
          <Subscriber />
        </OTStreams>
      </OTSession>
    )
  );
};

export default preloadScript(App);
