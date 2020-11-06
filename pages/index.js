import Link from "next/link";
import Layout from "../components/layout";

export default function Home() {
  return (
    <>
      <div>hello</div>
      <Link href="/about">About</Link>
    </>
  );
}
