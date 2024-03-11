import React, { useState } from "react";
import { PinturaEditor } from "@pqina/react-pintura";
import { getEditorDefaults } from "@pqina/pintura";

import "@pqina/pintura/pintura.css";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";

function ImgEditorModal({ show, files, toggleModal, index }) {
  return (
    <Dialog size={"xl"} open={show}>
      <DialogHeader>Image Editor</DialogHeader>
      <DialogBody>
        <div style={{ height: "600px" }}>
          <PinturaEditor
            {...getEditorDefaults()}
            src={files[index]}
            cropSelectPresetFilter={"landscape"}
            cropSelectPresetOptions={[
              [undefined, "Custom"],
              [1, "1:1"],

              // shown when cropSelectPresetFilter is set to 'landscape'
              [2 / 1, "2:1"],
              [3 / 2, "3:2"],
              [4 / 3, "4:3"],
              [16 / 10, "16:10"],
              [16 / 9, "16:9"],

              // shown when cropSelectPresetFilter is set to 'portrait'
              [1 / 2, "1:2"],
              [2 / 3, "2:3"],
              [3 / 4, "3:4"],
              [10 / 16, "10:16"],
              [9 / 16, "9:16"],
            ]}
            onProcess={(res) => console.log(res)}
          />
          {/* {inlineResult && <video s alt="" />} */}
        </div>
      </DialogBody>
      <DialogFooter>
        <div className="space-between">
          <Button onClick={toggleModal} variant="outlined">
            Decline
          </Button>
          <Button onClick={toggleModal}>Upload</Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
}

export default React.memo(ImgEditorModal);
