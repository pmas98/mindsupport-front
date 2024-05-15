import React, { useState } from "react";

const ColorPicker = () => {
  const colors = [
    "bg-red-400",
    "bg-orange-400",
    "bg-amber-400",
    "bg-lime-400",
    "bg-cyan-300",
    "bg-slate-400",
    "bg-purple-400",
  ];
  const [selectedColor, setSelectedColor] = useState("bg-red-400");

  return (
    <div>
      <div className="flex justify-center mb-4">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`${color} w-8 h-8 rounded-full mx-1 cursor-pointer ${
              color === selectedColor ? `${color} border-gray-800` : ""
            }`}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
      <div
        className={`${selectedColor} ml-12 w-32 h-32 md:w-48 md:h-48 rounded-full flex items-center justify-center mb-4`}
      ></div>
      <button className="ml-24 bg-white text-grey-300 border border-grey-300 rounded-md px-4 py-2 fontPrimary-bold">
        Salvar Cor
      </button>
    </div>
  );
};

export default ColorPicker;
