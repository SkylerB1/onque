import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { MdAddLink } from "react-icons/md";
import { TbSection } from "react-icons/tb";
import { Input } from "@material-tailwind/react";
import { FaRegCopy } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useId } from "react";
import { MdOutlineEmojiSymbols } from "react-icons/md";

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
  const defaultIcons = [
    {
      id: 1,
      iconName: "",
      iconImage: "",
      url: "",
    },
  ];
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
          handleClone={handleClone}
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
          handleClone={handleClone}
        />
      ),
    },
  ]);
  const [buttonCount, setButtonCount] = useState(3);

  const [socialIcons, setSocialIcons] = useState();

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
              handleClone={handleClone}
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
  const handleClone = (id) => {
    console.log(buttonItems[id - 1]);
    setButtonItems((prev) => {
      let slice1 = prev.slice(0, id);
      let cloneItem = prev[id - 1];
      let slice2 = prev.slice(id);
      let newItems = [
        ...slice1,
        { ...cloneItem, id: cloneItem.id + 1 },
        ...slice2.map((item) => ({ ...item, id: item.id + 1 })),
      ];

      return newItems;
    });

    setButtonCount((count) => count + 1);
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
    // console.log(buttonItems);
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
              <SortableItem key={item.id}>
                <div key={item.id} className="item">
                  {item.content(item.id, item.values)}
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableList>
      </div>
      <div className="my-5 border-r border border-gray-500 shadow-lg"></div>
      <div class="w-full">
        <Button
          fullWidth
          variant="outlined"
          className="flex items-center justify-center gap-3"
        >
          <MdOutlineEmojiSymbols size={24} />
          Add Icon
        </Button>
      </div>
      <div className="iconBox"></div>
    </div>
  );
};

export default ButtonSettings;
