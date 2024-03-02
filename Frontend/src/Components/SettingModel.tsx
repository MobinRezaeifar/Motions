import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { Colorpicker } from "./Colorpicker";
import { useDispatch, useSelector } from "react-redux";
import { TreeSelect } from "antd";
import { MdClose } from "react-icons/md";
import axios from "axios";

const SettingModel = () => {
  const [Color1, setColor1] = useState<any>();
  const [Color2, setColor2] = useState<any>();
  const [Color3, setColor3] = useState<any>();
  const backgroundImg = useSelector((state: any) => state.backgroundImg);

  const dispatch = useDispatch();
  const [Fontvalue, setFontValue] = useState<string>();
  const SaveChange = () => {
    if (backgroundImg) {
      dispatch({
        type: "CHANGE_BACKGROUND_IMG",
        payload: ``,
      });
      dispatch({ type: "CHANGE_BACKGROUND_COLOR", payload: Color1 });
    } else {
      dispatch({ type: "CHANGE_BACKGROUND_COLOR", payload: Color1 });
    }
    dispatch({ type: "CHANGE_FONT_FAMILY", payload: Fontvalue });
    dispatch({ type: "CHANGE_BACKGROUNDCOLOR_SIDEBAR", payload: Color2 });
    dispatch({ type: "CHANGE_BACKGROUNDCOLOR_HERO", payload: Color3 });
  };
  const ShowSettingModel = useSelector((state: any) => state.showSettingModel);

  const onChange = (newValue: string) => {
    setFontValue(newValue);
  };
  const treeData = [
    {
      value: "",
      title: "Default",
    },
    {
      value: "monospace",
      title: "monospace",
    },
    {
      value: "sans-serif",
      title: "sans-serif",
    },
    {
      value: "serif",
      title: "serif",
    },
  ];

  const BackgroundImg = async (file: any) => {
    if (file.name) {
      dispatch({ type: "SHOW_SETTING_MODEL", payload: false });

      var form = new FormData();
      form.append("file", file);
      await axios.post(
        "https://motionsbackend.liara.run/api/FileManager/uploadfile",
        form
      );
      dispatch({
        type: "CHANGE_BACKGROUND_IMG",
        payload: `https://motionsbackend.liara.run/api/FileManager/downloadfile?FileName=${file.name}`,
      });
    }
  };

  return (
    <div
      className={`relative z-10
       ${!ShowSettingModel && "hidden"}
       `}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg mb-40 bg-gray-700  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-gray-700  px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
                  <IoSettingsOutline size={24} color="orange" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <div className="flex justify-between items-center ">
                    <h1
                      className="text-xl font-semibold leading-6 text-green-100 mt-1 mb-2 "
                      id="modal-title"
                    >
                      Setting
                    </h1>
                    <h1
                      className="cursor-pointer"
                      onClick={() =>
                        dispatch({
                          type: "SHOW_SETTING_MODEL",
                          payload: false,
                        })
                      }
                    >
                      <MdClose size={24} />
                    </h1>
                  </div>
                  <div className="mt-8 w-full justify-center items-center">
                    <h1 className="mt-2">
                      <span style={{ position: "relative", top: "-6px" }}>
                        Background Color :
                      </span>{" "}
                      <Colorpicker setColor={setColor1} defValue={"#131e29"} />
                    </h1>
                    <h1 className="mt-2">
                      <span style={{ position: "relative", top: "-6px" }}>
                        Background Color Sidebar :
                      </span>{" "}
                      <Colorpicker setColor={setColor2} defValue={"#1f2937"} />
                    </h1>
                    <h1 className="mt-2">
                      <span style={{ position: "relative", top: "-6px" }}>
                        Background Color Hero :
                      </span>{" "}
                      <Colorpicker setColor={setColor3} defValue={"#1f2937"} />
                    </h1>
                    <div className="flex mt-4">
                      <h1> Background Image : </h1>
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="small_size"
                      >
                      </label>
                      <input
                        onChange={(e) => {
                          if (e.target.files) {
                            BackgroundImg(e.target.files[0]);
                          }
                        }}
                        className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="small_size"
                        type="file"
                      />
                    </div>
                  </div>
                  <div>
                    <h1 className="flex gap-2 items-center">
                      Font :
                      <TreeSelect
                        style={{
                          outline: "none",
                          width: "86%",
                          backgroundColor: "transparent",
                        }}
                        showSearch
                        value={Fontvalue}
                        dropdownStyle={{ maxHeight: 400, maxWidth: 200 }}
                        placeholder="Font List"
                        allowClear
                        treeDefaultExpandAll
                        onChange={onChange}
                        treeData={treeData}
                      />
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-700  px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={() => {
                  SaveChange();
                  dispatch({ type: "SHOW_SETTING_MODEL", payload: false });
                }}
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
              >
                Save Change
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "SHOW_SETTING_MODEL", payload: false })
                }
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingModel;
