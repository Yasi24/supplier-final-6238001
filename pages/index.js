import Head from "next/head";
import Link from "next/link";
export default function Home() {
  return (
    <div className="center">
      <Head>
        <title>Final Exam - Supplier Page </title>
      </Head>
      <h1 className="name-title">Final Exam</h1>

      <Link className="supplier-link" href="/Supplier">
        Supplier
      </Link>
      <Link className="about-link" href="/about">
        About Me
      </Link>
    </div>
  );
}