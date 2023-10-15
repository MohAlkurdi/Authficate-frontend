import { Link } from "react-router-dom";
import { Features } from "./Features";

export const Hero = () => {
  return (
    <>
      <div className="bg-white min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 text-black p-10 rounded-lg shadow-lg text-center w-full h-half flex flex-col items-center justify-center">
        <h1 className="text-6xl mb-4 font-semibold">Authficate</h1>
        <p className="text-2xl font-light">
          A verification system built with Laravel, React, and Tailwind CSS.
        </p>
        <Link
          to="register"
          className="mt-20 w-1/2 bg-blue-200 hover:bg-blue-300 text-white font-bold py-4 px-8 rounded"
        >
          Get started
        </Link>
      </div>

      <Features />
    </>
  );
};
