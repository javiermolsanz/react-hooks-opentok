import React, { Component, useState } from "react";

import { OTSubscriber } from "../../src";
import CheckBox from "./CheckBox";

// export default class Subscriber extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       error: null,
//       audio: true,
//       video: true
//     };
//   }

//   setAudio = audio => {
//     //
//   };

//   setVideo = video => {
//     //this.setState({ video });
//   };

//   onError = err => {
//     //this.setState({ error: `Failed to subscribe: ${err.message}` });
//   };

//   render() {
//     return (
//       <div>
//         {this.state.error ? <div>{this.state.error}</div> : null}
//         <OTSubscriber
//           properties={{
//             subscribeToAudio: this.state.audio,
//             subscribeToVideo: this.state.video
//           }}
//           onError={this.onError}
//           retry={true}
//           maxRetryAttempts={3}
//           retryAttemptTimeout={2000}
//         />
//         <CheckBox
//           label="Subscribe to Audio"
//           initialChecked={this.state.audio}
//           onChange={this.setAudio}
//         />
//         <CheckBox
//           label="Subscribe to Video"
//           initialChecked={this.state.video}
//           onChange={this.setVideo}
//         />
//       </div>
//     );
//   }
// }

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
