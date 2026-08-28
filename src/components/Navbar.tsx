"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import AuthModal from "@/components/AuthModal";

export default function Navbar() {
  const pathname = usePathname();
  // State to control the mobile sidebar and auth modal
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const getLinkClass = (path: string) => {
    return `transition-colors hover:text-blue-600 ${
      pathname === path ? "text-blue-600 font-bold" : "text-slate-800"
    }`;
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="flex items-center justify-between px-8 py-6 max-w-screen-2xl mx-auto w-full bg-white relative">
      {/* Brand / Logo Section */}
      <Link href="/" className="flex items-center z-50">
        <Image
          src="/logo.png"
          alt="StrucDesC Logo"
          width={40}
          height={40}
          className="object-contain mix-blend-multiply"
        />
        <div className="text-2xl font-extrabold text-slate-800 tracking-tight">
          StrucDesC
        </div>
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex gap-8 font-medium">
        <Link href="/" className={getLinkClass("/")}>
          Home
        </Link>
        <Link href="/design" className={getLinkClass("/design")}>
          Design
        </Link>
        <Link href="/about" className={getLinkClass("/about")}>
          About
        </Link>
        <Link href="/contact" className={getLinkClass("/contact")}>
          Contact
        </Link>
      </div>

      {/* Desktop Action Button */}
      <div className="hidden md:block">
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="bg-[#1d64d8] text-white px-6 py-2.5 rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden text-slate-800 hover:text-[#1d64d8] transition-colors z-50"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu className="w-8 h-8" />
      </button>

      {/* --- Mobile Sidebar Overlay & Menu --- */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMenu}
        ></div>
      )}

      {/* Slide-out Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col p-8 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={closeMenu}
            className="text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Mobile Links */}
        <div className="flex flex-col gap-6 text-lg font-medium">
          <Link href="/" onClick={closeMenu} className={getLinkClass("/")}>
            Home
          </Link>
          <Link
            href="/design"
            onClick={closeMenu}
            className={getLinkClass("/design")}
          >
            Design
          </Link>
          <Link
            href="/about"
            onClick={closeMenu}
            className={getLinkClass("/about")}
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={closeMenu}
            className={getLinkClass("/contact")}
          >
            Contact
          </Link>

          <div className="mt-4 pt-6 border-t border-slate-100">
            <button
              onClick={() => {
                closeMenu();
                setIsAuthModalOpen(true);
              }}
              className="w-full bg-[#1d64d8] text-white px-6 py-3.5 rounded-md font-medium text-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Auth Modal Integration */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setIsAuthModalOpen(false)}
      />
    </nav>
  );
}
