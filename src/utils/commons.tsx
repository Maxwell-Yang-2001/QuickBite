import React from "react";
import star from "../assets/star.svg";
import "./commons.css";

export const QuickBgButton = (props: {
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

export const Spinner = () => (
  <div className="spinner-border quick-bite-spinner" role="status"></div>
);

export const Star = (props: { star: number }) => (
  <div className="star d-inline-flex align-items-center">
    <span>{props.star.toFixed(1)}</span>
    <img src={star} alt={"star"} />
  </div>
)