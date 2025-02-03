import Link from "next/link";

import { FaArrowLeft } from "react-icons/fa";

const GoBack = ({ to }) => {
  // Makes a word to start with capital letter
  const uppercaseTo = to[0].toUpperCase() + to.substring(1);

  return (
    <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href={`/${to}`}
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <FaArrowLeft className={"mr-2"} /> Back to {uppercaseTo}
        </Link>
      </div>
    </section>
  );
};

export default GoBack;
