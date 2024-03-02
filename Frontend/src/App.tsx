import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Register from "./Routes/Register";
import Home from "./Routes/Home";
import { useSelector } from "react-redux";

const App: React.FC = () => {
  const backgroundColor = useSelector((state: any) => state.backgroundColor);
  const backgroundImg = useSelector((state: any) => state.backgroundImg);
  const FontFamily = useSelector((state: any) => state.fontFamily);

  let docTitle = document.title;
  window.addEventListener("blur", () => {
    document.title = "Come Back 😭";
  });

  window.addEventListener("focus", () => {
    document.title = docTitle;
  });

  return (
    <main
      className={`h-screen w-screen`}
      style={{
        background: backgroundImg && `url(${backgroundImg})`,
        backgroundColor: backgroundColor && backgroundColor,
        fontFamily: FontFamily,
        backgroundPosition: "center",
        backgroundRepeat: " no-repeat",
        backgroundSize: "cover",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
