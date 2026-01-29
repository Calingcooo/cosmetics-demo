import React, { useEffect } from "react";
import Link from "next/link";
import { LuX } from "react-icons/lu";

type NavItem = {
  name: string;
  href: string;
};

type MobileNavProps = {
  items: NavItem[];
  isOpen: boolean;
  toggleNav: () => void;
};

const MobileNav: React.FC<MobileNavProps> = ({ items, isOpen, toggleNav }) => {
  // Disable scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="fixed inset-0 z-50 block md:hidden">
      {/* Backdrop - Fixed position covering entire viewport */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80"
          onClick={toggleNav}
        ></div>
      )}

      <aside
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        className={`fixed inset-y-0 right-0 z-50 w-80 bg-[theme(--card)] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Menu"
      >
        <button className="" onClick={toggleNav}>
          <LuX className="w-5 h-5 absolute right-0" />
        </button>

        <nav className="flex flex-col space-y-4 mt-8 pl-5">
          {items.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="text-lg font-medium transition-colors hover:text-[theme(--primary)] capitalize"
              onClick={toggleNav}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default MobileNav;
