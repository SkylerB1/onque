import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React from "react";
import ToasterCustomConatiner from "../ToasterCustomConatiner";

function TextGeneratorModal({ open, toggleModal }) {
  return (
    <Dialog open={open}>
      <ToasterCustomConatiner />
      <DialogHeader>AI Text Generator</DialogHeader>
      <DialogBody>
        <div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              What do you want to write about?
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="outlined" onClick={toggleModal} color="gray">
          <p>Cancel</p>
        </Button>
        <Button className="ml-2" onClick={toggleModal}>
          Generate
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default TextGeneratorModal;
