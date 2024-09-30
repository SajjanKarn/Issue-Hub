"use client";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

interface Link {
  titile: string;
  url: string;
}

const links: Link[] = [
  { titile: "Home", url: "/" },
  { titile: "Issues", url: "/issues" },
];

const Navbar = () => {
  const currentPath = usePathname();

  return (
    <div className="flex items-center gap-x-5 bg-gray-200 p-5">
      <div className="flex items-center gap-2 justify-center">
        <AiFillBug size={30} color="#B8001F" />
        <span className="font-bold">
          Issue<span className="bg-yellow-500 px-1 rounded-sm">Hub</span>
        </span>
      </div>
      <div>
        {links.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            className={classnames({
              "mx-2 font-medium text-zinc-600 transition-colors hover:text-zinc-900":
                true,
              "text-zinc-900": link.url === currentPath,
            })}
          >
            {link.titile}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
