"use client";

import { ID } from "@/app/_lib/constants/Id";
import Sidebar from "./SideBar";

export default function Header() {
  return (
    <header className="flex justify-between bg-primary-content p-4 shadow-md drawer">
      <span className="text-3xl font-bold">Powerlytic</span>
      <div>
        <input
          id={ID.HEADER_DRAWER_ID}
          type="checkbox"
          className="drawer-toggle"
        />
        <label
          htmlFor={ID.HEADER_DRAWER_ID}
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <div className="drawer-side">
          <label
            htmlFor={ID.HEADER_DRAWER_ID}
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <Sidebar />
        </div>
      </div>
    </header>
  );
}
