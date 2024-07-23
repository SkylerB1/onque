import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { MdAddLink } from "react-icons/md";
import { TbSection } from "react-icons/tb";
import { Input } from "@material-tailwind/react";
import { FaRegCopy } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useId } from "react";
MdDelete;

import InputColor from "react-input-color";
import { FaRegClone } from "react-icons/fa6";
import parse from "html-react-parser";
import ButtonComponent from "./ButtonComponent";
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";

const ButtonSettings = () => {
  const defaultValues = {
    text: "",
    url: "",
    textColor: { hex: "#eeeeee" },
    bgColor: { hex: "#eeeeee" },
    borderColor: { hex: "#eeeeee" },
    isDisabled: false,
  };
  const [buttonItems, setButtonItems] = useState([
    {
      id: 1,
      values: defaultValues,
      content: (id, values) => (
        <ButtonComponent
          id={id}
          deleteButton={deleteButton}
          values={values}
          updateButtonValues={updateButtonValues}
        />
      ),
    },
    {
      id: 2,
      values: defaultValues,
      content: (id, values) => (
        <ButtonComponent
          id={id}
          deleteButton={deleteButton}
          values={values}
          updateButtonValues={updateButtonValues}
        />
      ),
    },
  ]);
  const [buttonCount, setButtonCount] = useState(3);

  const addButton = () => {
    setButtonItems((prev) => {
      return [
        ...prev,
        {
          id: buttonCount,
          values: defaultValues,
          content: (buttonCount, values) => (
            <ButtonComponent
              id={buttonCount}
              deleteButton={deleteButton}
              values={values}
              updateButtonValues={updateButtonValues}
            />
          ),
        },
      ];
    });
    setButtonCount((count) => count + 1);
  };
  const deleteButton = (id) => {
    setButtonItems((prev) => prev.filter((item) => item.id != id));
    setButtonCount((count) => count - 1);
  };
  const updateButtonValues = (id, identifier, value) => {
    setButtonItems((prev) =>
      prev.map((item) =>
        item.id != id
          ? item
          : { ...item, values: { ...item.values, [identifier]: value } }
      )
    );
  };
  const onSortEnd = (oldIndex, newIndex) => {
    setButtonItems((array) => arrayMove(array, oldIndex, newIndex));
  };
  useEffect(() => {
    console.log(buttonItems);
  }, [buttonItems]);

  return (
    <div>
      <div className="flex gap-2">
        <div class="w-1/2">
          <Button
            variant="outlined"
            fullWidth
            className="flex items-center gap-3"
            onClick={addButton}
          >
            <MdAddLink size={24} />
            Add Button
          </Button>
        </div>
        <div class="w-1/2">
          <Button
            fullWidth
            variant="outlined"
            className="flex items-center gap-3"
          >
            <TbSection size={24} />
            Add Section
          </Button>
        </div>
      </div>
      <div>
        <SortableList
          onSortEnd={onSortEnd}
          className="list"
          draggedItemClassName="dragged"
        >
          <div className="space-y-8 mt-5">
            {buttonItems.map((item) => (
              <SortableItem key={item}>
                <div key={item.id} className="item">
                  {item.content(item.id, item.values)}
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableList>
      </div>
    </div>
  );
};

export default ButtonSettings;
