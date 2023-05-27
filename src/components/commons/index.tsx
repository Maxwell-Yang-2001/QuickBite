import React from "react";
import star from "../../assets/star.svg";
import "./commons.css";

export const QuickBgButton = (props: {
  onClick?: () => void;
  children: any;
  colored: boolean;
  className?: string;
}) => {
  return (
    <div
      className={`quick-bite-button d-flex align-items-center${
        props.colored ? " quick-bite-bg" : ""
      }${props.className ? ` ${props.className}` : " "}`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export const HorizontalSeparator = (props: { verticallySpaced: boolean }) => (
  <hr
    className={`horizontal-separator${
      props.verticallySpaced ? " vertically-spaced" : ""
    }`}
  />
);

export const Spinner = () => (
  <div className="spinner-border quick-bite-spinner" role="status"></div>
);

export const Star = (props: { star: number }) => (
  <div className="star d-inline-flex align-items-center">
    <span>{props.star.toFixed(1)}</span>
    <img src={star} alt={"star"} />
  </div>
);
