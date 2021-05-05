import React, { Component, useState, useEffect, useRef } from "react";

import { OTPublisher } from "../../src";
import RadioButtons from "./RadioButtons";
import CheckBox from "./CheckBox";
import Stats from "./Stats";

const Publisher = ({ eventHandlers, onError, onInit }) => {
  const [isPublishingVideo, setisPublishingVideo] = useState(true);
  const [isPublishingAudio, setisPublishingAudio] = useState(true);
  let [videosource, setSource] = useState(undefined);
  const [error, setError] = useState(null);
  //const publisher = useRef(null);
  const otPublisher = React.useRef();
  const [pub, setPublisher] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getPublisher();
  }, []);

  const getPublisher = () => {
    if (otPublisher) {
      setPublisher(otPublisher.current.getPublisher());
    }
  };

  const toggleVideo = () => {
    console.log("toggling video");
    setisPublishingVideo(!isPublishingVideo);
  };

  const toggleAudio = () => {
    console.log("toggling audio");
    setisPublishingAudio(!isPublishingAudio);
  };

  const setVideoSource = () => {
    console.log("changing video from " + videosource);
    if (videosource === undefined) setSource("screen");
    else setSource(undefined);
  };

  const getStats = () => {
    setInterval(() => {
      otPublisher.current.state.publisher.getStats((err, data) => {
        if (!err) setStats(data[0]);
      });
    }, 5000);
  };

  eventHandlers = {
    streamCreated: event => {
      console.log("Publisher stream created!");
      console.log(otPublisher);
      getStats();
    },
    streamDestroyed: event => {
      console.log("Publisher stream destroyed!");
    },
    mediaStopped: () => {
      //setisPublishingScreen(null);
    }
  };

  onError = err => {
    setError(err);
    console.log(" error: `Failed to publish: ${err.message}");
  };

  onInit = () => {
    //setPublisher(getPublisher());
    console.log("pub init");
  };

  return (
    <div>
      {error ? <div>{error}</div> : null}
      <OTPublisher
        ref={otPublisher}
        properties={{
          publishAudio: isPublishingAudio,
          //publishAudio: isAudioMuted,
          publishVideo: isPublishingVideo,
          videoSource: videosource === "screen" ? "screen" : undefined
          //videoSource: videosource
        }}
        eventHandlers={eventHandlers}
        onError={onError}
        onInit={onInit}
      />
      {stats && <Stats stats={stats}></Stats>}
      <RadioButtons
        buttons={[
          {
            label: "Camera",
            value: "camera"
          },
          {
            label: "Screen",
            value: "screen"
          }
        ]}
        // initialChecked={videosource}
        onChange={setVideoSource}
      />
      <CheckBox
        label="Publish Audio"
        initialChecked={isPublishingAudio}
        onChange={toggleAudio}
      />
      <CheckBox
        label="Publish Video"
        initialChecked={isPublishingVideo}
        onChange={toggleVideo}
      />
    </div>
  );
};

export default Publisher;
