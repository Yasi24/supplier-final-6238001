import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="center">
      <Head>
        <title>Final Exam - Supplier Page</title>
      </Head>
      <h1 className="name-title">Final Exam</h1>
      <h3><b>Ahmad Yasi Faizi</b>, 6238001</h3>
      <div className="button-container">
        <Link className="supplier-link" href="/suppliers">
          <button className="button">Supplier</button>
        </Link>
      </div>

      <style jsx>{`
        .center {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f2f2f2;
        }

        .name-title {
          font-size: 3rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        .button-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }

        .button {
          background-color: #4caf50;
          color: #ffffff;
          border: none;
          border-radius: 5px;
          padding: 0.5rem 1.5rem;
          font-size: 1.2rem;
          margin: 0.5rem;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .button:hover {
          transform: translateY(-3px);
        }

        .supplier-link {
          text-decoration: none;
        }

        .about-link {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
