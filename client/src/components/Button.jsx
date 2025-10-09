import React from "react";

const Button = ({ iconUrl, children, btnBg = "bg-white", btnColor = "text-white", hoverBg = "bg-gray-800", hoverText = "text-white", btnTextColor = "text-gray-500", onclick }) => {
  return (
    <button
      className={`w-full flex items-center justify-center gap-x-3 mx-auto px-5 py-3 border-1 rounded-lg ${btnTextColor} ${btnBg} ${btnColor} font-medium uppercase cursor-pointer hover:${hoverBg} hover:${hoverText} disabled:opacity-80`}
      onClick={onclick}
    >
      {iconUrl && <img className="w-5" src={iconUrl} />}
      {children}
    </button>
  );
};

export default Button;
