/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaNetworkWired } from "react-icons/fa";
import { FcSportsMode } from "react-icons/fc";
import { IoSchoolSharp, IoSearch, IoSettingsOutline } from "react-icons/io5";
import { PiUsersFour } from "react-icons/pi";
import { RxCheckCircled } from "react-icons/rx";
import { TbBrandCodesandbox } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRegister,
  fetchRegister,
  updateRegister,
} from "../Redux/actions";

import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";
import { RiMailSendLine } from "react-icons/ri";
import { BsCoin } from "react-icons/bs";

const MiniSliderBar = ({
  setSelectItemSideBar,
  setSelectIcon,
  ShowCategoryModel,
  Change,
  change,
}: any) => {
  const dispatch = useDispatch<any>();
  const ShowSettingModel = useSelector((state: any) => state.showSettingModel);
  const ShowCompletedNote = useSelector(
    (state: any) => state.ShowCompletedNoteModel
  );

  const isSearching = useSelector((state: any) => state.IsSearching);
  const element = document.getElementById("ull");
  useEffect(() => {
    if (element) {
      element.scrollTo(0, 0);
    }
  });

  const index = decodeURIComponent(document.cookie).indexOf(",");
  const mainUser = decodeURIComponent(document.cookie).slice(0, index);
  const mainUserPass = decodeURIComponent(document.cookie).slice(index + 1);
  const Registers = useSelector((state: any) => state.Registers);
  const [ProfileImgg, setProfileImgg] = useState<any>();
  const [Score, setScore] = useState<any>(0);
  const [toEmail, setToEmail] = useState("");
  const navigate = useNavigate();
  const [isSupport, setisSupport] = useState<any>(false);

  useEffect(() => {
    dispatch(fetchRegister());
  }, [change]);
  useEffect(() => {
    dispatch(fetchRegister());
  }, []);

  useEffect(() => {
    Registers.map((data: any) => {
      if (data.username == mainUser) {
        setScore(data.score);
        if (data.profileImg) {
          setProfileImgg(
            `https://motionsbackend.liara.run/api/FileManager/downloadfile?FileName=${data.profileImg}`
          );
        } else {
          setProfileImgg("https://wallpapercave.com/dwp1x/wp9566386.jpg");
        }
      }
    });
  });

  const profileImg = async (file: any, name: any) => {
    if (file.name) {
      var form = new FormData();
      form.append("file", file);
      await axios.post(
        "https://motionsbackend.liara.run/api/FileManager/uploadfile",
        form
      );
      Registers.map(async (data: any) => {
        await Change("change");
        if (data.username == name) {
          await dispatch(
            updateRegister(data.id, {
              id: data.id,
              profileImg: file.name,
              username: mainUser,
              password: mainUserPass,
              Score: Score,
            })
          );
          await Change("change");
        }
      });
    }
  };

  function sendEmail(e: any) {
    if (toEmail) {
      e.preventDefault();
      emailjs
        .sendForm(
          "service_m6oxu9l",
          "template_r5xrsud",
          e.target,
          "g1O6SmLdVwhpzoEcc"
        )
        .then(
          (result) => {
            console.log("Email successfully sent!", result.text);
          },
          (error) => {
            console.error("Failed to send email. Error:", error.text);
          }
        );
    }
    setisSupport(false);
    setToEmail("");
  }

  return (
    <div
      className={`z-10 absolute ml-10  bg-white rounded-lg shadow w-60 dark:bg-gray-700 ${
        !ShowCategoryModel && "hidden"
      }  ${ShowCompletedNote && "hidden"}   ${ShowSettingModel && "hidden"} `}
      style={{
        zIndex: "999",
        display: ShowSettingModel || ShowCompletedNote ? "none" : "",
      }}
    >
      <div className="flex items-center  py-4 justify-center text-center">
        <TbBrandCodesandbox size={24} />
        Motions
      </div>
      <ul
        id="ull"
        className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownSearchButton"
      >
        <li>
          <div className="flex items-center ps-2 rounded ">
            <label
              htmlFor="checkbox-item-11"
              className="w-full py-1 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
            >
              <li>
                {isSearching ? (
                  <div>
                    <label
                      htmlFor="search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        onChange={(e: any) => {
                          dispatch({
                            type: "SEARCHING_TEXT",
                            payload: e.target.value,
                          });
                        }}
                        type="search"
                        id="search"
                        className="block w-full h-10 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search"
                        required
                      />
                      <span
                        onClick={() => {
                          dispatch({ type: "IS_SEARCHING", payload: false });
                        }}
                        className="absolute text-white end-2.5 bottom-2.5  w-6 h-6 text-center"
                        style={{
                          borderRadius: "50%",
                          cursor: "pointer",
                          backgroundColor: "gray",
                        }}
                      >
                        X
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{ marginLeft: "-10px" }}
                    onClick={() => {
                      dispatch({ type: "IS_SEARCHING", payload: true });
                    }}
                    className="flex items-center  rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <label
                      htmlFor="checkbox-item-11"
                      className="w-full py-1 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      <li>
                        <a
                          style={{ textDecoration: "none" }}
                          href="#"
                          className={`flex items-center  text-gray-900 rounded-lg dark:text-white   group`}
                        >
                          <IoSearch size={20} />
                          <span className="ms-3 text-lg">Search</span>
                        </a>
                      </li>
                    </label>
                  </div>
                )}
              </li>
            </label>
          </div>
        </li>
        <li
          onClick={() => {
            setSelectItemSideBar("");
            dispatch({ type: "IS_SEARCHING", payload: false });
          }}
        >
          <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <label
              htmlFor="checkbox-item-11"
              className="w-full py-1 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
            >
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="#"
                  className={`flex items-center  text-gray-900 rounded-lg dark:text-white   group`}
                >
                  <PiUsersFour size={20} />
                  <span className="ms-3 text-lg">Top Users</span>
                </a>
              </li>
            </label>
          </div>
        </li>
        <li>
          <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <label
              htmlFor="checkbox-item-11"
              className="w-full py-1 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
            >
              <li
                onClick={() => {
                  dispatch({ type: "SHOW_SETTING_MODEL", payload: true });
                  dispatch({ type: "IS_SEARCHING", payload: false });
                }}
              >
                <a
                  style={{ textDecoration: "none" }}
                  href="#"
                  className={`flex items-center  text-gray-900 rounded-lg dark:text-white   group`}
                >
                  <IoSettingsOutline size={20} />
                  <span className="ms-3 text-lg">Setting</span>
                </a>
              </li>
            </label>
          </div>
        </li>

        <li>
          <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <label
              htmlFor="checkbox-item-11"
              className="w-full py-1 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
            >
              <li
                onClick={() => {
                  dispatch({
                    type: "SHOW_COMPLETED_NOTE_MODEL",
                    payload: true,
                  });
                  dispatch({ type: "IS_SEARCHING", payload: false });
                }}
              >
                <a
                  style={{ textDecoration: "none" }}
                  href="#"
                  className={`flex items-center  text-gray-900 rounded-lg dark:text-white   group`}
                >
                  <RxCheckCircled size={20} />{" "}
                  <span className="ms-3 text-lg">Completed</span>
                </a>
              </li>
            </label>
          </div>
        </li>
        <li>
          {isSupport ? (
            <form onSubmit={sendEmail}>
              <input
                style={{ display: "none" }}
                type="text"
                value={mainUser}
                name="username"
              />
              <div className="relative">
                <input
                  value={toEmail}
                  onChange={(e) => setToEmail(e.target.value)}
                  type="search"
                  id="default-search"
                  className="block w-full py-4 pr-[2.3rem]  items-center  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="What is wrong?"
                  required
                  name="problem"
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5  focus:outline-none  font-medium rounded-lg text-sm  py-2 "
                >
                  <RiMailSendLine size={24} color="white" />
                </button>
              </div>
            </form>
          ) : (
            <div
              onClick={() => setisSupport(!isSupport)}
              className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <label
                htmlFor="checkbox-item-11"
                className="w-full py-1 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
              >
                <li>
                  <a
                    style={{ textDecoration: "none" }}
                    href="#"
                    className={`flex items-center  text-gray-900 rounded-lg dark:text-white   group`}
                  >
                    <BiSupport size={20} />{" "}
                    <span className="ms-3 text-lg">Contact support</span>
                  </a>
                </li>
              </label>
            </div>
          )}
        </li>

        <li>
          <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <label
              htmlFor="checkbox-item-11"
              className="w-full py-1 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
            >
              <li
                onClick={() => {
                  Registers.map(async (data: any) => {
                    if (data.username == mainUser) {
                      await dispatch(deleteRegister(data.id));
                      navigate("/");
                      document.cookie = `${mainUser},${mainUserPass}; expires=Thu, 18 Dec 1040 12:00:00 UTC; path=/`;
                    }
                  });
                }}
              >
                <a
                  style={{ textDecoration: "none" }}
                  href="#"
                  className={`flex items-center  text-gray-900 rounded-lg dark:text-white   group`}
                >
                  <LuLogOut size={20} color="red" />
                  <span className="ms-3 text-lg text-[red]">Logout</span>
                </a>
              </li>
            </label>
          </div>
        </li>

        <div className="mb-2 px-5 mt-2">
          <span className="mb-2">Category</span>
          <hr className="mt-2" />
        </div>
        <li>
          <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <label
              htmlFor="checkbox-item-11"
              className="w-full py-1 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
            >
              <li
                onClick={() => {
                  setSelectItemSideBar("Learning");
                  setSelectIcon(<IoSchoolSharp color="lightgreen" />);
                  dispatch({ type: "IS_SEARCHING", payload: false });
                }}
              >
                <a
                  style={{ textDecoration: "none" }}
                  href="#"
                  className={`flex items-center  text-gray-900 rounded-lg dark:text-white   group`}
                >
                  <IoSchoolSharp size={24} color="lightgreen" />
                  <span className="ms-3 text-lg">Learning</span>
                </a>
              </li>
            </label>
          </div>
        </li>
        <li>
          <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <label
              htmlFor="checkbox-item-11"
              className="w-full py-1 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
            >
              <li
                onClick={() => {
                  setSelectItemSideBar("Sports");
                  setSelectIcon(<FcSportsMode />);
                  dispatch({ type: "IS_SEARCHING", payload: false });
                }}
              >
                <a
                  style={{ textDecoration: "none" }}
                  href="#"
                  className={`flex items-center  text-gray-900 rounded-lg dark:text-white   group`}
                >
                  <FcSportsMode size={25} />{" "}
                  <span className="ms-3 text-lg">Sports</span>
                </a>
              </li>
            </label>
          </div>
        </li>
        <li>
          <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <label
              htmlFor="checkbox-item-11"
              className="w-full py-1 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
            >
              <li
                onClick={() => {
                  setSelectItemSideBar("Work");
                  setSelectIcon(<FaNetworkWired color="lightskyblue" />);
                  dispatch({ type: "IS_SEARCHING", payload: false });
                }}
              >
                <a
                  style={{ textDecoration: "none" }}
                  href="#"
                  className={`flex items-center  text-gray-900 rounded-lg dark:text-white   group`}
                >
                  <FaNetworkWired size={25} color="lightskyblue" />
                  <span className="ms-3 text-lg">Work</span>
                </a>
              </li>
            </label>
          </div>
        </li>
        <li>
          <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <label
              htmlFor="checkbox-item-11"
              className="w-full py-1 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
            >
              <li
                onClick={() => {
                  setSelectItemSideBar("Users");
                  dispatch({ type: "IS_SEARCHING", payload: false });
                  setSelectIcon(
                    <img
                      width="30"
                      height="30"
                      src="https://img.icons8.com/tiny-color/64/group.png"
                      alt="group"
                    />
                  );
                }}
              >
                <a
                  style={{ textDecoration: "none" }}
                  href="#"
                  className={`flex items-center  text-gray-900 rounded-lg dark:text-white   group`}
                >
                  <img
                    width="25"
                    height="25"
                    src="https://img.icons8.com/tiny-color/64/group.png"
                    alt="group"
                  />{" "}
                  <span className="flex-1 ms-3 text-lg whitespace-nowrap">
                    Users
                  </span>
                </a>
              </li>
            </label>
          </div>
        </li>
        <li>
          <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <label
              htmlFor="checkbox-item-11"
              className="w-full py-1 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
            >
              <li
                onClick={() => {
                  setSelectItemSideBar("Social Media");
                  dispatch({ type: "IS_SEARCHING", payload: false });
                  setSelectIcon(
                    <img
                      src="https://img.icons8.com/color/480/shopping-cart.png"
                      alt=""
                      width="37"
                      height="37"
                    />
                  );
                }}
              >
                <a
                  style={{ textDecoration: "none" }}
                  href="#"
                  className={`flex items-center  text-gray-900 rounded-lg dark:text-white   group`}
                >
                  <img
                    src="https://img.icons8.com/color/480/shopping-cart.png"
                    alt=""
                    width="27"
                    height="27"
                  />
                  <span className="flex-1 ms-3 text-lg whitespace-nowrap">
                    Social Media
                  </span>
                </a>
              </li>
            </label>
          </div>
        </li>
        <div className="mb-2 px-5 mt-2">
          <span className="mb-2">Account</span>
          <hr className="mt-2" />
        </div>

        <div className="flex gap-2  items-center  pl-6">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center  border-gray-300 border-dashed rounded-lg cursor-pointer"
          >
            <a>
              <Avatar size={40} src={<img src={ProfileImgg} alt="" />} />
            </a>

            <input
              onChange={(e) => {
                if (e.target.files) {
                  profileImg(e.target.files[0], mainUser);
                }
              }}
              id="dropzone-file"
              type="file"
              className="hidden"
            />
          </label>

          <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xl"
              style={{ textDecoration: "none" }}
            >
              {mainUser}
            </a>
            <div className="flex items-center gap-1 text-lg">
              <BsCoin color="yellow" />
              {Score}
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default MiniSliderBar;
