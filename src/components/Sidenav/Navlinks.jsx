"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconHome,
  IconDashboard,
  IconFriends,
  IconPhotoEdit,
  IconArticle,
  IconBrandGithub,
  IconList,
  IconCalendarEvent,
  IconInfoSquareRounded
} from "@tabler/icons-react";

// Define the static links for the navigation
const staticLinks = [
  { name: "Dashboard", href: "/dashboard", Icon: IconDashboard },
  { name: "Introduction", href: "/dashboard/club", Icon: IconInfoSquareRounded },
  { name: "Projects", href: "/dashboard/projects", Icon: IconBrandGithub },
  { name: "Blogs", href: "/dashboard/blogs", Icon: IconArticle },
  { name: "Team", href: "/dashboard/team", Icon: IconFriends },
  { name: "Gallery", href: "/dashboard/gallery", Icon: IconPhotoEdit },
  { name: "Events", href: "/dashboard/events", Icon: IconCalendarEvent },
  { name: "Home", href: "/", Icon: IconHome },
];

export default function Navlinks({ club, isSuperAdmin }) {
  const pathname = usePathname();

  // Create a copy of static links to avoid mutating it directly
  let links = [...staticLinks];

  // Add Achievements link if user is super admin
  if (isSuperAdmin) {
    links.splice(5, 0, {
      name: "Achievements",
      href: "/dashboard/achievements",
      Icon: IconList,
    });
  }

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.Icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 md:rounded-md bg-secondary p-2 text-sm font-medium hover:bg-tertiary hover:text-secondary transition-all md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-tertiary text-secondary": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
