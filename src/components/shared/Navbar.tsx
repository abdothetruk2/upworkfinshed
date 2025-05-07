"use client";

import NavLink from "./NavLink";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full p-8 bg-transparent z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="/images/glory-logo.webp"
            alt="Glory's Logo"
            width={50}
            height={50}
            className="w-auto h-10"
          />
          <span className="self-center text-4xl font-semibold whitespace-nowrap">
            Glorys
          </span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={`w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`}
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <NavLink href="/" className="block py-2 px-3">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink href="/produk" className="block py-2 px-3">
                Produk
              </NavLink>
            </li> 
            {/* <li>
              <NavLink href="/contact" className="block py-2 px-3">
                Contact
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
