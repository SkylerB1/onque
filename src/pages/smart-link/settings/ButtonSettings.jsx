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
import IconItems from "./IconItems";

const ButtonSettings = () => {
  const defaultValues = {
    text: "Button text",
    url: "https://example.com",
    textColor: { hex: "#eeeeee" },
    bgColor: { hex: "#eeeeee" },
    borderColor: { hex: "#eeeeee" },
    isDisabled: false,
  };
  const defaultIcons = [
    {
      id: 1,
      iconName: "twitter",
      url: "https://twitter.com/...",
    },
    {
      id: 2,
      iconName: "facebook",
      url: "https://www.facebook.com/people/user-name",
    },
    {
      id: 3,
      iconName: "instagram",
      url: "https://instagram.com/...",
    },
    {
      id: 4,
      iconName: "linkedIn",
      url: "https://example.com",
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
    {
      id: 3,
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
      id: 4,
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
  const [buttonCount, setButtonCount] = useState(5);

  const [socialIcons, setSocialIcons] = useState(defaultIcons);
  const [socialIconsCount, setSocialIconsCount] = useState(
    defaultIcons.length + 1
  );

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
  const onSortEndIcons = (oldIndex, newIndex) => {
    setSocialIcons((array) => arrayMove(array, oldIndex, newIndex));
  };
  const addIcon = () => {
    setSocialIcons((prev) => [
      ...prev,
      {
        id: socialIconsCount,
        iconName: "twitter",
        url: "https://example.com",
      },
    ]);
    setSocialIconsCount((count) => count + 1);
  };
  const deleteIcon = (id) => {
    setSocialIcons((prev) => prev.filter((socialIcon) => socialIcon.id != id));
    setSocialIconsCount((count) => count - 1);
  };
  const updateValues = (id, values) => {
    setSocialIcons((prev) =>
      prev.map((socialIcon) => (socialIcon.id != id ? socialIcon : values))
    );
  };
  useEffect(() => {
    console.log(socialIcons);
  }, [socialIcons]);

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
          onClick={addIcon}
        >
          <MdOutlineEmojiSymbols size={24} />
          Add Icon
        </Button>
      </div>
      <div className="iconBox my-5">
        <SortableList
          onSortEnd={onSortEndIcons}
          className="list"
          draggedItemClassName="dragged"
        >
          <div className="space-y-8 mt-5">
            {socialIcons &&
              socialIcons.map((values) => (
                <SortableItem key={values.id}>
                  <div className="my-5" key={values.id}>
                    <IconItems
                      values={values}
                      deleteIcon={deleteIcon}
                      updateValues={updateValues}
                    />
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
