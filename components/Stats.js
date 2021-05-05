import React from "react";
const Stats = ({ stats }) => {
  console.log(stats);
  return (
    <div>
      <div>
        <strong>Audio</strong>
        <li>Bytes sent: {stats.stats.audio.bytesSent}</li>
        <li>Packets sent: {stats.stats.audio.packetsSent}</li>
        <li>Packets Lost: {stats.stats.audio.packetsLost}</li>
      </div>

      <div>
        <strong>Video</strong>
        <li>Bytes sent: {stats.stats.video.bytesSent}</li>
        <li>Packets sent: {stats.stats.video.packetsSent}</li>
        <li>Packets Lost: {stats.stats.video.packetsLost}</li>
      </div>
    </div>
  );
};

export default Stats;
