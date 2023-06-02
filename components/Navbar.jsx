import Link from "next/link";
import Button from "./Button";
import { useSession } from "next-auth/react";

export const Navbar = () => {
  //client side calling
  const { data: session } = useSession();
  return (
    <div className="h-20 bg-black text-gray-400  flex items-center">
      <div className=" wrapper flex justify-between items-center">
        <Link href="/" className="text-white font-semibold">
          learnify
        </Link>
        <div className="flex gap-5">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/courses" className="hover:text-white transition-colors">
            Courses
          </Link>
          {session && (
            <Link href="/orders" className="hover:text-white trasition-color">
              Orders
            </Link>
          )}
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        <div>
          {!session ? (
            <Button
              href="/users/login"
              placeholder="Sign in"
              color="secondary"
              size="default"
            />
          ) : (
            <Button
              href="/users/profile"
              placeholder="Profile"
              color="secondary"
            />
          )}
        </div>
      </div>
    </div>
  );
};
