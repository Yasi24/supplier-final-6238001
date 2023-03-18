import Head from 'next/head'
import Link from 'next/link'


export default function Home({ suppliers }) {
  function deleteSupplier(id) {
    fetch(`/api/suppliers/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        window.location.reload(false);
      });
  }

  return (
    <>
      <Head>
        <title>Suppliers</title>
      </Head>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/suppliers/add">+ Add Supplier</Link>
          </li>
        </ul>
      </nav>
      <main>
        <h1>Suppliers</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(supplier => {
              return (
                <tr key={supplier._id}>
                  <td>
                    <Link href={`/Supplier/${supplier._id}`}>
                      {supplier.name}
                    </Link>
                  </td>
                  <td>{supplier.address}</td>
                  <td>{supplier.phonenumber}</td>
                  <td>
                    <>
                      <Link href={`/suppliers/update/${supplier._id}`}>Update</Link>
                      &nbsp;&nbsp;&nbsp;
                      <button onClick={() => deleteSupplier(supplier._id)}>Delete</button>
                    </>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #2e2e2e;
          color: white;
          padding: 1rem;
        }

        nav ul {
          display: flex;
          list-style-type: none;
          margin: 0;
          padding: 0;
        }

        nav li {
          margin-right: 1rem;
        }

        nav li:last-child {
          margin-right: 0;
        }

        nav a {
          color: white;
          text-decoration: none;
        }

        main {
          padding: 1rem;
        }

        table {
          border-collapse: collapse;
          width: 100%;
        }

        th,
        td {
          text-align: left;
          padding: 0.5rem;
          border-bottom: 1px solid #ddd;
        }

        th {
          background-color: #f2f2f2;
        }

        td:last-child {
          text-align: center;
        }

        button {
          background-color: #f44336;
          color: white;
          border: none;
          padding: 0.5rem;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #d32f2f;
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://supplier-final-6238001.vercel.app/api/suppliers/index`);
  const suppliers = await res.json();
  return { props: { suppliers } };
}