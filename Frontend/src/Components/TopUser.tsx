import React, { useEffect } from "react";
import { HiMiniStar } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister } from "../Redux/actions";
import { Avatar } from "antd";
import { BsCoin } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

const TopUser = () => {
  const dispatch = useDispatch<any>();

  const Registers = useSelector((state: any) => state.Registers);
  let SortingRegister = [...Registers];
  SortingRegister.sort(function (a, b) {
    return b.score - a.score;
  });
  useEffect(() => {
    dispatch(fetchRegister());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {SortingRegister.map((data: any, i: any) => (
        <div
          key={i}
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card"
        >
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight flex">
              <HiMiniStar color="yellow" />
              {i + 1}
            </h3>
          </div>
          <div className="p-6 flex flex-col items-center justify-center space-y-2">
            <Avatar
              size={60}
              src={
                <img
                  src={`${
                    data.profileImg
                      ? `https://motionsbackend.liara.run/api/FileManager/downloadfile?FileName=${data.profileImg}`
                      : "https://wallpapercave.com/dwp1x/wp9566386.jpg"
                  }`}
                  alt="avatar"
                />
              }
            />

            <div className="text-3xl font-bold flex items-center gap-2">
              {" "}
              <BsCoin color="yellow" />
              {data.score}
            </div>
          </div>
          <div className="flex items-center p-6">
            <span className="text-3xl gap-2 text-white inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  text-primary-foreground  h-10 px-4 py-2 w-full">
              <FaRegUser /> {data.username}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopUser;
