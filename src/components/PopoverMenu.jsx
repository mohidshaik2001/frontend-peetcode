import React from "react";
import { PopoverButton, PopoverPanel, Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../api/auth.js";
import { logout } from "../store/authslice.js";

function PopoverMenu() {
  const authStatus = useSelector((state) => state.auth.status);
  // console.log("auth status", authStatus);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navItems = [
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Submissions",
      slug: "/submissions/user",
      active: authStatus,
    },
    // {
    //   name: "Logout",
    //   slug: "/",
    //   active: authStatus,
    // },
  ];
  const logoutHandler = async () => {
    authService.logoutUser().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };
  return (
    <div className="w-full max-w-sm mx-auto text-right">
      <Popover className="relative">
        {({ open }) => (
          <>
            <PopoverButton
              className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none`}
            >
              <ChevronDownIcon
                className={`w-5 h-5 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </PopoverButton>

            <PopoverPanel className="absolute right-0 z-10 mt-2 w-44 bg-white rounded-lg shadow-lg ring-1 ring-black/5">
              <div className="p-2 space-y-1">
                {authStatus &&
                  navItems.map(
                    (item) =>
                      item.active && (
                        <button
                          key={item.name}
                          className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                          <Link to={item.slug}>{item.name}</Link>
                        </button>
                      )
                  )}
                {!authStatus &&
                  navItems.map(
                    (item) =>
                      !item.active && (
                        <button
                          key={item.name}
                          className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                          <Link to={item.slug}>{item.name}</Link>
                        </button>
                      )
                  )}
                {authStatus && (
                  <button
                    key={"Logout"}
                    className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                )}
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>
    </div>
  );
}

export default PopoverMenu;
