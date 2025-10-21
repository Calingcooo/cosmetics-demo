"use client";

import React, { useState, useRef, useEffect } from "react";
import { LuLogOut } from "react-icons/lu";
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";

interface UserMenuProps {
  full_name?: string;
  email?: string;
  logout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ full_name, email, logout }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const initials = full_name
    ? full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : email?.[0].toUpperCase() || "?";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-start" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative h-10 w-10 rounded-full bg-[theme(--card)] hover:bg-[theme(--muted)]
             transition-colors focus:outline-none focus:ring-2 focus:ring-[theme(--ring)]
             focus:ring-offset-1 flex items-center justify-center cursor-pointer"
      >
        <div
          className="h-9 w-9 rounded-full bg-[theme(--primary)] hover:bg-[theme(--primary)]/90 text-[theme(--primary-foreground)]
                  flex items-center justify-center font-bold transition-colors"
        >
          {initials}
        </div>
        {/* Online Dot */}
        <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-card" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-[theme(--card)] text-[theme(--card-foreground)] rounded-md shadow-[theme(--shadow-card)] ring-1 ring-[theme(--ring)]/40 ring-opacity-5 focus:outline-none z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-[theme(--border)]">
            <p className="text-sm font-medium capitalize leading-none">
              {full_name}
            </p>
            <p className="text-xs text-[theme(--muted-foreground)] truncate">
              {email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              href={`/my-account/${email}}`}
              className="block px-4 py-2 text-sm text-[theme(--card-foreground)] hover:bg-[theme(--muted)] rounded-md transition-colors"
            >
              My Account
            </Link>
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-2 text-sm text-[theme(--destructive)] hover:bg-[theme(--destructive)]/10 rounded-md transition-colors"
            >
              <LuLogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
