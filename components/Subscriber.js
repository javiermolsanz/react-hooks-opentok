import React, { Component, useState } from "react";

import { OTSubscriber } from "../../src";
import CheckBox from "./CheckBox";

const Subscriber = ({ onError }) => {
  const [isSubscribingVideo, setisSubscribingVideo] = useState(true);
  const [isSubscribingAudio, setisSubscribingAudio] = useState(true);
  const [error, setError] = useState(null);

  const setAudio = () => {
    setisSubscribingAudio(!isSubscribingAudio);
  };

  const setVideo = () => {
    //this.setState({ video });
    setisSubscribingVideo(!isSubscribingVideo);
  };

  onError = err => {
    setError(err);
    //this.setState({ error: `Failed to subscribe: ${err.message}` });
  };

  return (
    <div>
      {error ? <div>{error}</div> : null}
      <OTSubscriber
        properties={{
          subscribeToAudio: isSubscribingAudio,
          subscribeToVideo: isSubscribingVideo
        }}
        onError={onError}
        retry={true}
        maxRetryAttempts={3}
        retryAttemptTimeout={2000}
      />
      <CheckBox
        label="Subscribe to Audio"
        initialChecked={isSubscribingAudio}
        onChange={setAudio}
      />
      <CheckBox
        label="Subscribe to Video"
        initialChecked={isSubscribingVideo}
        onChange={setVideo}
      />
    </div>
  );
};

export default Subscriber;
