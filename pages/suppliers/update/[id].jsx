/*
Update page
It populates the blog data into the form.
*/
import Head from "next/head"
import Link from "next/link"

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Supplier({ supplier }) {
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState("");

  const updateBlog = async (data) => {
    const response = await fetch(`/api/suppliers/${supplier._id}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.error) {
      alert("Error: " + result.error)
    } else {
      alert("Supplier updated")
      window.location.href = "/suppliers"
    }
    console.log(result)
    setData(JSON.stringify(data))
  }

  if (!supplier) return (
    <div>
      <p>Supplier not found</p>
      <Link href="/suppliers">Back</Link>
    </div>
  );

  return (
    <>
      <Head>
        <title>Update {supplier.name}</title>
      </Head>

      <div className="container">
        <form onSubmit={handleSubmit(updateBlog)}>
          <h1>Update Supplier</h1>
          <label htmlFor="name">Name</label>
          <input id="name" {...register("name", { required: true })}
            placeholder="Supplier Name"
          />

          <label htmlFor="address">Address</label>
          <input id="address" {...register("address", { required: true })} placeholder="Address"/>
          <label htmlFor="phonenumber">Phone number</label>
          <input id="phonenumber" {...register("phonenumber")} placeholder="phone number"
            /><br />
          <input type="submit" />
          <p>{data}</p><br />
          <Link href="/suppliers">Back</Link>
        </form>
      </div>

      

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 6rem;
          
        }

        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          
          
        }

        input[type="submit"] {
          
          padding: 0.5rem 1rem;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        input[type="submit"]:hover {
          background-color: #3e8e41;
        }

        label {
          margin-top: 1rem;
          font-weight: bold;
        }

        input {
          margin-top: 0.5rem;
          padding: 0.5rem;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        
      `}</style>
    </>
  )
}


// STEP 1: This function will be executed at the server before loading the page.
export async function getServerSideProps({ params }) {
  console.debug('params', params)
  const res = await fetch(`http://supplier-final-6238001.vercel.app/api/suppliers/${params.id}`)
  const supplier = await res.json()
  console.debug('blog 1', supplier)
  return { props: { supplier } }
}