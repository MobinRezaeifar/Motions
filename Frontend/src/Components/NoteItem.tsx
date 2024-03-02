/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */

import { Steps } from "antd";
import { useEffect, useRef, useState } from "react";
import { FcOvertime } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteListNote,
  fetchListNotes,
  updateListNote,
  updateRegister,
} from "../Redux/actions";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Image, Space } from "antd";
import axios from "axios";

function NoteItem({
  dimensions,
  data,
  Change,
  change,
  SelectItemSideBar,
}: any) {
  const [current, setCurrent] = useState(0);
  const index = decodeURIComponent(document.cookie).indexOf(",");
  const mainUser = decodeURIComponent(document.cookie).slice(0, index);
  const mainUserPass = decodeURIComponent(document.cookie).slice(index + 1);
  const Registers = useSelector((state: any) => state.Registers);
  const dispatch: any = useDispatch();
  const ListNotes = useSelector((state: any) => state.ListNotes);
  const noteImgInput: any = useRef();

  useEffect(() => {
    dispatch(fetchListNotes());
  }, [change]);
  useEffect(() => {
    dispatch(fetchListNotes());
  }, []);

  const onChangee = async (value: number) => {
    if (value == 2) {
      if (data.noteImg) {
        if (!data.status) {
          Change("change");
          setCurrent(value);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            // icon: "success",
            width: 250,
            html: ` <span style="display:flex;align-items:center;gap:0.3rem" > <img   width="40" height="40" src="https://img.icons8.com/fluency/96/cheap-2--v1.png" alt="cheap-2--v1"/><span style="color:white;font-size:20px">150+</span></span>`,
            background: "transparent",
          });
          Registers.map(async (data: any) => {
            if (data.username == mainUser) {
              await dispatch(
                updateRegister(data.id, {
                  id: data.id,
                  username: data.username,
                  password: data.password,
                  score: data.score + 150,
                  profileImg: data.profileImg,
                })
              );
              await Change("change");
            }
          });
          await dispatch(
            updateListNote(data.id, {
              id: data.id,
              noteImg: data.noteImg,
              title: data.title,
              description: data.description,
              owner: data.owner,
              category: data.category,
              startTime: data.startTime,
              endTime: data.endTime,
              status: true,
            })
          );
          await Change("change");
        }
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: "First Upload Photo",
        });
      }
    } else {
      setCurrent(value);
    }
  };

  const [Title, setTitle] = useState("");
  const [Desc, setDesc] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = (id: any) => {
    setIsEditing(true);
    ListNotes.map((data: any) => {
      if (data.id == id) {
        setDesc(data.description);
        setTitle(data.title);
      }
    });
  };

  const handleSaveClick = (id: any) => {
    setIsEditing(false);
    ListNotes.map(async (data: any) => {
      if (data.id == id) {
        await dispatch(
          updateListNote(id, {
            id: data.id,
            title: Title,
            description: Desc,
            owner: mainUser,
            category: SelectItemSideBar,
            noteImg: data.noteImg,
            startTime: data.startTime,
            endTime: data.endTime,
            status: data.status,
          })
        );
        await Change("change");
      }
    });
  };

  const DeleteNote = async (id: any) => {
    await dispatch(deleteListNote(id));
  };
  const UploadFile = async (file: any, id: any) => {
    await Change("change");
    if (file.name) {
      var form = new FormData();
      form.append("file", file);
      await axios.post(
        "https://motionsbackend.liara.run/api/FileManager/uploadfile",
        form
      );
      ListNotes.map(async (data: any) => {
        if (data.id == id) {
          await Change("change");
          await dispatch(
            updateListNote(id, {
              id: id,
              title: data.title,
              description: data.description,
              owner: data.owner,
              category: data.category,
              noteImg: file.name,
              startTime: data.startTime,
              endTime: data.endTime,
              status: data.status,
            })
          );
        }
      });
    }
  };

  const src = `https://motionsbackend.liara.run/api/FileManager/downloadfile?FileName=${data.noteImg}`;
  const onDownload = () => {
    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.png";
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };

  const DeleteNoteImg = async (id: any) => {
    await dispatch(
      updateListNote(id, {
        id: id,
        title: data.title,
        description: data.description,
        owner: data.owner,
        category: data.category,
        noteImg: "",
        startTime: data.startTime,
        endTime: data.endTime,
        status: data.status,
      })
    );
    await Change("change");
    noteImgInput.current.value = "";
  };

  return (
    <div
      className={"rounded-2xl p-6  my-4"}
      style={{ border: "1px solid gray" }}
    >
      <div
        className={`flex  items-center justify-between ${
          dimensions.width < 1024 && "flex-col"
        }`}
      >
        <h1
          className={`text-2xl flex   items-start justify-start text-white relative} mb-2 `}
        >
          <img
            width="28"
            height="28"
            src="https://img.icons8.com/external-wanicon-flat-wanicon/64/external-pin-stationery-and-office-wanicon-flat-wanicon.png"
            alt="external-pin-stationery-and-office-wanicon-flat-wanicon"
          />
          &nbsp;
          {isEditing ? (
            <input
              type="text"
              style={{
                backgroundColor: "transparent",
                borderRadius: "6px",
                border: "2px solid lightblue",
              }}
              onChange={(e) => setTitle(e.target.value)}
              value={Title}
            />
          ) : (
            data.title
          )}
        </h1>
        <h1 className="flex items-center gap-2 mr-2">
          {data.startTime.split("T")[0]} - {data.endTime.split("T")[0]}{" "}
          <FcOvertime size={28} />
        </h1>
      </div>
      <div
        className={`w-full   flex lg:flex-row flex-col justify-between text-center ${
          dimensions.width > 1024 && "items-center"
        }`}
      >
        <div
          className={`${
            dimensions.width > 1024 ? "w-1/3" : "w-full"
          } items-start h-full ${dimensions.width > 1024 && " min-h-28"}`}
        >
          <div
            className={` rounded-xl flex flex-col gap-4 items-start  ${
              dimensions.width < 1024 && "mt-6"
            }`}
          >
            {isEditing ? (
              <textarea
                style={{
                  backgroundColor: "transparent",
                  padding: "20px",
                  borderRadius: "6px",
                  border: "2px solid lightblue",
                }}
                value={Desc}
                rows={data.description.length - 300}
                onChange={(e: any) => setDesc(e.target.value)}
              />
            ) : (
              <p
                className={`${
                  data.description.length > 20
                    ? "text-justify pr-7 "
                    : "text-left"
                } font-bold`}
              >
                {data.description}
              </p>
            )}
          </div>
        </div>
        {dimensions.width > 1024 ? (
          <hr
            className={`${
              data.description.length > 70 ? "h-[200px]" : "h-[100px]"
            }`}
            style={{
              borderLeft: "2px solid gray",
              margin: "0 20px 0 0",
            }}
          />
        ) : (
          <hr className="my-10" />
        )}
        <div
          className={`${
            dimensions.width > 1024 ? "w-1/3" : "w-full"
          } flex items-center text-center justify-center`}
        >
          <Steps
            current={current}
            onChange={onChangee}
            direction="vertical"
            items={[
              {
                title: "Create Note",
                status: "finish",
              },
              {
                title: "Act To Do",
                status: data.status && "finish",
              },
              {
                title: "Upload Photos And Get Points",
                status: data.status && "finish",
              },
            ]}
          />
        </div>
        {dimensions.width > 1024 ? (
          <hr
            className={`${
              data.description.length > 70 ? "h-[200px]" : "h-[100px]"
            }`}
            style={{
              borderLeft: "2px solid gray",
              margin: "0 20px 0 0",
            }}
          />
        ) : (
          <hr className="my-10" />
        )}

        <div
          className={`justify-center flex bg-white${
            dimensions.width > 1024 ? "w-1/3" : "w-full"
          }`}
        >
          <div
            style={{
              border: "3px dashed gray",
              width: "fit-content",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          >
            {data.noteImg ? (
              <Image
                style={{ borderRadius: "10px", height: "140px" }}
                src={src}
                preview={{
                  toolbarRender: (
                    _,
                    {
                      transform: { scale },
                      actions: {
                        onFlipY,
                        onFlipX,
                        onRotateLeft,
                        onRotateRight,
                        onZoomOut,
                        onZoomIn,
                      },
                    }
                  ) => (
                    <Space size={12} className="toolbar-wrapper">
                      <DeleteOutlined
                        style={{ fontSize: "23px" }}
                        onClick={() => DeleteNoteImg(data.id)}
                      />
                      <DownloadOutlined
                        style={{ fontSize: "23px" }}
                        onClick={onDownload}
                      />
                      <SwapOutlined
                        style={{ fontSize: "23px" }}
                        rotate={90}
                        onClick={onFlipY}
                      />
                      <SwapOutlined
                        style={{ fontSize: "23px" }}
                        onClick={onFlipX}
                      />
                      <RotateLeftOutlined
                        style={{ fontSize: "23px" }}
                        onClick={onRotateLeft}
                      />
                      <RotateRightOutlined
                        style={{ fontSize: "23px" }}
                        onClick={onRotateRight}
                      />
                      <ZoomOutOutlined
                        style={{ fontSize: "23px" }}
                        disabled={scale === 1}
                        onClick={onZoomOut}
                      />
                      <ZoomInOutlined
                        style={{ fontSize: "23px" }}
                        disabled={scale === 50}
                        onClick={onZoomIn}
                      />
                    </Space>
                  ),
                }}
              />
            ) : (
              <div
                id="image-preview"
                className="w-[12rem] pt-3 mb-1 bg-gray-500 text-gray-100 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer h-40"
              >
                <label htmlFor="upload" className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 text-gray-100 mx-auto mb-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-100">
                    Upload picture
                  </h5>
                  <p className="font-normal text-sm text-gray-100 md:px-6">
                    Choose photo size should be less than{" "}
                    <b className="text-gray-100">2mb</b>
                  </p>
                  {/* <p className="font-normal text-sm text-gray-100 md:px-6">
                    and should be in{" "}
                    <b className="text-gray-100">JPG, PNG, or GIF</b> format.
                  </p> */}
                  {/* <span id="filename" className="text-gray-500 bg-gray-200 z-50">{fileName}</span> */}
                </label>
              </div>
            )}
            <div style={{ fontSize: "13px" }}>
              <input
                type="file"
                className="file-input w-[200px] mt-2 bg-slate-600 h-9 text-sm"
                onChange={(e: any) => UploadFile(e.target.files[0], data.id)}
                ref={noteImgInput}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end mt-4 gap-2">
        {!isEditing ? (
          <button
            onClick={() => handleEditClick(data.id)}
            className="btn btn-sm  btn-outline btn-primary flex items-center text-[1rem]"
            style={{ minHeight: "2.5rem" }}
          >
            <FaRegEdit size={20} />
            <span>Edit</span>
          </button>
        ) : (
          <button
            onClick={() => handleSaveClick(data.id)}
            className="btn btn-sm  btn-outline btn-success flex items-center text-[1rem]"
            style={{ minHeight: "2.5rem" }}
          >
            <FaRegEdit size={20} />
            <span>Save</span>
          </button>
        )}
        <button
          onClick={() => DeleteNote(data.id)}
          className="btn btn-sm  btn-outline btn-error flex items-center text-[1rem]"
          style={{ minHeight: "2.5rem" }}
        >
          <RiDeleteBin5Fill size={20} />
          Delete
        </button>{" "}
      </div>
    </div>
  );
}

export default NoteItem;
