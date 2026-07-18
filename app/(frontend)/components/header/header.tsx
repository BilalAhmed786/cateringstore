"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Cateringlogo from "../../assets/saif catering.png";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Menu Items", href: "/menuitem" },
  { name: "Packages", href: "/packages" },
  { name: "Events", href: "/events" },
  { name: "Hampers", href: "/hampers" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Replace with auth state
  const isLoggedIn = false;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at the top
      if (currentScrollY < 20) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b bg-white/90 backdrop-blur-md shadow-sm transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={Cateringlogo}
            alt="Saif Catering Logo"
            width={70}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <>
              <Button variant="outline">Profile</Button>
              <Button variant="destructive">Logout</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>

              <Button asChild>
                <Link href="/auth/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile */}
        <button
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-white md:hidden">
          <nav className="flex flex-col p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 hover:bg-muted"
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-4 flex flex-col gap-2">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>

              <Button asChild>
                <Link href="/auth/register">Register</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}