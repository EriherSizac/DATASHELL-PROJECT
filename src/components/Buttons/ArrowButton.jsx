"use client";
import Link from "next/link";
export default function ArrowButton({ href, text, className }) {
  return (
    <Link
      href={href}
      className={` flex justify-center items-center text-center transition duration-100 hover:italic hover:font-bold hover:text-yellow-400`}
    >
      <svg
        className="w-9 h-7"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"
        ></path>
      </svg>
      {text}
    </Link>
  );
}
