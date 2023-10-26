import React, { useContext } from "react";
import AlertContext from "../context/AlertContext";

export default function Alert() {
  const { alert } = useContext(AlertContext);

  let alertSign = "";
  const findSign = () => {
    if (alert.type === "danger") {
      alertSign = "circle-xmark";
    } else if (alert.type === "warning") {
      alertSign = "triangle-exclamation";
    } else if (alert.type === "success") {
      alertSign = "circle-check";
    } else {
      alertSign = "circle-question";
    }
  };
  alert && findSign();
  return (
    alert && (
      <div
        className={`alert alert-${alert.type} alert-dismissible fade show`}
        role="alert"
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 9990,
        }}
      >
        <i className={`fa-solid fa-${alertSign}`}></i>&nbsp;&nbsp;
        <strong style={{ textTransform: "capitalize" }}>{alert.message}</strong>
      </div>
    )
  );
}

<i class="fa-regular "></i>;
<i class="fa-solid fa-circle-xmark"></i>;
