import React, { Component, useState } from "react";
import { uniqueId } from "lodash";

const RadioButtons = ({ buttons, onChange }) => {
  const [screenSharebuttonChecked, setscreenSharebuttonChecked] = useState(
    false
  );
  const [videobuttonChecked, setvideobuttonChecked] = useState(true);

  const toggleButtons = () => {
    onChange();
    setscreenSharebuttonChecked(!screenSharebuttonChecked);
    setvideobuttonChecked(!videobuttonChecked);
  };

  const renderButtons = () => {
    return buttons.map((button, index) => {
      let key = uniqueId("RadioButtons") + "_" + index + "_" + button.value;
      return (
        <div key={key}>
          <label htmlFor={key}>{button.label}</label>
          <input
            type="radio"
            checked={
              button.value === "camera"
                ? videobuttonChecked
                : screenSharebuttonChecked
            }
            id={key}
            name={uniqueId("RadioButtons")}
            value={button.value}
            onChange={toggleButtons}
          />
        </div>
      );
    });
  };

  return <div>{renderButtons()}</div>;
};

export default RadioButtons;
