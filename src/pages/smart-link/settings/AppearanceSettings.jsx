import React, { useEffect, useState } from "react";
import { Button, Textarea } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import InputColor from "react-input-color";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";

const AppearanceSettings = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [color, setColor] = useState("#000000");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  console.log(image, "image", color, "color", title, "title", description, "description")

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Clear uploaded image
  const handleImageClear = () => {
    setImage(null);
  };

  // Handle title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle description change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handle color change
  const handleColorChange = (identifier, value) => {
    switch (identifier) {
      case "color":
        setColor(value.hex);
        break;
      default:
        console.error(`No handler for ${identifier} color change`);
    }
  };

  // Generate image from the first letter of the title
  const generateLogoFromTitle = () => {
    if (!title) return;
    const firstLetter = title.charAt(0).toUpperCase();

    // Create a canvas to generate an image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const fontSize = 50;

    // Set canvas size
    canvas.width = 100;
    canvas.height = 100;

    // Set background color and text properties
    ctx.fillStyle = color; // Set the background color from state
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the color
    ctx.font = `${fontSize}px Arial`; // Set font style
    ctx.fillStyle = "#ffffff"; // Set the text color
    ctx.textAlign = "center"; // Align text to the center
    ctx.textBaseline = "middle"; // Align text to the middle

    // Draw the first letter of the title
    ctx.fillText(firstLetter, canvas.width / 2, canvas.height / 2);

    // Create an image from the canvas
    const logoImage = canvas.toDataURL("image/png");
    setImage(logoImage); // Set the generated image as the logo
  };

  useEffect(()=> {
    const newData = {
      image: image,
      color: color,
      title: title,
      description: description
    }
    // dispatch({addAppearance
  })

  return (
    <div className="">
      <div className="mb-6">
        <div>
          <h1 className="text-base font-bold text-[#374151]">Header</h1>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="mb-4 mt-5">
        <div className="mt-2 flex items-center gap-3">
          {image ? (
            <div className="relative">
              <img
                src={image}
                alt="Uploaded Preview"
                className="w-20 h-16 object-cover rounded-sm"
              />
              <button
                type="button"
                onClick={handleImageClear}
                className="mt-2 text-xs font-bold text-red-600 hover:underline absolute z-10 bottom-12 left-16 bg-[#FFFFFF] p-0"
              >
                {/* Remove Image */}
                <IoClose size={20} />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dotted border-gray-300 p-4 text-center text-gray-400 w-20">
              <label htmlFor="file-upload" className="cursor-pointer">
                <svg
                  className="mx-auto mb-2 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                </svg>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          )}
          <div>
            <button
              type="button"
              onClick={generateLogoFromTitle} // Generate logo when clicked
              className="px-5 py-1 text-black bg-[#e8e8e9] border border-gray-300 text-[10px] font-semibold"
            >
              Use Brand Logo
            </button>
          </div>
        </div>

        {/* Title Input */}
        <div className="mt-4">
          <Input
            label="Title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        {/* Description Input */}
        <div className="mt-4">
          <Textarea
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>

        {/* Text Color Input */}
        <div className="mt-4 flex items-center gap-3 w-[140px] bg-[#e8e8e9] p-1 rounded-md">
          <InputColor
            initialValue={color}
            onChange={(value) => handleColorChange("color", value)}
          />
          <label className="text-[12px] font-normal text-gray-900">
            Text Color
          </label>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
