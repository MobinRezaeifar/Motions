/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
import "./Register.css";
import React, { useEffect, useState } from "react";
import { AddRegister, fetchRegister } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [haveAccount, sethaveAccount] = useState<boolean>(false);
  const [ListUsername, setListUsername] = useState<string[]>([]);
  const [UserName, setUserName] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const Registers = useSelector((state: any) => state.Registers);

  if (Registers) {
    Registers.map((data: any) => {
      if (!ListUsername.includes(data.username)) {
        ListUsername.push(data.username);
      }
    });
  }

  useEffect(() => {
    dispatch(fetchRegister());
  }, [dispatch]);

  const Login = () => {
    if (UserName != "" && Password != "") {
      if (ListUsername.includes(UserName)) {
        document.cookie = `${UserName},${Password}; expires=Thu, 18 Dec 2040 12:00:00 UTC; path=/`;
        navigate("/home");
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
          icon: "success",
          title: "Successful Login",
        });
        setPassword("");
        setUserName("");
      } else {
        setPassword("");
        setUserName("");
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
          title: "This account already not exists",
        });
      }
    }
  };
  const Register = async () => {
    if (UserName != "" && Password != "") {
      if (!ListUsername.includes(UserName)) {
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
          icon: "success",
          title: "Successful Register",
        });
        document.cookie = `${UserName},${Password}; expires=Thu, 18 Dec 2040 12:00:00 UTC; path=/`;
        navigate("/home");
        await dispatch(
          AddRegister({
            username: UserName,
            password: Password,
            profileImg: "",
            score: 0,
          })
        );
        setPassword("");
        setUserName("");
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
          title: "This account already exists",
        });
        setPassword("");
        setUserName("");
      }
    }
  };

  return (
    <div className="h-screen w-screen " id="body">
      <div className="wrapper">
        <div className="login_box">
          <div className="login-header">
            <span>{!haveAccount ? "Register" : "Login"}</span>
          </div>

          <div className="input_box">
            <input
              type="text"
              id="user"
              className="input-field"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            <label htmlFor="user" className="label">
              Username
            </label>
            <i className="bx bx-user icon"></i>
          </div>

          <div className="input_box">
            <input
              type="password"
              id="pass"
              className="input-field"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="pass" className="label">
              Password
            </label>
            <i className="bx bx-lock-alt icon"></i>
          </div>

          <div className="input_box">
            <input
              type="submit"
              className="input-submit bg-gray-800"
              value={!haveAccount ? "Register" : "Login"}
              onClick={() => (haveAccount ? Login() : Register())}
            />
          </div>

          <div className="register">
            <div className="group gap-2 flex w-full justify-around">
              <a href="#" onClick={() => sethaveAccount(!haveAccount)}>
                {!haveAccount
                  ? "Do you have an account?"
                  : "Dont have any account?"}
              </a>
              <a
                href="#"
                onClick={() => sethaveAccount(!haveAccount)}
                className="underline"
              >
                {haveAccount ? "Register" : "Login"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
