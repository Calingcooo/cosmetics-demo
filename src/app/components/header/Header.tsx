"use client";

import { useState } from "react";
import { LuSearch, LuShoppingBag, LuUser, LuMenu } from "react-icons/lu";
import { useCart } from "@/app/hooks/useCart";
import Link from "next/link";
import MobileNav from "./MobileNav";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();
  const totalItems = items.length;

  const navItems = [
    { name: "home", href: "/" },
    { name: "products", href: "/products" },
    { name: "about", href: "/about" },
  ];

  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full border-b bg-[theme(--card)]/95 backdrop-blur supports-[backdrop-filter]:bg-[theme(--card)]/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <h1
                className="text-2xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
                Demo
              </h1>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((nav) => (
                <Link
                  key={nav.name}
                  href={nav.href}
                  className="text-sm font-medium transition-colors hover:text-[theme(--primary)] capitalize"
                >
                  {nav.name}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <LuSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[theme(--muted-foreground)]" />
                <input
                  name="search"
                  type="search"
                  placeholder="Search products..."
                  className="pl-9 bg-[theme(--muted)]/50 flex h-10 w-full rounded-md border border-input px-3 py-2 text-base ring-offset-[theme(--background)] file:border-0 file:bg-transparent placeholder:text-[theme(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[theme(--ring)] focus-visible:ring-offset-2 md:text-sm"
                />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2">
              <Link href="/cart">
                <button className="relative inline-flex items-center justify-center h-10 w-10 hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] rounded-md cursor-pointer">
                  <LuShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[theme(--primary)] text-[theme(--primary-foreground)] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </Link>

              <Link href="/login">
                <button className="inline-flex items-center justify-center h-10 w-10 hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] rounded-md cursor-pointer">
                  <LuUser className="h-5 w-5" />
                </button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden inline-flex items-center justify-center h-10 w-10 hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] rounded-md cursor-pointer"
                onClick={handleToggle}
              >
                <LuMenu className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <LuSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[theme(--muted-foreground)]" />
              <input
                name="search"
                type="search"
                placeholder="Search products..."
                className="pl-9 bg-[theme(--muted)]/50 flex h-10 w-full rounded-md border border-input px-3 py-2 text-base ring-offset-[theme(--background)] file:border-0 file:bg-transparent placeholder:text-[theme(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[theme(--ring)] focus-visible:ring-offset-2 md:text-sm"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mount only when open */}
      {isOpen && (
        <MobileNav isOpen={isOpen} toggleNav={handleToggle} items={navItems} />
      )}
    </>
  );
};

export default Header;
