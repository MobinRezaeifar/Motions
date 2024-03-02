import React, { useEffect, useState } from "react";
import SideBar from "../Components/SideBar";
import Hero from "../Components/Hero";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import SettingModel from "../Components/SettingModel";
import ComplatedNoteModel from "../Components/ComplatedNoteModel";
import { useHotkeys } from "react-hotkeys-hook";

const Home = () => {
  const [ShowSideBar, setShowSideBar] = useState<boolean>(true);
  const [SelectItemSideBar, setSelectItemSideBar] = useState<string>("");
  const [SelectIcon, setSelectIcon] = useState<any>("");
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const updateSize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const [change, setchange] = useState<any>([]);

  const Change = async (change: any) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(`https://motionsbackend.liara.run/change`)
        .configureLogging(LogLevel.Information)
        .build();
      await connection.start();

      connection.invoke("Connect", change).catch((err) => console.error(err));

      connection.on("getChange", (chang) => {
        setchange(chang);
      });

      // setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  useHotkeys("s", () => setShowSideBar(!ShowSideBar));
  


  return (
    <div className="flex p-8 h-screen gap-7">
      <SideBar
        Change={Change}
        change={change}
        ShowSideBar={ShowSideBar}
        setShowSideBar={setShowSideBar}
        SelectItemSideBar={SelectItemSideBar}
        setSelectItemSideBar={setSelectItemSideBar}
        dimensions={dimensions}
        SelectIcon={SelectIcon}
        setSelectIcon={setSelectIcon}
      />

      <Hero
        Change={Change}
        change={change}
        ShowSideBar={ShowSideBar}
        setShowSideBar={setShowSideBar}
        SelectItemSideBar={SelectItemSideBar}
        setSelectItemSideBar={setSelectItemSideBar}
        dimensions={dimensions}
        SelectIcon={SelectIcon}
        setSelectIcon={setSelectIcon}
      />

      <SettingModel />
      <ComplatedNoteModel />
    </div>
  );
};

export default Home;
