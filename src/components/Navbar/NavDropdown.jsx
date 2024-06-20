import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const navdropdowndata = [
  {
    name: "Softcom",
    href: "/softcom",
  },
  {
    name: "Aeromodelling",
    href: "/aermodelling",
  },
  {
    name: "Coding",
    href: "/coding",
  },
];

const NavDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-lg rounded-lg py-1 outline-none  lg:px-4  bg-primary text-secondary">Clubs</DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2">
        {navdropdowndata.map((item, i) => (
          <DropdownMenuItem>
            <Link className="text-lg" href={item.href}>{item.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavDropdown
