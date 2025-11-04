import React from "react";
import { TOAST_TYPES } from "../utils/constants";

const ToastComponent = ({ type, message }) => {
  return (
    <div className="toast toast-top toast-center">
      {type === TOAST_TYPES.SUCCESS && (
        <div className="alert alert-success">
          <span>{message}</span>
        </div>
      )}
      {type === TOAST_TYPES.ERROR && (
        <div className="alert alert-error">
          <span>{message}</span>
        </div>
      )}
      {type === TOAST_TYPES.INFO && (
        <div className="alert alert-info">
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default ToastComponent;
