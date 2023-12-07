import "./NavBar.css";
import React from "react";

//top horizontal nav-bar for all pages
export default function NavBar(props) {
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-${props.background} bg-${props.background} sticky-top mx-0`}
        style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
        onDoubleClick={props.ToggleFullScreen}
      >
        <div className="container-fluid text-center">
          <h1
            className={`navbar-brand text-${props.text} m-0`}
            style={{ fontWeight: "800" }}
          >
            <a
              href="/"
              style={{ textDecoration: "none" }}
              className={`text-${props.text}`}
            >
              {" "}
              {props.title}
            </a>
          </h1>

          <button
            type="button"
            className={`btn btn-${props.background} mx-2`}
            id="nav-modes"
            onClick={props.handleToggleModeClick}
          >
            <i
              style={{ fontSize: "1.5em" }}
              className={`fa-solid fa-${props.fontAwesomeClass}`}
            ></i>
          </button>
        </div>
      </nav>
    </>
  );
}
