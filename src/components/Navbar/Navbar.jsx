"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import NavDropdown from "./NavDropdown";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import Link from "next/link";
import { handleLogin } from "@/app/actions/authentication";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar({ session }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setIsSheetOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'L' || event.key === 'l') {
        handleLogin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <header className="flex select-none h-[10vh] w-full justify-between shrink-0 items-center px-4 md:px-6">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button className="lg:hidden rounded-md overflow-hidden p-0" size="icon" variant="outline">
            <MenuIcon className="h-full w-full  bg-primary text-secondary" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <Link  onClick={()=>console.log("clicked bhai")} href="/" className="mr-6 hidden lg:flex" >
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="grid gap-2 py-6">
            {session ? (
              <>
                <Link
                  className="flex w-full items-center py-1 border-2 rounded-lg bg-white transition-all px-2 border-primary text-lg font-semibold"
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
                    className="flex w-full items-center py-2 text-lg font-semibold"
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
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6">
        {session ? (
          <>
            <NavDropdown />
            <Link
              className="flex w-full border-2 hover:bg-gray-300 transition-all border-primary items-center py-2 rounded-lg px-2 text-lg font-semibold"
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
                className="flex w-full items-center py-2 bg-gray-800 hover:bg-gray-600 text-lg font-semibold"
              >
                <span>Login</span>
                <span className="bg-gray-700 h-1/2 text-[12px] p-[8px] ml-2 font-bold rounded-sm flex items-center justify-center px-1">L</span>
              </Button>
            </form>
          </>
        )}
      </nav>
      <Link href="/">
      <MountainIcon  className="lg:hidden" />
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
