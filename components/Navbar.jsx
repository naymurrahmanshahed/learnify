import Link from "next/link";
import Button from "./Button";

export const Navbar = () => {
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
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>
        <div>
          <Button
            href="/login"
            placeholder="Sign in"
            color="secondary"
            size="default"
          />
        </div>
      </div>
    </div>
  );
};
