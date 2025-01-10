import React from "react";

export const Container = ({ children, className }) => {
  return (
    <div
      className={`my-[70px] ml-[20px] md:ml-[250px]  ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};
