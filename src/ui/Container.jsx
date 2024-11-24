import React from "react";

export const Container = ({ children, className }) => {
  return (
    <div
      className={`my-[70px] mx-[20px] md:mx-[30px] md:my-[80px] lg:mx-[40px] xl:mx-[50px] ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};
