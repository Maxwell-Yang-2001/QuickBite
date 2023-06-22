import React from "react";
import {
  CheckCircle,
  ExclamationCircle,
  ExclamationTriangle,
  InfoCircle,
  Star as StarIcon,
} from "../../assets";
import "./commons.css";
import { Toast, ToastContainer } from "react-bootstrap";

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
    <StarIcon />
  </div>
);

export type SnackBarType = "success" | "warning" | "error" | "info";

const snackBarIcon = (type: SnackBarType) => {
  switch (type) {
    case "success":
      return <CheckCircle />;
    case "warning":
      return <ExclamationTriangle />;
    case "error":
      return <ExclamationCircle />;
    case "info":
      return <InfoCircle />;
  }
};

export const SnackBar = (props: {
  show: boolean;
  setShow: (_: boolean) => void;
  type: SnackBarType;
  children: string;
}) => {
  return (
    <ToastContainer
      position="top-center"
      className="snack-bar"
    >
      <Toast
        autohide
        delay={3000}
        show={props.show}
        onClose={() => props.setShow(false)}
      >
        <Toast.Body className={`d-flex align-items-center snack-bar-body-${props.type}`}>
          {snackBarIcon(props.type)} {props.children}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
