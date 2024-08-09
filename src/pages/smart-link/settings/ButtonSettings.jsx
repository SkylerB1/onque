import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { MdAddLink, MdOutlineEmojiSymbols } from "react-icons/md";
import { TbSection } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { addBtn } from '../../../redux/features/smartLinkSlice';
import { addIcons } from '../../../redux/features/smartIcons';
import ButtonComponent from "./ButtonComponent";
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";
import IconItems from "./IconItems";

const ButtonSettings = () => {
  const data = useSelector((state) => state.smartLink.value) || [];
  const iconsData = useSelector((state) => state.smartIcons.value) || [];
  const dispatch = useDispatch();

  const defaultValues = {
    text: "Button Text",
    url: "https://example.com",
    textColor: { hex: "#333333" },
    bgColor: { hex: "#007bff" },
    borderColor: { hex: "#0056b3" },
    isDisabled: false,
  };

  const defaultIcons = [
    { id: 1, iconName: "twitter", url: "https://twitter.com/..." },
    { id: 2, iconName: "facebook", url: "https://www.facebook.com/people/user-name" },
    { id: 3, iconName: "instagram", url: "https://instagram.com/..." },
    { id: 4, iconName: "linkedIn", url: "https://example.com" },
  ];

  const defaultButtons = Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    values: defaultValues,
  }));

  const [buttonCount, setButtonCount] = useState(5);
  const [socialIconsCount, setSocialIconsCount] = useState(defaultIcons.length + 1);

  useEffect(() => {
    dispatch(addBtn(defaultButtons));
    dispatch(addIcons(defaultIcons));
  }, [dispatch]);

  const addButton = () => {
    const newButton = {
      id: buttonCount,
      values: defaultValues,
    };
    dispatch(addBtn([...data, newButton]));
    setButtonCount((count) => count + 1);
  };

  const deleteButton = (id) => {
    if (id <= 4) return; // Prevent deletion of default buttons
    dispatch(addBtn(data.filter((item) => item.id !== id)));
  };

  const handleClone = (id) => {
    const cloneItem = data.find((item) => item.id === id);
    if (!cloneItem) return;

    const newButton = {
      ...cloneItem,
      id: buttonCount,
    };
    dispatch(addBtn([...data, newButton]));
    setButtonCount((count) => count + 1);
  };

  const updateButtonValues = (id, identifier, value) => {
    const updatedItems = data.map((item) =>
      item.id === id ? { ...item, values: { ...item.values, [identifier]: value } } : item
    );
    dispatch(addBtn(updatedItems));
  };

  const onSortEnd = (oldIndex, newIndex) => {
    const newItems = arrayMove(data, oldIndex, newIndex);
    dispatch(addBtn(newItems));
  };

  const onSortEndIcons = (oldIndex, newIndex) => {
    const newIcons = arrayMove(iconsData, oldIndex, newIndex);
    dispatch(addIcons(newIcons));
  };

  const addIcon = () => {
    const newIcon = {
      id: socialIconsCount,
      iconName: "twitter",
      url: "https://example.com",
    };
    dispatch(addIcons([...iconsData, newIcon]));
    setSocialIconsCount((count) => count + 1);
  };

  const deleteIcon = (id) => {
    if (id <= 4) return; // Prevent deletion of default icons
    dispatch(addIcons(iconsData.filter((icon) => icon.id !== id)));
  };

  const updateValues = (id, values) => {
    const updatedIcons = iconsData.map((icon) =>
      icon.id === id ? { ...icon, ...values } : icon
    );
    dispatch(addIcons(updatedIcons));
  };

  return (
    <div>
      <div className="flex gap-2 mt-10">
        <div className="w-1/2">
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
        <div className="w-1/2">
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
            {data.map((item) => (
              <SortableItem key={item.id}>
                <div key={item.id} className="item">
                  <ButtonComponent
                    id={item.id}
                    deleteButton={deleteButton}
                    values={item.values}
                    updateButtonValues={updateButtonValues}
                    handleClone={handleClone}
                  />
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableList>
      </div>
      <div className="my-5 border-r border border-gray-500 shadow-lg"></div>
      <div className="w-full">
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
            {Array.isArray(iconsData) && iconsData.map((values) => (
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
