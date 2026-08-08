"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Cateringlogo from "../../assets/saif catering.png";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

import { auth } from "@/app/(frontend)/lib/firebase/firebase";
import { useLogout } from "@/app/(frontend)/admin/dashboard/hooks/useLogout";
import { apiRequest } from "../reusables/apireq/apireq";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Menu Items", href: "/menuitem" },
  { name: "Packages", href: "/packages" },
  { name: "Events", href: "/events" },
  { name: "Hampers", href: "/hampers" },
];

type User = {
  uid: string;
  role: string;
};

export default function Header() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const { logout, isPending } = useLogout();

  // ---------------------------------------
  // Firebase auth state
  // ---------------------------------------

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setAuthLoading(false);
        return;
      }

      try {
        const token = await firebaseUser.getIdToken();
        const response = await apiRequest<{
          user: {
            id: string;
            role: string;
          };
        }>({
          url: "/api/auth/authorize",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response) {
          setUser(null);
          return;
        }

       
        setUser({
          uid: firebaseUser.uid,
          role: response.user.role,
        });
      } catch (error) {
        console.error("Failed to get current user:", error);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // ---------------------------------------
  // Header scroll behavior
  // ---------------------------------------

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

  // ---------------------------------------
  // Dashboard redirect
  // ---------------------------------------

  const handleDashboard = () => {
    if (user?.role === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      router.push("/client/dashboard");
    }

    setOpen(false);
  };

  const isLoggedIn = !!user;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b bg-white/90 backdrop-blur-md shadow-sm transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-3 md:px-8">
        <Link href="/">
          <Image
            src={Cateringlogo}
            alt="Catering Logo"
            width={65}
            height={50}
            className="rounded-full object-cover"
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
        <div className="items-center gap-3 md:flex">
          {!authLoading &&
            (isLoggedIn ? (
              <>
                <Button variant="outline" onClick={handleDashboard}>
                  Dashboard
                </Button>

                <Button
                  variant="destructive"
                  onClick={logout}
                  disabled={isPending}
                >
                  {isPending ? "Logging out..." : "Logout"}
                </Button>
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
            ))}
        </div>

        {/* Mobile */}
        <button className="md:hidden" onClick={() => setOpen((prev) => !prev)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
              {!authLoading &&
                (isLoggedIn ? (
                  <>
                    <Button variant="outline" onClick={handleDashboard}>
                      Dashboard
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() => {
                        setOpen(false);
                        logout();
                      }}
                      disabled={isPending}
                    >
                      {isPending ? "Logging out..." : "Logout"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild>
                      <Link href="/auth/login" onClick={() => setOpen(false)}>
                        Login
                      </Link>
                    </Button>

                    <Button asChild>
                      <Link
                        href="/auth/register"
                        onClick={() => setOpen(false)}
                      >
                        Register
                      </Link>
                    </Button>
                  </>
                ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
