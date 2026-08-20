"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import NavDropdown from "./NavDropdown";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import Link from "next/link";
import { handleLogin, handleLogout } from "@/app/actions/authentication";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

export default function Navbar({ session }) {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const container = useRef();

  useEffect(() => {
    setIsSheetOpen(false);
  }, [pathname]);

  useGSAP(
    () => {
      gsap.from(".hamburger", { y:-50,
        opacity:0,
        duration:1
      });
      gsap.from([".Globe",".LandingHeroTitle",".LandingHeroSubtitle"], { opacity:0,
        delay:1,
        duration:1
      });
    },
    { scope: container }
  );

  return (
    <header
      ref={container}
      className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-900/80 shadow-lg"
    >
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            className="lg:hidden hamburger overflow-hidden p-0 border-zinc-800 bg-zinc-900 text-primary hover:bg-zinc-800"
            size="icon"
            variant="outline"
          >
            <MenuIcon className="h-full w-full p-2 text-primary" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-[#0d1117] border-zinc-800 text-white">
          <div className="grid gap-4 py-6">
            {session ? (
              <>
                <Link
                  className="flex w-full items-center py-2 rounded-lg justify-center transition-all bg-primary hover:bg-cyan-400 text-black font-semibold text-lg"
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
                    className="flex w-full items-center py-2 text-lg font-semibold bg-primary hover:bg-cyan-400 text-black"
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
      <nav className="ml-auto hidden hamburger lg:flex gap-6 items-center">
        <NavDropdown />
        {session ? (
          <Link
            className="flex items-center bg-zinc-900 hover:bg-zinc-800 text-white border border-primary/50 transition-all rounded-lg py-2 px-4 text-base font-semibold shadow-sm hover:shadow-cyan-900/30"
            href="/dashboard"
          >
            Dashboard
          </Link>
        ) : (
          <form action={handleLogin}>
            <Button
              type="submit"
              value="google"
              name="action"
              className="flex items-center rounded-lg py-2 px-5 bg-primary hover:bg-cyan-400 text-black text-base font-bold transition-all shadow-md hover:shadow-cyan-500/25"
            >
              Login
            </Button>
          </form>
        )}
      </nav>
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
