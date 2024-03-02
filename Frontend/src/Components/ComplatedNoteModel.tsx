import React, { useEffect } from "react";
import { RxCheckCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { fetchListNotes } from "../Redux/actions";
import { Empty, Image, Space } from "antd";
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { FcOvertime } from "react-icons/fc";
import isEqual from "lodash/isEqual";
import { MdClose } from "react-icons/md";
import { MdCategory } from "react-icons/md";

const ComplatedNoteModel = () => {
  const dispatch = useDispatch<any>();
  const index = decodeURIComponent(document.cookie).indexOf(",");
  const mainUser = decodeURIComponent(document.cookie).slice(0, index);
  const mainUserPass = decodeURIComponent(document.cookie).slice(index + 1);

  const ShowCompletedNote = useSelector(
    (state: any) => state.ShowCompletedNoteModel
  );
  const ListNotes = useSelector((state: any) => state.ListNotes);
  let ListNotess: any = [];

  if (ListNotes) {
    ListNotes.map((data: any) => {
      if (data.owner == mainUser && data.status) {
        ListNotess.push(data);
      }
    });
  }

  useEffect(() => {
    dispatch(fetchListNotes());
  }, [dispatch]);

  const onDownload = (urll: any) => {
    fetch(urll)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = urll.split("=")[1];
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };

  return (
    <div
      className={`relative z-10 
       ${!ShowCompletedNote && "hidden"}
       `}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
          <div
            className={`relative transform overflow-hidden rounded-lg bg-gray-700 mb-40  text-left shadow-xl transition-all sm:my-8   ${
              isEqual(ListNotess, []) ? "sm:max-w-sm" : "sm:max-w-2xl"
            }`}
          >
            <div className="bg-gray-700  px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <RxCheckCircled size={24} color="green" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="flex justify-between items-center ">
                    <h1
                      className="text-xl font-semibold leading-6 text-green-100 mt-1 mb-2 "
                      id="modal-title"
                    >
                      Completed notes
                    </h1>
                    <h1
                      className="cursor-pointer"
                      onClick={() =>
                        dispatch({
                          type: "SHOW_COMPLETED_NOTE_MODEL",
                          payload: false,
                        })
                      }
                    >
                      <MdClose size={24} />
                    </h1>
                  </div>
                  {isEqual(ListNotess, []) && (
                    <Empty
                      style={{
                        marginBottom: "-319px",
                        marginTop: "20px",
                        marginRight: "50px",
                      }}
                    />
                  )}
                  {ListNotess && (
                    <div className="h-80 overflow-y-auto pr-5 w-full">
                      {ListNotess.map((data: any) => {
                        return (
                          <div
                            key={data.id}
                            style={{
                              border: "1px solid gray",
                              borderRadius: "10px",
                              marginTop: "20px",
                              padding: "20px 10px",
                            }}
                          >
                            <div
                              className="flex justify-between w-full"
                              style={{ marginLeft: "10px" }}
                            >
                              <h1
                                className={`text-2xl flex items-start justify-start text-white relative} mb-2 w-1/2 `}
                              >
                                <img
                                  width="28"
                                  height="28"
                                  src="https://img.icons8.com/external-wanicon-flat-wanicon/64/external-pin-stationery-and-office-wanicon-flat-wanicon.png"
                                  alt="external-pin-stationery-and-office-wanicon-flat-wanicon"
                                />
                                &nbsp;
                                {data.title}
                              </h1>
                              <h1 className="flex items-center mb-2 w-1/2">
                                {data.startTime.split("T")[0]} -{" "}
                                {data.endTime.split("T")[0]}
                                <FcOvertime size={28} />
                              </h1>
                            </div>
                            <div
                              className="flex"
                              style={{ marginLeft: "10px" }}
                            >
                              <div className="w-1/2 max-h-full  items-center flex">
                                {data.description}
                              </div>

                              <div className="w-1/2 flex justify-center">
                                <Image
                                  style={{
                                    backgroundPosition: "center",
                                    backgroundRepeat: " no-repeat",
                                    backgroundSize: "center",
                                    borderRadius: "15px",
                                    maxWidth: "200px",
                                    height: "auto",
                                  }}
                                  src={`https://motionsbackend.liara.run/api/FileManager/downloadfile?FileName=${data.noteImg}`}
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
                                      <Space
                                        size={12}
                                        className="toolbar-wrapper"
                                      >
                                        <DownloadOutlined
                                          style={{ fontSize: "23px" }}
                                          onClick={() =>
                                            onDownload(
                                              `https://motionsbackend.liara.run/api/FileManager/downloadfile?FileName=${data.noteImg}`
                                            )
                                          }
                                        />
                                        <SwapOutlined
                                          style={{ fontSize: "23px" }}
                                          rotate={90}
                                          onClick={onFlipY}
                                        />
                                        <SwapOutlined
                                          onClick={onFlipX}
                                          style={{ fontSize: "23px" }}
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
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-xl mt-2 text-white ">
                              <MdCategory size={24} />
                              {data.category}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-700  px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={() =>
                  dispatch({
                    type: "SHOW_COMPLETED_NOTE_MODEL",
                    payload: false,
                  })
                }
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:scale-110 sm:mt-0 sm:w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplatedNoteModel;
