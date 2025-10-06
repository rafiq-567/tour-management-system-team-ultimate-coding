import Link from "next/link";

export default function AuthButtons({ isMobile }) {
  return (
    <>
      <li className={`${isMobile ? "w-full flex justify-center" : ""}`}>
        <Link href="/login">
          <button className="btn btn-primary rounded-xl">Login</button>
        </Link>
      </li>
      <li className={`${isMobile ? "w-full flex justify-center" : ""}`}>
        <Link href="/register">
          <button className="btn btn-neutral rounded-xl">Register</button>
        </Link>
      </li>
    </>
  );
}
