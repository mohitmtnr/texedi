import React, { useEffect } from "react";

export default function AboutUs(props) {
  const { setProgress } = props;
  useEffect(() => {
    document.title = "About us";

    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 20);
  }, [setProgress]);
  return (
    <>
      <div className="container m-5  text-light"></div>
    </>
  );
}
