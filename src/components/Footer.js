import React from "react";
import "./Footer.css";

export default function Footer(props) {
  let lightMode;
  if (props.background === "light") {
    lightMode = {
      backgroundColor: "white",
      color: "black",
    };
  }
  return (
    <>
      <footer id="main-footer" style={lightMode}>
        <div
          className={`container ${
            props.background === "light" ? "border-top " : ""
          }`}
        >
          <div className="icons" style={lightMode}>
            <center>
              <h4 style={lightMode}>Join Us</h4>
            </center>
            <div
              className={`social-media-icons ${props.background}-mode`}
              style={lightMode}
            >
              <a
                href="https://www.facebook.com/mohit.chandra.336717/"
                title="Join us on Facebook"
                style={lightMode}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-facebook-f" style={lightMode}></i>
              </a>
              <a
                href="https://twitter.com/MOHIT11725010"
                title="Join us on Twitter"
                style={lightMode}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-twitter" style={lightMode}></i>
              </a>
              <a
                href="https://in.linkedin.com/"
                title="Join us on Linkedin"
                style={lightMode}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin-in" style={lightMode}></i>
              </a>
              <a
                href="https://www.youtube.com/@MOHIT-tn1dj"
                title="Join us on Youtube"
                style={lightMode}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-youtube" style={lightMode}></i>
              </a>
              <a
                href="https://www.instagram.com/mohit.206054"
                title="Join us on Instagram"
                style={lightMode}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-instagram" style={lightMode}></i>
              </a>
            </div>
          </div>
          <div id="footer-elements" className={`${props.background}-mode`}>
            <a href="tel:8368710101" target="_blank" rel="noopener noreferrer">
              Call Us
            </a>
            <a
              href="https://wa.me/+918368710101"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
          </div>
          <p className="" style={lightMode}>
            <small>Copyright &copy;2023. All rights reserved.</small>
          </p>
        </div>
      </footer>
    </>
  );
}
