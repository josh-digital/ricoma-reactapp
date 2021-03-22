import React from "react";
import SectionContent from "./sectionContent";
import "./back-css.css";

export default function Banner(props) {
  // React.useEffect(() => {
  //   window.addEventListener("load", () => {
  //     var image = document.querySelector("img");
  //     var isLoaded = image.complete && image.naturalHeight !== 0;
  //     // props.setImageLoaded(true);
  //   });
  //   return () =>
  //     window.removeEventListener("load", () => console.log("loaderded"));
  // }, []);
  return (
    <div className="img-container">
      <div className="bg-img">
        <SectionContent />
      </div>
    </div>
  );
}
