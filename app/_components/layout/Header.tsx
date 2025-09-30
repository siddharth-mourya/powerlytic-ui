"use client";

export default function Header() {
  return (
    <header className="navbar bg-base-100 border-b border-base-200 shadow-sm px-4 sticky top-0 z-20">
      {/* Left side */}
      <div className="flex-none sm:hidden">
        <label
          htmlFor="dashboard-drawer"
          className="btn btn-square btn-ghost"
          aria-label="open sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
      </div>

      {/* Brand */}
      <div className="flex-1 text-xl font-bold text-primary">Powerlytic</div>

      {/* Right actions */}
      <div className="flex-none gap-2">
        <button className="btn btn-outline btn-sm">Profile</button>
      </div>
    </header>
  );
}
