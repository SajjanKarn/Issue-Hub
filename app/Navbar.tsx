"use client";
import classnames from "classnames";
import { useSession } from "next-auth/react";
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
  const { status, data } = useSession();
  const currentPath = usePathname();

  return (
    <div className="flex items-center justify-between gap-x-5 border shadow p-5">
      <div className="flex items-center flex-[2]">
        <div className="flex items-center gap-2 justify-center">
          <AiFillBug size={30} color="#B8001F" />
          <span className="font-bold">
            Issue
            <span className="ml-[0.5px] bg-red-500 px-1 rounded-sm text-white">
              Hub
            </span>
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
      <div>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Sign Out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Sign In</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
