import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { CartContext } from "./CartContext";

const LinksStyle =
  "text-decoration-none text-white px-4 py-2 hover:bg-gray-700 hover:text-white rounded transition duration-300 ease-in-out text-sm font-think uppercase tracking-wid ";
const LogoStyle = "text-decoration-none text-white font-bold";
const HeaderStyle =
  "bg-black flex justify-between items-center px-4 py-6 w-full";
const NavStyle =
  "flex justify-between items-center px-4 py-2 w-6/12 lg:w-8/12 md:hidden";
const NavStyleDron =
  "flex justify-end items-center px-4 py-2 w-full lgg:hidden";
const LinkSellerStyle =
  " text-decoration-none text-black px-4 py-2 hover:bg-gray-700 font-extrabold hover:text-white rounded transition duration-300 ease-in-out text-sm uppercase tracking-wid bg-gray-300 text-black font-think";

const Header = () => {
  const router = useRouter();
  const { pathname } = router;

  const { productsInCart } = useContext(CartContext);

  useEffect(() => {}, [productsInCart]);

  return (
    <header className={`${HeaderStyle}`}>
      <Link href="/" className={`text-xl ${LogoStyle}`}>
        E-commerce
      </Link>
      <nav className={`${NavStyle}`}>
        <Link
          href="/"
          className={pathname === "/" ? LinkSellerStyle : LinksStyle}>
          Home
        </Link>
        <Link
          href="/products"
          className={pathname === "/products" ? LinkSellerStyle : LinksStyle}>
          All products
        </Link>
        <Link
          href="/categories"
          className={pathname === "/categories" ? LinkSellerStyle : LinksStyle}>
          Categories
        </Link>
        <Link
          href="/account"
          className={pathname === "/account" ? LinkSellerStyle : LinksStyle}>
          Account
        </Link>
        <Link
          href="/cart"
          className={pathname === "/cart" ? LinkSellerStyle : LinksStyle}>
          Cart ({productsInCart.length})
        </Link>
      </nav>
      <nav className={`${NavStyleDron}`}>
        <button
          data-collapse-toggle="navbar-hamburger"
          type="button"
          className="inline-flex items-center justify-center p-2 w-10 h-10 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-hamburger"
          aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full" id="navbar-hamburger">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded dark:bg-blue-600"
                aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
