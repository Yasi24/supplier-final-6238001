import Head from "next/head";
import Link from "next/link";

export default function Supplier({ supplier }) {
  console.log("supplier 2", supplier);
  if (!supplier)
    return (
      <div>
        <p>Supplier not found</p>
        <Link href="/suppliers">Back</Link>
      </div>
    );

  return (
    <>
      <Head>
        <title>{supplier.name}</title>
      </Head>
      <div className="container">
        <h1>{supplier.name}</h1>
        <p>{supplier.address}</p>
        <p>{supplier.phonenumber}</p>
        <Link href="/suppliers">
          <a className="back-link">Back</a>
        </Link>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: Arial, sans-serif;
          text-align: center;
        }

        h1 {
          font-size: 4rem;
          margin-bottom: 2rem;
          color: #333;
        }

        p {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          color: #666;
        }

        .back-link {
          padding: 1rem 2rem;
          margin-top: 2rem;
          font-size: 1.5rem;
          color: #fff;
          background-color: #333;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          text-decoration: none;
        }

        .back-link:hover {
          background-color: #666;
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps({ params }) {
  console.debug("params", params);
  const res = await fetch(`http://supplier-final-6238001.vercel.app/api/suppliers/${params.id}`);
  const supplier = await res.json();
  console.debug("supplier 1", supplier);
  return { props: { supplier } };
}