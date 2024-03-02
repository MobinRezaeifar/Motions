/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { MdAddToPhotos } from "react-icons/md";

import { DatePicker, theme } from "antd";
import { useDispatch } from "react-redux";
import { AddListNote } from "../Redux/actions";

interface Props {
  ShowAddModal: any;
  setShowAddModal: any;
  SelectItemSideBar: any;
}

const AddTaskModel: React.FC<Props> = ({
  ShowAddModal,
  setShowAddModal,
  SelectItemSideBar,
}) => {
  const [Time, setTime] = useState<any>();
  const [Time1, setTime1] = useState<string[]>([]);
  const [StartTime, setStartTime] = useState<any>([]);
  const [EndTime, EndsetTime] = useState<any>([]);
  const [Title, setTitle] = useState<string>("");
  const [Desc, setDesc] = useState("");
  const { token } = theme.useToken();
  const index = decodeURIComponent(document.cookie).indexOf(",");
  const mainUser = decodeURIComponent(document.cookie).slice(0, index);
  const mainUserPass = decodeURIComponent(document.cookie).slice(index + 1);

  const style = {
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: "50%",
  };
  const cellRender = React.useCallback((current: any, info: any) => {
    if (info.type !== "date") {
      return info.originNode;
    }
    if (typeof current === "number") {
      return <div className="ant-picker-cell-inner">{current}</div>;
    }
    return (
      <div
        className="ant-picker-cell-inner"
        style={current.date() === 1 ? style : {}}
      >
        {current.date()}
      </div>
    );
  }, []);
  if (Time) {
    Object.values(Time).map((data: any) => {
      if (!Time1.includes(data)) {
        Time1.push(data);
      }
    });
    Object.values(Time1[0]).map((data: any) => {
      StartTime.push(data);
    });
    Object.values(Time1[1]).map((data: any) => {
      EndTime.push(data);
    });
  }
  const dispatch = useDispatch<any>();

  const AddNote = async () => {
    setDesc("");
    setTitle("");
    setShowAddModal(false);
    await dispatch(
      AddListNote({
        title: Title,
        description: Desc,
        owner: mainUser,
        category: SelectItemSideBar,
        noteImg: "",
        startTime: StartTime[2],
        endTime: EndTime[2],
      })
    );
  };

  return (
    <div
      className={`relative z-10 ${!ShowAddModal && "hidden"}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-gray-700  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-gray-700  px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <MdAddToPhotos size={24} color="green" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h1
                    className="text-xl font-semibold leading-6 text-green-100 mt-1"
                    id="modal-title"
                  >
                    Add Note
                  </h1>

                  <div className="col-span-2 mt-8">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-[18px] font-medium "
                    >
                      Title
                    </label>
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      name="Title"
                      id="Title"
                      value={Title}
                      className="w-[22rem] bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5
                       dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Write Title"
                      required
                    />
                  </div>
                  <div className="col-span-2 mt-4">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-[18px]  font-medium  "
                    >
                      Description
                    </label>
                    <textarea
                    value={Desc}
                      onChange={(e) => setDesc(e.target.value)}
                      id="description"
                      rows={4}
                      className="block p-2.5 w-full text-sm  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write Description"
                    ></textarea>
                  </div>
                  <label
                    htmlFor="description"
                    className="block mt-4 mb-1 text-[18px]  font-medium  "
                  >
                    Time
                  </label>
                  <DatePicker.RangePicker
                    onChange={(e) => {
                      setTime(e);
                    }}
                    cellRender={cellRender}
                    style={{
                      backgroundColor: "rgb(75, 85, 99)",
                      border: "1px solid rgb(107, 114, 128)",
                      width: "22rem",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-700  px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={() => Title && AddNote()}
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddModal(false)}
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

export default AddTaskModel;
