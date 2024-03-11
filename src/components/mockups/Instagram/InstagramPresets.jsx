import InputComponent from "../../Input/InputComponent";
import Accordion from "../../accordion/Accordion";
import Instagram from "../../../assets/instagram.svg?react";
import React, { useState } from "react";

function InstagramPresets() {
  const [open, setOpen] = useState(false);

  const toggleAccordion = () => {
    setOpen(!open);
  };
  return (
    <div className="my-2">
      <Accordion
        open={open}
        onClick={toggleAccordion}
        icon={<Instagram width={18} height={18} />}
        title={"Instagram presets"}
      >
        <div className="flex flex-row justify-evenly">
          <InputComponent
            inputType={"switch"}
            label={"Show Reel on feed"}
            onChange={(text) => console.log(text)}
          />
        </div>
      </Accordion>
    </div>
  );
}

export default InstagramPresets;
