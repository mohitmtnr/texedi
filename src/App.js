// import logo from "./logo.svg";
import React, { useState, lazy, Suspense, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import AlertState from "./states/AlertState";
import lightDarkModeContext from "./context/LightDarkModeContext";
import ToggleFullScreen from "./components/ToggleFullScreen";
import "./App.css";
import ContentLoading from "./components/ContentLoading";
const Alert = lazy(() => import("./alerts/Alert"));
const Footer = lazy(() => import("./components/Footer"));
const Texedi = lazy(() => import("./components/Texedi"));
const NavBar = lazy(() => import("./components/NavBar"));

function App() {
  // progress bar states
  const [progress, setProgress] = useState(20);

  // toggle mode dark/light
  const [mode, setMode] = useState({
    background: localStorage.getItem("background") || "dark",
    text: localStorage.getItem("text") || "light",
  });

  const [fontAwesomeClass, setFontAwesomeClass] = useState(
    localStorage.getItem("fontAwesomeClass") || "moon"
  );
  const handleToggleModeClick = () => {
    if (mode.background === "dark") {
      setMode({ background: "light", text: "dark" });
      setFontAwesomeClass("sun");
      document.body.style.backgroundColor = "#ffffff";
    } else {
      setMode({ background: "dark", text: "light" });
      setFontAwesomeClass("moon");
      document.body.style.backgroundColor = "#171a1d";
    }
  };

  useEffect(() => {
    localStorage.setItem("background", mode.background);
    localStorage.setItem("text", mode.text);
    localStorage.setItem("fontAwesomeClass", fontAwesomeClass);
    //default body background
    document.body.style.backgroundColor =
      localStorage.getItem("background") === "dark" ? "#171a1d" : "#ffffff";
  }, [mode, fontAwesomeClass]);

  return (
    <lightDarkModeContext.Provider value={mode}>
      <Suspense
        fallback={
          <div
            className={`bg-${mode.background} d-flex justify-content-center`}
            style={{
              height: "100vh",
              width: "100vw",
            }}
          >
            <ContentLoading count={1} />
          </div>
        }
      >
        <div className={`App ${mode.background} p-0`}>
          <LoadingBar color="#FF000D" waitingTime="300" progress={progress} />
          <AlertState>
            <NavBar
              ToggleFullScreen={ToggleFullScreen}
              title="TeXeDi"
              dropMenu="Know"
              handleToggleModeClick={handleToggleModeClick}
              background={mode.background}
              text={mode.text}
              fontAwesomeClass={fontAwesomeClass}
            />

            <Alert />

            <Texedi
              setProgress={setProgress}
              title="Let's jump into text editor"
              button="5"
            />

            <Footer background={mode.background} text={mode.text} />
          </AlertState>
        </div>
      </Suspense>
    </lightDarkModeContext.Provider>
  );
}

export default App;

// react loading skeleton

// <SkeletonTheme
//             baseColor={mode.background === "dark" ? "#33393E" : ""}
//             highlightColor={mode.background === "dark" ? "#7C848B" : ""}
//             duration={4}
//           >
//             <ReactLoadingSkeleton />
//           </SkeletonTheme>
