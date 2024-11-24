import React from "react";

export const Heading = ({ children, className }) => {
  return (
    <h1
      className={`text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] font-bold ${className || ""}`}
    >
      {children}
    </h1>
  );
};


