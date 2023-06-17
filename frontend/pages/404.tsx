import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-3xl text-error lg:text-6xl">404</h1>

          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span className="text-red-500">Oops!</span> Page não encontrada
          </h6>

          <p className="mb-4 text-center text-gray-500 md:text-lg">
            Esta página não existe.
          </p>

          <Link href="/" className="px-5 py-2 rounded-md bg-warning text-black">
            Ir para início
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
