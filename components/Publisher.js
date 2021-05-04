import React, { Component, useState, useEffect } from "react";

import { OTPublisher } from "../../src";
import RadioButtons from "./RadioButtons";
import CheckBox from "./CheckBox";

const Publisher = ({ properties, eventHandlers, onError, onInit }) => {
  let state = {
    error: null,
    videoSource: "camera",
    publisher: null
  };

  const [isPublishingVideo, setisPublishingVideo] = useState(true);
  const [isPublishingAudio, setisPublishingAudio] = useState(true);
  let [videosource, setSource] = useState(undefined);

  // useEffect(() => {
  //   publisher = getPublisher();
  // }, []);

  // const setVideo = () => {
  //   // state.video = !state.video;
  //   isPublishingVideo(!state.video);
  //   state.video = !state.video;
  //   console.log(state.video + " video");
  //   //console.log(state);
  //   //publisher.publishVideo(!state.video);
  //   //pub.publishVideo(!state.video);
  // };

  const toggleVideo = () => {
    console.log("toggling video");
    setisPublishingVideo(!isPublishingVideo);
  };

  const toggleAudio = () => {
    console.log("toggling audio");
    setisPublishingAudio(!isPublishingAudio);
  };

  // setVideo = video => {
  //   state.video = video;
  // };

  const setVideoSource = () => {
    console.log("changing video from " + videosource);
    if (videosource === undefined) setSource("screen");
    else setSource(undefined);
    //videosource = "camera" ? setSource("screen") : null;
    //state.videoSource = videoSource;
  };

  eventHandlers = {
    streamCreated: event => {
      console.log("Publisher stream created!");
    },
    streamDestroyed: event => {
      console.log("Publisher stream destroyed!");
    }
  };

  onError = err => {
    console.log(" error: `Failed to publish: ${err.message}");
  };
  onInit = () => {
    console.log("pub init");
  };

  return (
    <div>
      {state.error ? <div>{state.error}</div> : null}
      <OTPublisher
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
