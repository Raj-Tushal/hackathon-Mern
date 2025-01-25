import {  FaFlag  } from "react-icons/fa";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";
export function ErrorPage() {
    const { error } = useSelector((state) => state.auth);
  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8">
      <div>
        <FaFlag className="w-20 h-20 mx-auto" />
        <h1 className="text-3xl font-semibold mt-10">Error {error.status || 500}</h1>
        <p className="text-lg mt-4 text-gray-500">
           {error.message || "Something went wrong"}
        </p>
        <Link to="/" >
        <button color="blue" className="mt-8 w-full md:w-[8rem] bg-gray-900 text-white rounded-lg py-1 dark:bg-white dark:text-black " > 
          Back Home
        </button>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
