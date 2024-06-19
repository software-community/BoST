"use client"

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Projects', href: '/dashboard/projects' },
  { name: 'Blogs', href: '/dashboard/blogs' },
  { name: 'Team', href: '/dashboard/team' },
  { name: 'Gallery', href: '/dashboard/gallery' },
  { name: 'Home', href: '/' },
];

export default function Navlinks({ club,isSuperAdmin }) {
  const pathname = usePathname();

  // Check if SUPER_ADMIN matches the club prop
  
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
            {
              "bg-sky-100 text-blue-600": pathname === link.href,
            }
          )}
        >
          <p className="hidden md:block">{link.name}</p>
        </Link>
      ))}
      {isSuperAdmin && (
        <Link
          key="Achievements"
          href="/dashboard/achievements"
          className={clsx(
            "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
            {
              "bg-sky-100 text-blue-600": pathname === "/dashboard/achievements",
            }
          )}
        >
          <p className="hidden md:block">Achievements</p>
        </Link>
      )}
    </>
  );
}
