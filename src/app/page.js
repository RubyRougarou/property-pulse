import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      Home page
      <div>
        <Link href={"/properties"} className={"m-8 text-blue-500"}>
          See all properties
        </Link>
      </div>
    </div>
  );
}
