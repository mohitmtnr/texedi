import React, { useContext } from "react";
import lightDarkModeContext from "../context/LightDarkModeContext";

const ContentLoading = ({ count }) => {
  const mode = useContext(lightDarkModeContext);
  const elementsArray = [];
  for (let i = 0; i < count; i++) {
    elementsArray.push(
      <span
        key={i}
        className={`suspense-loader align-self-center bg-${mode.text}`}
      ></span>
    );
  }
  return <>{elementsArray}</>;
};

export default ContentLoading;
