import React, { useState } from "react";
import AlertContext from "../context/AlertContext";
const AlertState = (props) => {
  // alert messages
  const [alert, setAlert] = useState(null);
  const showAlert = (typ, msg) => {
    setAlert({
      type: typ,
      message: msg,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
