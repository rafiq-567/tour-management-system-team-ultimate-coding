import TourPackeg from "@/componets/TourPackeg";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>hello ultimate coding team members</div>
      <Link className=" flex justify-center " href="/TourPackeg">
        Tour packeg
      </Link>
    </>
  );
}
