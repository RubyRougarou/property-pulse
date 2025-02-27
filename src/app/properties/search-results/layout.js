import SearchPropertyForm from "@/app/_components/SearchPropertyForm";
import { FaArrowCircleLeft } from "react-icons/fa";
import Link from "next/link";

const SearchedPropertiesLayout = ({ children }) => {
  return (
    <>
      <div
        className={
          "bg-blue-700 py-2 mx-auto flex items-center justify-between gap-80"
        }
      >
        <Link
          href={"/properties"}
          className={"flex items-center text-blue-200 hover:underline ml-6"}
        >
          <FaArrowCircleLeft className={"mr-2 mb-1"} /> Back to properties
        </Link>
        <SearchPropertyForm />
      </div>
      {children}
    </>
  );
};

export default SearchedPropertiesLayout;
