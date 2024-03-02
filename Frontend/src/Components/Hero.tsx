/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TopUser from "./TopUser";
import NoteItem from "./NoteItem";
import { IoIosAddCircle } from "react-icons/io";
import AddTaskModel from "./AddTaskModel";
import { useDispatch, useSelector } from "react-redux";
import { fetchListNotes } from "../Redux/actions";
import { Empty } from "antd";
import isEqual from "lodash/isEqual";
import MiniSliderBar from "./MiniSliderBar";
// declare module 'lodash/isEqual';

interface Props {
  ShowSideBar: boolean;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  SelectItemSideBar: string;
  setSelectItemSideBar: React.Dispatch<React.SetStateAction<string>>;
  dimensions: any;
  SelectIcon: any;
  setSelectIcon: React.Dispatch<any>;
  Change: any;
  change: any;
}

const Hero: React.FC<Props> = ({
  ShowSideBar,
  setShowSideBar,
  SelectItemSideBar,
  setSelectItemSideBar,
  dimensions,
  SelectIcon,
  setSelectIcon,
  Change,
  change,
}) => {
  const [ShowAddModal, setShowAddModal] = useState<boolean>(false);
  let navigate = useNavigate();
  const dispatch: any = useDispatch();
  const ListNotes = useSelector((state: any) => state.ListNotes);
  const index = decodeURIComponent(document.cookie).indexOf(",");
  const mainUser = decodeURIComponent(document.cookie).slice(0, index);
  const mainUserPass = decodeURIComponent(document.cookie).slice(index + 1);
  const [ShowCategoryModel, setShowCategoryModel] = useState(false);
  const backgroundColorHero = useSelector(
    (state: any) => state.backgroundColorHero
  );
  const isSearching = useSelector((state: any) => state.IsSearching);
  const SearchingText = useSelector((state: any) => state.SearchingText);
  let ListNotess: any = [];
  let ListNotesIsEqualSearch: any = [];

  useEffect(() => {
    dispatch(fetchListNotes());
  }, [change]);
  useEffect(() => {
    dispatch(fetchListNotes());
  }, []);

  if (SelectItemSideBar) {
    ListNotes.map((data: any) => {
      if (
        data.category == SelectItemSideBar &&
        data.owner == mainUser &&
        !data.status
      ) {
        ListNotess.push(data);
      }
    });
  }

  if (isSearching) {
    if (SearchingText) {
      ListNotes.map((data: any) => {
        if (
          data.owner == mainUser &&
          !data.status &&
          data.title.includes(SearchingText)
        ) {
          ListNotesIsEqualSearch.push(data);
        }
      });
    }
  }

  return (
    <div
      className="rounded-3xl p-6 overflow-y-auto w-[270rem]"
      style={{
        border: "2px solid white",
        backgroundColor: backgroundColorHero,
        boxShadow: "1px 3px 13px rgba(0, 0, 0, 0.827)",
      }}
    >
      <div className="text-2xl">
        <div className="flex cursor-pointer">
          {(() => {
            if (dimensions.width < 1024 || !ShowSideBar) {
              return (
                <button
                  onClick={() => setShowCategoryModel(!ShowCategoryModel)}
                >
                  <RxHamburgerMenu size={24} />
                </button>
              );
            }
          })()}

          <MiniSliderBar
          Change={Change}
          change={change}
            setSelectItemSideBar={setSelectItemSideBar}
            setSelectIcon={setSelectIcon}
            ShowCategoryModel={ShowCategoryModel}
          />
          <div className="flex gap-2 w-full justify-end">
            <FaCircle color="red" onClick={() => setShowSideBar(false)} />
            <FaCircle color="yellow" onClick={() => setSelectItemSideBar("")} />
            <FaCircle color="green" onClick={() => setShowSideBar(true)} />
          </div>
        </div>
        <br />

        {!isSearching ? (
          SelectItemSideBar ? (
            <div className="mx-3 flex gap-2 text-4xl items-center mb-8 justify-between">
              <h1 className="flex items-center gap-2 ">
                {SelectIcon} {SelectItemSideBar}
              </h1>
              <h1
                style={{ marginBottom: "-20px", cursor: "pointer" }}
                onClick={() => {
                  setShowAddModal(true);
                }}
              >
                <IoIosAddCircle size={40} />
              </h1>
            </div>
          ) : (
            <TopUser />
          )
        ) : isEqual(ListNotesIsEqualSearch, []) ? (
          <div
            style={{
              height: "70vh",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Empty />
          </div>
        ) : (
          ListNotesIsEqualSearch.map((data: any) => {
            return (
              <NoteItem
                SelectItemSideBar={SelectItemSideBar}
                Change={Change}
                change={change}
                data={data}
                dimensions={dimensions}
              />
            );
          })
        )}
      </div>

      {SelectItemSideBar && !isSearching && isEqual(ListNotess, []) && (
        <Empty />
      )}
      {SelectItemSideBar &&
        !isSearching &&
        ListNotess.map((data: any) => {
          return (
            <NoteItem
              SelectItemSideBar={SelectItemSideBar}
              Change={Change}
              change={change}
              data={data}
              dimensions={dimensions}
            />
          );
        })}

      <AddTaskModel
        ShowAddModal={ShowAddModal}
        setShowAddModal={setShowAddModal}
        SelectItemSideBar={SelectItemSideBar}
      />
    </div>
  );
};

export default Hero;
