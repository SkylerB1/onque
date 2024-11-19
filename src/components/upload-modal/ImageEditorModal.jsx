import React, { useMemo, useRef, useState } from "react";
import { PinturaEditor } from "@pqina/react-pintura";
import { getEditorDefaults } from "@pqina/pintura";

import "@pqina/pintura/pintura.css";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { getSource } from "../../utils";
import ToasterCustomConatiner from "../ToasterCustomConatiner";

function ImgEditorModal({ show, files, setFiles, toggleModal, index }) {
  const src = getSource(files[index]);
  const editorRef = useRef();
  const MAX_SIZE = 8 * 1024 * 1024; // 8MB in bytes

  const handleFile = async () => {
    const res = await editorRef.current.editor.processImage();
    console.log(res, "erdtfgyhujikol")
    const prevFiles = [...files];
    prevFiles[index] = res?.dest;
    setFiles(prevFiles);
    toggleModal();
  }

  return (
    <Dialog size={"xl"} open={show}>
      <ToasterCustomConatiner />
      <DialogHeader>Image Editor</DialogHeader>
      <DialogBody>
        <div style={{ height: "600px" }}>
          <PinturaEditor
            ref={editorRef}
            {...getEditorDefaults()}
            src={src}
            cropSelectPresetFilter={"landscape"}
            cropSelectPresetOptions={[
              [undefined, "Custom"],
              [1, "1:1 Square Cutout"],
              [1.91 / 1, "1.91:1 Instagram Landscape"],
              [16 / 9, "16:9 Facebook Landscape"],
              [16 / 9, "16:9 Twitter Landscape"],
              [16 / 9, "16:9 LinkedIn Landscape"],
              [4 / 3, "4:3 Google Business Landscape"],
              [4 / 5, "4:5 Instagram Portrait"],
              [9 / 16, "9:16 Instagram Story"],
              [2 / 3, "2:3 Facebook Story"],
              [4 / 5, "4:5 Twitter Portrait"],
            ]}
            cropEnableRotateMatchImageAspectRatio="always"
            enableButtonExport={false}
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <div className="space-between">
          <Button onClick={toggleModal} variant="outlined">
            Decline
          </Button>
          <Button onClick={handleFile}>Upload</Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
}

export default React.memo(ImgEditorModal);