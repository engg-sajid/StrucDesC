import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-900 py-4 px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs md:text-sm text-slate-400 font-medium">
        {/* Left Column: Copyright */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-slate-300">© 2026 StrucDesC by Md Sajid Ali.</p>
          <p>All rights reserved.</p>
        </div>

        {/* Center Column: Address */}
        <div className="text-center mb-4 md:mb-0">
          <p className="font-semibold text-slate-200 mb-1">Office Location</p>
          <p>Dept. of Civil Engg., Prayukti Bhaban, Jadavpur University</p>
          <p>Main Campus, 188, Raja S.C. Mallick Rd</p>
          <p>Kolkata, West Bengal 700032</p>
        </div>

        {/* Right Column: Links */}
        <div className="flex flex-col text-center md:text-right gap-1">
          <Link href="#" className="hover:text-blue-400 transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-blue-400 transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-blue-400 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
