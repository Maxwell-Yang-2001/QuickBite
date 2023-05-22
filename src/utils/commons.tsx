import React from "react";
import "./commons.css";

export const Button = (props: {
  onClick?: () => void;
  children: any;
  colored: boolean;
}) => {
  return (
    <div
      className={`quick-bite-button d-flex align-items-center${
        props.colored ? " quick-bite-bg" : ""
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export const HorizontalSeparator = () => (
  <hr className="horizontal-separator" />
);