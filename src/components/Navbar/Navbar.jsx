"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import NavDropdown from "./NavDropdown";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import Link from "next/link";
import { handleLogin } from "@/app/actions/authentication";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar({ session }) {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setIsSheetOpen(false);
  }, [pathname]);

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.key === "L" || event.key === "l") {
  //       handleLogin();
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <header className="flex select-none  h-[10vh] bg-secondary w-full justify-between shrink-0 items-center px-4 md:px-6">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            className="lg:hidden  overflow-hidden p-0"
            size="icon"
            variant="outline"
          >
            <MenuIcon className="h-full w-full  bg-secondary text-tertiary" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-2 py-6">
            {session ? (
              <>
                <Link
                  className="flex w-full items-center py-1 border-2 rounded-none  justify-center transition-all bg-slate-300 px-2 border-primary text-lg font-semibold"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
                <NavDropdown />
              </>
            ) : (
              <>
                <form action={handleLogin}>
                  <Button
                    type="submit"
                    value="google"
                    name="action"
                    className="flex  w-full items-center py-2 text-lg font-semibold"
                  >
                    Login
                  </Button>
                </form>
                <NavDropdown />
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
      <Link className="mr-6 hidden lg:flex" href="/">
        <img src="/Logo.png" className=" h-[60px]"></img>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6">
        {session ? (
          <>
            <NavDropdown />
            <Link
              className="flex w-full bg-gray-900 hover:bg-gray-700 text-secondary transition-all border-primary items-center py-2  px-2 text-lg font-semibold"
              href="/dashboard"
            >
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <NavDropdown />
            <form action={handleLogin}>
              <Button
                type="submit"
                value="google"
                name="action"
                className="flex w-full transition-all items-center rounded-none py-2 bg-gray-800 hover:bg-gray-900 text-lg font-semibold"
              >
                <span>Login</span>
                {/* <span className="ml-2 h-1/2  transition-all px-2 py-3 font-bold flex items-center justify-center bg-gray-600  rounded-sm text-[12px] hover:bg-gray-900  ">
                  L
                </span> */}
              </Button>
            </form>
          </>
        )}
      </nav>
      <Link href="/" className="lg:hidden">
        <img src="/Logo.png" className=" h-[60px]"></img>
      </Link>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
