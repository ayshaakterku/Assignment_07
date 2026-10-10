"use client";
import { authClient } from "@/lib/auth-client";
import { router } from "better-auth/api";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const UserInfo = () => {
  // const data = authClient.useSession()
  // console.log(data)
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  const handleSignOut = async () => {
    await authClient.signOut();
    redirect('/')
  };

  return (
    <div className="order-first flex items-center justify-end gap-3 text-sm sm:order-none">
      {user ? (
        <div className="dropdown dropdown-end">
          {/* Dropdown Trigger */}
          <label
            tabIndex={0}
            role="button"
            className="btn btn-ghost flex h-auto min-h-0 items-center gap-2 px-2 py-1"
          >
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                
                {/* Logo or First letter */}
                <div className="avatar">
                  <div className="w-10 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                    {user.image ? (
                      <img
                        alt={user.name?.slice(0, 1) || "User"}
                        src={user.image}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-300 font-bold text-green-900">
                        {user.name?.slice(0, 1)?.toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <span className="max-w-28 truncate">{user.name}</span>

            <span>▼</span>
          </label>

          {/* Dropdown Menu */}
          <ul
            tabIndex={0}
            className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-gray-200 bg-base-100 p-2 shadow-lg"
          >
            <li className="menu-title">
              <span className="truncate">{user.name}</span>
              <span className="truncate text-xs font-normal">{user.email}</span>
            </li>

            <li>
              <Link href="/profile">👤 My Profile</Link>
            </li>

            <li>
              <button onClick={handleSignOut} className="text-error">
                ↪ Sign Out
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            href="/signin"
            className="btn btn-ghost btn-sm sm:btn-md transition-colors hover:bg-green-600 hover:text-white"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="btn btn-secondary border-green-600 bg-green-600 text-white transition-colors hover:border-gray-500 hover:bg-gray-500 hover:text-white"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
