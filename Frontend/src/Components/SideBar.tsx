/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useEffect, useRef, useState } from "react";
import { TbBrandCodesandbox } from "react-icons/tb";
import { MdUpdate } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { MdApartment } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoSchoolSharp } from "react-icons/io5";
import { FcSportsMode } from "react-icons/fc";
import { FaNetworkWired } from "react-icons/fa";
import { BsCoin } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteListNote,
  deleteRegister,
  fetchRegister,
  updateRegister,
} from "../Redux/actions";
import axios from "axios";
import { Avatar, Input } from "antd";
import type { DropdownProps, MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { FaUserCircle } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";
import { RxCheckCircled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { PiUsersFour } from "react-icons/pi";
import { useHotkeys } from "react-hotkeys-hook";
import emailjs from "@emailjs/browser";
import { RiMailSendLine } from "react-icons/ri";

const index = decodeURIComponent(document.cookie).indexOf(",");
const mainUser = decodeURIComponent(document.cookie).slice(0, index);
const mainUserPass = decodeURIComponent(document.cookie).slice(index + 1);

interface Props {
  ShowSideBar: boolean;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  SelectItemSideBar: string;
  setSelectItemSideBar: React.Dispatch<React.SetStateAction<string>>;
  dimensions: any;
  SelectIcon: any;
  setSelectIcon: React.Dispatch<any>;
  change: any;
  Change: any;
}

const SideBar: React.FC<Props> = ({
  ShowSideBar,
  setShowSideBar,
  SelectItemSideBar,
  setSelectItemSideBar,
  dimensions,
  SelectIcon,
  setSelectIcon,
  change,
  Change,
}) => {
  const index = decodeURIComponent(document.cookie).indexOf(",");
  const mainUser = decodeURIComponent(document.cookie).slice(0, index);
  const mainUserPass = decodeURIComponent(document.cookie).slice(index + 1);
  const [ProfileImgg, setProfileImgg] = useState<any>();
  const dispatch = useDispatch<any>();
  const [Score, setScore] = useState<any>(0);
  const Registers = useSelector((state: any) => state.Registers);
  const ListNotes = useSelector((state: any) => state.ListNotes);
  const navigate = useNavigate();
  const [isSupport, setisSupport] = useState<any>(false);
  const backgroundColorSidebar = useSelector(
    (state: any) => state.backgroundColorSidebar
  );

  const [toEmail, setToEmail] = useState("");

  const isSearching = useSelector((state: any) => state.IsSearching);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
          className="flex items-center gap-2 text-xl"
        >
          <FaUserCircle /> {mainUser}
        </a>
      ),
    },
    {
      key: "2",
      label: !isSupport ? (
        <a
          onClick={() => setisSupport(true)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[15px]"
        >
          <BiSupport /> Contact support
        </a>
      ) : (
        <form onSubmit={sendEmail} className="flex items-center">
          <input
            style={{ display: "none" }}
            type="text"
            value={mainUser}
            name="username"
          />
          <input
            style={{ color: "#393939", paddingRight: "40px" }}
            type="text"
            placeholder="What is wrong?"
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
            required
            name="problem"
          />

          <button className="absolute right-5" type="submit">
            <RiMailSendLine size={24} color="black" />
          </button>
        </form>
      ),
    },
    {
      key: "3",
      danger: true,
      label: (
        <a
          onClick={async () => {
            await ListNotes.map(async (data: any) => {
              if (data.owner == mainUser) {
                await dispatch(deleteListNote(data.id));
              }
            });
            await Registers.map(async (data: any) => {
              if (data.username == mainUser) {
                await dispatch(deleteRegister(data.id));
                navigate("/");
                document.cookie = `${mainUser},${mainUserPass}; expires=Thu, 18 Dec 1040 12:00:00 UTC; path=/`;
              }
            });
          }}
          rel="noopener noreferrer"
          className="flex items-center  gap-2 text-[15px]"
        >
          <LuLogOut /> Logout
        </a>
      ),
    },
  ];

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
    console.log(name);
    if (file) {
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
  useHotkeys("shift+s", () =>
    dispatch({ type: "SHOW_SETTING_MODEL", payload: true })
  );
  useHotkeys("shift+c", () =>
    dispatch({ type: "SHOW_COMPLETED_NOTE_MODEL", payload: true })
  );
  useHotkeys("alt+ctrl+s", () =>
    dispatch({ type: "IS_SEARCHING", payload: !isSearching })
  );

  const [open, setOpen] = useState(false);

  const handleOpenChange: DropdownProps["onOpenChange"] = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
      setisSupport(false);
    }
  };

  return (
    <div
      id="drawer-navigation"
      className={`rounded-3xl z-10 w-[70rem]  h-full p-4 overflow-y-auto transition-transform  ${
        (!ShowSideBar && "hidden") || (dimensions.width < 1024 && "hidden")
      }`}
      tabIndex={-1}
      aria-label="Sidebar"
      style={{
        border: "2px solid white",
        backgroundColor: backgroundColorSidebar,
        boxShadow: "1px 3px 13px rgba(0, 0, 0, 0.827)",
      }}
    >
      <div className="flex justify-between">
        <h5
          id="drawer-navigation-label"
          className=" font-semibold text-gray-500 uppercase dark:text-[#ebeaea] text-2xl flex items-center gap-1"
        >
          <TbBrandCodesandbox size={24} />
          Motions
        </h5>
        <button
          type="button"
          onClick={() => setShowSideBar(false)}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5    dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
      </div>
      <div className="py-4 overflow-y-auto  h-[88%]">
        <ul className="space-y-2 font-medium">
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
              <a
                onClick={() => {
                  dispatch({ type: "IS_SEARCHING", payload: true });
                }}
                style={{ textDecoration: "none" }}
                href="#"
                className=" p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group flex items-center"
              >
                <IoSearch size={20} />
                <span className="ms-2">Search</span>
              </a>
            )}
          </li>
          {/* <li>
            <a
              href="#"
              className=" p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group flex items-center"
            >
              <MdUpdate size={21} />
              <span className="ms-2">Update</span>
            </a>
          </li> */}
          <li
            onClick={() => {
              dispatch({ type: "IS_SEARCHING", payload: false });
              setSelectItemSideBar("");
            }}
          >
            <a
              style={{ textDecoration: "none" }}
              href="#"
              className="p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group flex items-center"
            >
              <PiUsersFour size={23} />
              <span className="ms-2">Top Users</span>
            </a>
          </li>
          <li
            onClick={() => {
              dispatch({ type: "SHOW_SETTING_MODEL", payload: true });
              dispatch({ type: "IS_SEARCHING", payload: false });
            }}
          >
            <a
              style={{ textDecoration: "none" }}
              href="#"
              className=" p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group flex items-center"
            >
              <IoSettingsOutline size={20} />
              <span className="ms-2">Setting</span>
            </a>
          </li>
          <li
            onClick={() => {
              dispatch({ type: "SHOW_COMPLETED_NOTE_MODEL", payload: true });
              dispatch({ type: "IS_SEARCHING", payload: false });
            }}
          >
            <a
              style={{ textDecoration: "none" }}
              href="#"
              className=" p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group flex items-center"
            >
              <RxCheckCircled size={20} />{" "}
              <span className="ms-2">Completed</span>
            </a>
          </li>
          <br />
          Category
          <hr />
          <li
            onClick={() => {
              setSelectItemSideBar("Learning");
              setSelectIcon(<IoSchoolSharp color="lightgreen" />);
              dispatch({ type: "IS_SEARCHING", payload: false });
            }}
          >
            <a
              href="#"
              style={{ textDecoration: "none" }}
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 ${
                SelectItemSideBar == "Learning" && !isSearching && "bg-gray-700"
              } dark:hover:bg-gray-700 group`}
            >
              <IoSchoolSharp size={24} color="lightgreen" />
              <span className="ms-3">Learning</span>
            </a>
          </li>
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
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 ${
                SelectItemSideBar == "Sports" && !isSearching && "bg-gray-700"
              } dark:hover:bg-gray-700 group`}
            >
              <FcSportsMode size={25} />
              <span className="flex-1 ms-3 whitespace-nowrap">Sports</span>
              {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                Pro
              </span> */}
            </a>
          </li>
          <li
            onClick={() => {
              setSelectItemSideBar("Work");
              setSelectIcon(<FaNetworkWired color="lightskyblue" />);
              dispatch({ type: "IS_SEARCHING", payload: false });
            }}
          >
            <a
              style={{ textDecoration: "none" }}
              //   style={{color:"lightskyblue"}}
              href="#"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 ${
                SelectItemSideBar == "Work" && !isSearching && "bg-gray-700"
              } dark:hover:bg-gray-700 group`}
            >
              <FaNetworkWired size={25} color="lightskyblue" />
              <span className="flex-1 ms-3 whitespace-nowrap">Work</span>
              {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                3
              </span> */}
            </a>
          </li>
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
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 ${
                SelectItemSideBar == "Users" && !isSearching && "bg-gray-700"
              } dark:hover:bg-gray-700 group`}
            >
              <img
                width="25"
                height="25"
                src="https://img.icons8.com/tiny-color/64/group.png"
                alt="group"
              />{" "}
              <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
            </a>
          </li>
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
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 ${
                SelectItemSideBar == "Social Media" &&
                !isSearching &&
                "bg-gray-700"
              } dark:hover:bg-gray-700 group`}
            >
              <img
                src="https://img.icons8.com/color/480/shopping-cart.png"
                alt=""
                width="27"
                height="27"
              />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Social Media
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div className=" text-center">
        <span className="flex items-center justify-between gap-2 text-2xl">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center  border-gray-300 border-dashed rounded-lg cursor-pointer"
          >
            <Dropdown
              menu={{ items }}
              placement="topLeft"
              arrow
              onOpenChange={handleOpenChange}
              open={open}
            >
              <a>
                <Avatar size={40} src={<img src={ProfileImgg} alt="" />} />
              </a>
            </Dropdown>
            {/* <img
                id="avatarButton"
                data-dropdown-toggle="userDropdown"
                data-dropdown-placement="bottom-start"
                className="w-10 h-10 rounded-full cursor-pointer"
                src={ProfileImgg}
                alt="p"
              /> */}

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

          <div className="flex items-center gap-2">
            <BsCoin color="yellow" />
            {Score}
          </div>
        </span>
      </div>
    </div>
  );
};

export default SideBar;
