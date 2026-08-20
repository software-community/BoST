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
  IconInfoSquareRounded,
  IconSchool
} from "@tabler/icons-react";

export const DashboardHome = ({ isSuperAdmin }) => {
  return (
    <div className="bg-white px-4 py-8 text-black">
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
        "col-span-4 rounded-xl border border-gray-200 bg-gray-50 p-6 text-black shadow-sm",
        className
      )}
      {...rest}
    />
  );
};

const AboutBlock = ({ isSuperAdmin }) => (
  <Block className="col-span-12 relative flex flex-col gap-3 pt-16 text-sm xl:text-xl leading-snug text-black">
    <span className="absolute top-3 left-4 text-xs px-2.5 py-1 rounded-md bg-gray-200 text-gray-700 font-mono">
      dashboardConfig.js
    </span>
    <Link href="/dashboard/club">
      <p className="cursor-pointer font-medium hover:text-blue-600 transition-colors text-black">
        /Introduction{" "}
        <span className="text-gray-500 font-normal">
          <IconInfoSquareRounded className="inline" />: Update Club Introduction
        </span>
      </p>
    </Link>
    <Link href="/dashboard/projects">
      <p className="cursor-pointer font-medium hover:text-blue-600 transition-colors text-black">
        /Projects{" "}
        <span className="text-gray-500 font-normal">
          <IconBrandGithub className="inline" />: Create, Update, delete your projects
        </span>
      </p>
    </Link>
    {!isSuperAdmin && <Link href="/dashboard/courses">
      <p className="cursor-pointer font-medium hover:text-blue-600 transition-colors text-black">
        /Courses{" "}
        <span className="text-gray-500 font-normal">
          <IconSchool className="inline" />: Create, Update, delete your courses
        </span>
      </p>
    </Link>}  
      <Link href="/dashboard/blogs">
        <p className="cursor-pointer font-medium hover:text-blue-600 transition-colors text-black">
          /Blogs{" "}
          <span className="text-gray-500 font-normal">
            <IconArticle className="inline" />: Create, Update, delete your blogs
          </span>
        </p>
      </Link>
      <Link href="/dashboard/team">
        <p className="cursor-pointer font-medium hover:text-blue-600 transition-colors text-black">
          /Team{" "}
          <span className="text-gray-500 font-normal">
            <IconFriends className="inline" />: Create, Update, delete your team members
          </span>
        </p>
      </Link>
      <Link href="/dashboard/gallery">
        <p className="cursor-pointer font-medium hover:text-blue-600 transition-colors text-black">
          /Gallery{" "}
          <span className="text-gray-500 font-normal">
            <IconPhotoEdit className="inline" />: Create, Update, delete your gallery images
          </span>
        </p>
      </Link>
      <Link href="/dashboard/events">
        <p className="cursor-pointer font-medium hover:text-blue-600 transition-colors text-black">
          /Events{" "}
          <span className="text-gray-500 font-normal">
            <IconCalendarEvent className="inline" />: Create, Update, delete your Events
          </span>
        </p>
      </Link>
      {isSuperAdmin && (
        <Link href="/dashboard/achievements">
          <p className="cursor-pointer font-medium hover:text-blue-600 transition-colors text-black">
            /Achievements{" "}
            <span className="text-gray-500 font-normal">
              <IconList className="inline" />: Create, Update, delete BOST Achievements
            </span>
          </p>
        </Link>
      )}
      <Link href="/">
        <p className="cursor-pointer font-medium hover:text-blue-600 transition-colors text-black">
          /Home{" "}
          <span className="text-gray-500 font-normal">
            <IconHome className="inline" />: Go back to landing page
          </span>
        </p>
      </Link>
      <p className="text-black font-medium">
        /Logout{" "}
        <span className="text-gray-500 font-normal">
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
