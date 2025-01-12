"use client";
import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowRight, FiMail, FiMapPin } from "react-icons/fi";
import { SiGithub, SiTiktok, SiTwitter, SiYoutube } from "react-icons/si";
import Link from "next/link";
import {
    IconHome,
    IconDashboard,
    IconFriends,
    IconPhotoEdit,
    IconArticle,
    IconBrandGithub,
    IconList,
    IconLogout,
    IconCalendarEvent,
    IconInfoSquareRounded
} from "@tabler/icons-react";

export const DashboardHome = ({ isSuperAdmin }) => {
  return (
    <div className="bg-secondary px-4 py-12 text-zinc-50">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
        <AboutBlock isSuperAdmin={isSuperAdmin} />
      </motion.div>
      <Footer />
    </div>
  );
};

const Block = ({ className, ...rest }) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6",
        className
      )}
      {...rest}
    />
  );
};

const AboutBlock = ({ isSuperAdmin }) => (
  <Block className="col-span-12 relative flex flex-col gap-2 pt-16 text-sm xl:text-2xl leading-snug">
    <span className="absolute top-2 left-4 text-sm px-2 py-1 rounded-md bg-zinc-700 text-gray-400">
      dashboardConfig.js
    </span>
    <Link href="/dashboard/club">
      <p className="cursor-pointer">
        /Introduction{" "}
        <span className="text-zinc-400">
          <IconInfoSquareRounded className="inline" />: Update Club Introduction
        </span>
      </p>
    </Link>
    <Link href="/dashboard/projects">
      <p className="cursor-pointer">
        /Projects{" "}
        <span className="text-zinc-400">
          <IconBrandGithub className="inline" />: Create, Update, delete your projects
        </span>
      </p>
    </Link>
    <Link href="/dashboard/blogs">
      <p className="cursor-pointer">
        /Blogs{" "}
        <span className="text-zinc-400">
          <IconArticle className="inline" />: Create, Update, delete your blogs
        </span>
      </p>
    </Link>
    <Link href="/dashboard/team">
      <p className="cursor-pointer">
        /Team{" "}
        <span className="text-zinc-400">
          <IconFriends className="inline" />: Create, Update, delete your team members
        </span>
      </p>
    </Link>
    <Link href="/dashboard/gallery">
      <p className="cursor-pointer">
        /Gallery{" "}
        <span className="text-zinc-400">
          <IconPhotoEdit className="inline" />: Create, Update, delete your gallery images
        </span>
      </p>
    </Link>
    <Link href="/dashboard/events">
      <p className="cursor-pointer">
        /Events{" "}
        <span className="text-zinc-400">
          <IconCalendarEvent className="inline" />: Create, Update, delete your Events
        </span>
      </p>
    </Link>
    {isSuperAdmin && (
      <Link href="/dashboard/achievements">
        <p className="cursor-pointer">
          /Achievements{" "}
          <span className="text-zinc-400">
            <IconList className="inline" />: Create, Update, delete BOST Achievements
          </span>
        </p>
      </Link>
    )}
    <Link href="/">
      <p className="cursor-pointer">
        /Home{" "}
        <span className="text-zinc-400">
          <IconHome className="inline" />: Go back to landing page
        </span>
      </p>
    </Link>
      <p >
        /Logout{" "}
        <span className="text-zinc-400">
          <IconLogout className="inline" />: Click to signout admin.
        </span>
      </p>
  </Block>
);

const Footer = () => {
  return (
    <footer className="mt-12">
      <p className="text-center text-zinc-400">
        Made with ❤️ by{" "}
        <Link href="/softcom" className="text-primary hover:underline font-bold tracking-widest">
          SoftCom
        </Link>
      </p>
    </footer>
  );
};
