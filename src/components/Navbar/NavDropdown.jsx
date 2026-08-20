import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
const NavDropDownData = [
  {
    text: "Aeromodelling",
    link: "/aeromodelling",
  },
  {
    text: "Automotive",
    link: "/automotive",
  },
  {
    text: "CIM",
    link: "/cim",
  },
  {
    text: "Coding Club",
    link: "/codingclub",
  },
  {
    text: "Esportz",
    link: "/esportz",
  },
  {
    text: "FinCOM",
    link: "/fincom",
  },
  {
    text: "Iota Cluster",
    link: "/iotacluster",
  },
  {
    text: "Monochrome",
    link: "/monochrome",
  },
  {
    text: "Robotics",
    link: "/robotics",
  },
  {
    text: "SoftCom",
    link: "/softcom",
  },
  {
    text: "Zenith",
    link: "/zenith",
  },
];

const NavDropDown = () => {
  return (
    <div className="flex h-auto justify-center items-center border-primary/60 border rounded-lg px-4 py-1.5 hover:border-primary transition-all">
      <FlyoutLink FlyoutContent={PricingContent}>Clubs</FlyoutLink>
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
      <a href={href} className="relative text-primary hover:text-cyan-300 font-semibold text-base transition-colors">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-[2px] origin-left scale-x-0 rounded-full mb-1 bg-primary transition-transform duration-300 ease-out"
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
            className="absolute left-1/2 top-12 bg-[#0d1117] text-white border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#0d1117] border-t border-l border-zinc-800" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PricingContent = () => {
  return (
    <div className="w-64 bg-[#0d1117] p-5 shadow-2xl">
      <div className="mb-4 space-y-2">
        <h3 className="font-semibold text-primary text-sm uppercase tracking-wider">Clubs Under BoST</h3>

        <div className="grid grid-cols-1 gap-1 max-h-64 overflow-y-auto pr-1">
          {NavDropDownData.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className="block text-sm text-zinc-300 hover:text-primary hover:bg-zinc-900/80 px-2 py-1.5 rounded transition-all"
            >
              {item.text}
            </Link>
          ))}
        </div>
      </div>

      <Link
        href="/"
        className="block text-center w-full rounded-lg border border-primary/60 px-4 py-2 font-semibold text-sm text-primary transition-all hover:bg-primary hover:text-black"
      >
        Home
      </Link>
    </div>
  );
};

export default NavDropDown;
