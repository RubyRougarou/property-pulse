import Link from "next/link";

export const metadata = {
  title: "Properties",
};

export default function PropertiesPage() {
  return (
    <div>
      All properties...
      <div>
        <Link href={"/"} className={"m-8 text-blue-500"}>
          Back to Home Page
        </Link>
      </div>
      <div>
        <Link href={"/properties/add"} className={"m-8 text-blue-500"}>
          Add a new property
        </Link>
      </div>
      <div>
        <Link href={"/properties/12"} className={"m-8 text-blue-500"}>
          property #12
        </Link>
      </div>
    </div>
  );
}
