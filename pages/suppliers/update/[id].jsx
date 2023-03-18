/*
Update page
It populates the blog data into the form.
*/
import Head from "next/head"
import Link from "next/link"

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";



// Step 2: This component is rendered from the server (Server-Side Rendering) SSR
export default function Supplier({ supplier }) {
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState("");


  const updateBlog = async (data) => {
    const response = await fetch(`/api/suppliers/${supplier._id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // serialisation
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const result = await response.json();   // deserialise
    if (result.error) {
      alert("Error: " + result.error)
    } else {
      alert("Supplier updated")
      window.location.href = "/suppliers"
    }
    console.log(result)
    setData(JSON.stringify(data))
  }

  console.log('blog 2', supplier)
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

<p>{JSON.stringify(supplier)}</p>
      <div style={{ margin: '1rem' }}>
        <form onSubmit={handleSubmit(updateBlog)}>
          <h1>Update Supplier</h1>
          <label htmlFor="name">Name</label><br />
          <input id="name" {...register("name", { required: true })}
            placeholder="Supplier Name"
          /><br />

          <label htmlFor="address">Address</label>
          <input id="address" {...register("address", { required: true })} placeholder="Address"/>
          <label htmlFor="phonenumber">Phone number</label><br />
          <input id="phonenumber" {...register("phonenumber")} placeholder="phone number"
            /><br />
          <input type="submit" />
          <p>{data}</p><br />
        </form>
      </div>

      <Link href="/suppliers">Back</Link>
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