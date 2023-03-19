import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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
        <title>Ahmad's Suppliers</title>
      </Head>
      <nav>
        <h3 className="title">Ahmad's Suppliers</h3>
        
        
        <a  href="/">Home</a>
            
        
      </nav>
      <main>
      
        <button><Link href="/suppliers/add">+ Add Supplier</Link></button>
          
        <table className="suppliers-table">
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
                  <td className="center">{supplier.name}</td>
                  <td className="center">{supplier.address}</td>
                  <td className="center">{supplier.phonenumber}</td>
                  <td>
                    <>
                      <Link href={`/suppliers/update/${supplier._id}`}>
                        <button className="update-btn">Update</button>
                      </Link>
                      &nbsp;&nbsp;&nbsp;
                      <button className="delete-btn" onClick={() => deleteSupplier(supplier._id)}>Delete</button>
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
            background-color: #57a8cc;
            color: white;
            padding: 1rem;
            font-size: 1.5rem;
          }
          
          nav ul {
            display: flex;
            list-style-type: none;
            margin: 0;
            padding: 0;
          }
          
          nav li {
            
            margin-right: 0.5srem;
            text-color: yellow;
            size: 10px;
          }
          nav a {
            color: white;
            text-decoration: none;
            font-weight: bold;
          }
          
          nav a:hover {
            color: yellow;
            text-decoration: underline;
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
            margin: 0 auto;
            background-color: #f2f2f2;
            width: 100%;
          }
          .linked1 {
            text-decoration: none;
          }
          th,
          td {
            text-align: center;
            padding: 1rem;
            border-bottom: 1px solid #ddd;
          }
          
          th {
            background-color: #2e2e2e;
            color: white;
            font-weight: bold;
          }
          
          td:last-child {
            text-align: center;
          }
          
          button.update-btn {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 0.5rem;
            border-radius: 4px;
            cursor: pointer;
          }
          
          button.update-btn:hover {
            background-color: #3e8e41;
          }
          
          button.delete-btn {
            background-color: #f44336;
            color: white;
            border: none;
            padding: 0.5rem;
            border-radius: 4px;
            cursor: pointer;
          }
          
          button.delete-btn:hover {
            background-color: #d32f2f;
          }
          
          .suppliers-table td:nth-child(1),
          .suppliers-table td:nth-child(2),
          .suppliers-table td:nth-child(3) {
            text-align: center;
          }
          
      `}</style>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/suppliers/`);
  const suppliers = await res.json();
  return { props: { suppliers } };
}