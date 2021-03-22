import React, { useState } from "react";
import Timer from "./Components/timer/index";
import Banner from "./Components/main-content/banner";
import Products from "./Components/Products/index";
import NavBar from "./Components/NavBar/index";
import Footer from "./Components/Footer";
import "./App.css";

function App() {
  const [showTimer, setShowTimer] = useState(true);

  const handleHideTimer = () => {
    setShowTimer(false);
  };
  return (
    <div>
      {showTimer && <Timer handleHideTimer={handleHideTimer} />}
      <NavBar />
      <Banner />
      <Products />
      <Footer />
    </div>
  );
}

export default App;
