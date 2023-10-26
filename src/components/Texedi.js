import React, { useState, useEffect, useContext } from "react";
import lightDarkModeContext from "../context/LightDarkModeContext";
import AlertContext from "../context/AlertContext";
import "./Texedi.css";
import jsPDF from "jspdf";
export default function Texedi(props) {
  //States
  const [copyStatus, setCopyStatus] = useState("Copy");
  const [preview, setPreview] = useState("");
  const [buttonText, updateText] = useState("UPPER CASE");
  const [downloading, setDownloading] = useState("");
  const [text, setText] = useState("");
  const mode = useContext(lightDarkModeContext);
  const { showAlert } = useContext(AlertContext);
  const { setProgress } = props;

  //use effect
  useEffect(() => {
    document.title = "TeXeDi";
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 20);
  }, [setProgress]);

  //word counter variable
  let wordCount = 0;

  // changing textarea value on typing
  const handleChange = (event) => {
    setText(event.target.value);
  };

  //upper and lower case
  function handleCaseclick() {
    if (wordCount === 0) {
      showAlert("warning", " please enter text in the text box");
      return 0;
    }
    if (buttonText === "UPPER CASE") {
      const handleUpClick = () => {
        const newText = text.toUpperCase();
        setText(newText);
        updateText("lower case ");
        showAlert("success", "converted to upper case");
      };
      handleUpClick();
    } else {
      const handleLoClick = () => {
        const newText = text.toLowerCase();
        setText(newText);
        updateText("UPPER CASE");
        showAlert("success", "converted to lower case");
      };
      handleLoClick();
    }
  }

  //paragraph style
  const handleParagraphStyleClick = () => {
    if (wordCount === 0) {
      showAlert("warning", " please enter text in the text box");
      return 0;
    }
    const regex = /\./g;
    let fullStopCount = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      fullStopCount.push(match.index);
    }
    let i = 0,
      j = 0;
    let newText = "";
    while (i < text.length) {
      if (i === fullStopCount[j] + 2) {
        newText += text.charAt(i).toUpperCase();
        j++;
      } else {
        if (i === 0) {
          newText += text.charAt(i).toUpperCase();
        } else {
          newText += text.charAt(i).toLowerCase();
        }
      }
      i++;
    }
    setText(newText);
    showAlert("success", "paragraph style applied");
  };

  //alternate upper lower case style
  const handleStyleclick = () => {
    if (wordCount === 0) {
      showAlert("warning", " please enter text in the text box");
      return 0;
    }
    let i = 0;
    let newText = "";
    while (i < text.length) {
      if (i % 2 === 0) {
        newText += text.charAt(i).toUpperCase();
      } else {
        newText += text.charAt(i).toLowerCase();
      }
      i++;
    }
    setText(newText);
    showAlert("success", " style applied");
  };

  //preview
  const handlePreviewClick = () => {
    let i = 0;
    const regex = /\n/g;
    let newText = text.split(regex);
    while (i < newText.length) {
      newText[i] += "\n";
      i++;
    }
    setPreview(newText);
    showAlert("success", " preview created below");
  };

  //remove extra spaces
  const handleRemoveExtraSpacesClick = () => {
    if (wordCount === 0) {
      showAlert("warning", " please enter text in the text box");
      return 0;
    }
    let newText = text.split(/[ ]+/);
    newText = newText.join(" ");
    setText(newText);
    showAlert("success", " extra spaces removed");
  };

  //copy
  const defaultCopyStatus = () => {
    setCopyStatus("Copy");
  };
  const handleCopyClick = async () => {
    if (wordCount === 0) {
      showAlert("warning", " please enter text in the text box");
      return 0;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("Coppied");
      setTimeout(defaultCopyStatus, 2000);
      showAlert("success", " text coppied to clipboard");
    } catch (error) {
      setCopyStatus("Trying");
      copyTextToClipboard(text);
    }
  };

  // copy function for mobile
  function copyTextToClipboard(text) {
    let input = document.createElement("input");
    input.setAttribute("value", text);
    document.body.appendChild(input);
    input.select();
    let result = document.execCommand("copy");
    document.body.removeChild(input);
    if (result) {
      setCopyStatus("Coppied");
      setTimeout(defaultCopyStatus, 2000);
      showAlert("success", " text coppied to clipboard");
    } else {
      setCopyStatus("failed");
      setTimeout(defaultCopyStatus, 2000);
      showAlert("danger", " failed to copy text");
    }
  }

  //dowload pdf file of textarea content
  const handleDownloadClick = () => {
    if (wordCount === 0) {
      showAlert("warning", " please enter text in the text box");
      return 0;
    }

    if (downloading === "fa-fade") {
      showAlert("warning", "Downloading already in progress");
      return 0;
    }
    let response = window.confirm(
      "Would you like to download the text in pdf format?"
    );

    if (response === true) {
      try {
        setDownloading("fa-fade");
        const pdf = new jsPDF();
        const textLines = pdf.splitTextToSize(text, 190);
        const pageHeight = pdf.internal.pageSize.height;
        let cursorY = 10;
        textLines.forEach((line, index) => {
          if (cursorY + 10 > pageHeight) {
            pdf.addPage();
            cursorY = 10;
          }
          pdf.text(line, 10, cursorY);
          cursorY += 10;
        });
        pdf.save("texedi.pdf");
        setTimeout(() => {
          setDownloading("");
        }, 2000);
      } catch {
        showAlert("danger", "download failed");
        setDownloading("");
      }
    } else {
      setDownloading("");
    }
  };

  //clear the textarea content
  const handleClearClick = () => {
    setText("");
  };

  //word counter function
  const countWords = (text) => {
    let pattern = /\s+/;
    if (text.length === 0 || /^\s*$/.test(text)) {
      wordCount = 0;
      return wordCount;
    } else {
      wordCount = text.trim().split(pattern).length;
      return wordCount;
    }
  };

  return (
    <>
      <div
        className={`container rounded bg-${mode.background} my-5 customize-width`}
      >
        <div className="mb-3 mt-3">
          <label
            htmlFor="texedi-text-area"
            className={`form-label fw-bold fs-3 my-3 text-${mode.text}`}
          >
            {props.title}
          </label>

          <textarea
            className={`form-control input-${mode.background} my-2`}
            id="texedi-text-area"
            rows="10"
            placeholder="Enter your text here"
            value={text}
            onChange={handleChange}
            autoFocus
          ></textarea>
          <div className="px-2">
            <button
              type="button"
              className="btn btn-success  mx-1"
              style={{ width: "8em" }}
              onClick={handleCaseclick}
            >
              {buttonText}
            </button>
            <button
              type="button"
              className="btn btn-success  mx-1 my-1"
              onClick={handleParagraphStyleClick}
            >
              Paragraph Style
            </button>
            <button
              type="button"
              className="btn btn-success mx-1 my-1"
              onClick={handleStyleclick}
            >
              StYlE tExT
            </button>
            <button
              type="button"
              className="btn btn-success mx-1 my-1"
              onClick={handleRemoveExtraSpacesClick}
            >
              Remove Extra Spaces
            </button>
            <button
              type="button"
              className="btn btn-success mx-1 my-1"
              style={{ width: "6em" }}
              onClick={handleCopyClick}
            >
              {copyStatus}
            </button>
            <button
              type="button"
              id="download-pdf"
              className="btn btn-success mx-1 my-1"
              style={{ width: "6em" }}
              onClick={handleDownloadClick}
            >
              <i
                title="download text in pdf format"
                className={`fa-solid fa-download ${downloading}`}
              ></i>
            </button>
            <button
              type="button"
              className="btn mx-1 btn-danger my-1"
              onClick={handleClearClick}
            >
              Clear
            </button>
            <button
              type="button"
              className="btn m-purple mx-1 my-1"
              onClick={handlePreviewClick}
            >
              Preview
            </button>
          </div>
          <div className={`container my-3 text-${mode.text}`}>
            <h4>Text Summary</h4>
            <p className="px-2 pb-3">
              Characters : {text.length} <br />
              Words : {countWords(text)}
            </p>
          </div>
        </div>
      </div>
      <div
        className={`preview container rounded bg-${mode.background} text-${mode.text} my-5 py-5 customize-width text-center`}
      >
        <h3>Preview</h3>
        <div className="d-flex justify-content-center">
          <p
            className={`rounded ${mode.background} p-3 `}
            style={{ whiteSpace: "pre-line", width: "96%" }}
          >
            {preview}
          </p>
        </div>
      </div>
    </>
  );
}
