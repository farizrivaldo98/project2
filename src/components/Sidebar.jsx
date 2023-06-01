import React, { useEffect, useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <div className="flex float-left pr-7 h-[calc(100vh-2rem)] w-full max-w-[20rem]  ">
      <div className="flex flex-col h-[calc(100vh-2rem)] w-full max-w-[20rem]  p-3 bg-gray-800 shadow ">
        <div className="space-y-3">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center py-4">
              <button
                type="button"
                className="p-2 focus:outline-none focus:ring"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="Search"
              placeholder="Search..."
              className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <button
                  className="flex items-center p-2 space-x-3 rounded-md"
                  onClick={() => {
                    navigate(`/product`);
                  }}
                >
                  <HomeIcon className="w-6 h-6 text-gray-100" />
                  <span className="text-gray-100">Product</span>
                </button>
              </li>

              <li className="rounded-sm">
                <button
                  onClick={() => {
                    navigate(`/category`);
                  }}
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <CategoryIcon className="w-6 h-6 text-gray-100" />
                  <span className="text-gray-100">Category</span>
                </button>
              </li>

              <li className="rounded-sm">
                <button
                  onClick={() => {
                    navigate(`/transaction`);
                  }}
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <PointOfSaleIcon className="w-6 h-6 text-gray-100" />
                  <span className="text-gray-100">Transaction</span>
                </button>
              </li>

              <li className="rounded-sm">
                <button
                  onClick={() => {
                    navigate(`/report`);
                  }}
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <DescriptionIcon className=" w-6 h-6 text-gray-100" />
                  <span className="text-gray-100">Report</span>
                </button>
              </li>

              <li className="rounded-sm">
                <button
                  onClick={() => {
                    navigate(`/setting`);
                  }}
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <SettingsIcon className=" w-6 h-6 text-gray-100" />
                  <span className="text-gray-100">Setting</span>
                </button>
              </li>

              <li className="rounded-sm">
                <a
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="text-gray-100">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
