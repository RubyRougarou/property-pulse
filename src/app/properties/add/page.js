import Link from "next/link";

export default function AddPropertyPage() {
  return (
    <div>
      Add a new property
      <div>
        <Link href={"/"} className={"m-8 text-blue-500"}>
          Back to Home Page
        </Link>
      </div>
    </div>
  );
}
