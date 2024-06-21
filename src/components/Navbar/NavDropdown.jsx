import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
const NavDropDownData=[
  {
    text:"Softcom",
    link:"/softcom"
  },
  {
    text:"Aeromodelling",
    link:"/aeromodelling"
  },
  {
    text:"Softcom",
    link:"/softcom"
  },
  {
    text:"Softcom",
    link:"/softcom"
  },
]

const NavDropDown = () => {
  return (
    <div className="flex h-auto justify-center items-center bg-primary rounded-md px-3 py-1 ">
      <FlyoutLink  FlyoutContent={PricingContent}>
        Clubs
      </FlyoutLink>
    </div>
  );
};

const FlyoutLink = ({ children, href, FlyoutContent }) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit"
    >
      <a href={href} className="relative text-white">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-[2px] origin-left scale-x-0 rounded-full bg-secondary transition-transform duration-300 ease-out"
        />
      </a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PricingContent = () => {
  return (
    <div className="w-64 bg-white p-6 shadow-xl">
      <div className="mb-6 space-y-3 ">
        <h3 className="font-semibold">Clubs Under Bost</h3>
        
       {NavDropDownData.map((item,i)=>(
        <Link key={i} href={item.link} className="block text-sm hover:underline ">
        {item.text}
      </Link>
       ))}
      </div>
     
      <Link href="/" className="w-full rounded-lg border-2 border-primary px-4 py-2 font-semibold transition-colors hover:bg-primary hover:text-white">
        Home
      </Link>
    </div>
  );
};

export default NavDropDown;