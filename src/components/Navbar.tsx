import Image from "next/image";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import NavbarClientWrapper from "./NavbarClientWrapper";

export default async function Navbar() {
  // Check the session securely on the server
  const session = await getSession();
  const isLoggedIn = !!session?.userId;

  return (
    <nav className="flex items-center justify-between px-8 py-2 max-w-screen-2xl mx-auto w-full bg-white relative">
      {/* Brand / Logo Section */}
      <Link href="/" className="flex items-center z-50">
        <Image
          src="/logo.png"
          alt="StrucDesC Logo"
          width={40}
          height={40}
          className="object-contain mix-blend-multiply"
        />
        <div className="text-2xl font-extrabold text-slate-800 tracking-tight ">
          StrucDesC
        </div>
      </Link>

      {/* Pass auth state to the interactive client UI */}
      <NavbarClientWrapper isLoggedIn={isLoggedIn} />
    </nav>
  );
}
