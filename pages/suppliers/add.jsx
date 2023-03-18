import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function AddSupplierPage() {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");

    const saveSupplier = async (data) => {
        const response = await fetch('/api/suppliers', {
            method: "POST",
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
            alert("Supplier saved")
            window.location.href = "/suppliers"
        }
        console.log(result)
        setData(JSON.stringify(data))
    }

    return (
        <div className="bg">
        <div className="container">
          <h1 className="title">New Supplier</h1>
          <form onSubmit={handleSubmit(saveSupplier)} className="form">
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <label className = "headingtext" htmlFor="name">Supplier name</label>
                  </td>
                  <td>
                    <input id="name" {...register("name", { required: true })} placeholder="Supplier Name" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className = "headingtext" htmlFor="address">Address</label>
                  </td>
                  <td>
                    <input id="address" {...register("address", { required: true })} placeholder="Address" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className = "headingtext" htmlFor="phonenumber">Phone number</label>
                  </td>
                  <td>
                    <input id="phonenumber" {...register("phonenumber")} placeholder=" Phone number" />
                  </td>
                </tr>
              </tbody>
            </table>
            <input type="submit" className="button" />
            <Link href="/suppliers">Back</Link>
            <p>{data}</p>
          </form>
          <style>
            {`

            .bg {
                padding-top:200px;
                background-color: #f5f5f5;
                width: 100%;
                height: 100vh;
            }
            
              .container {
                margin-left: 10px;
                margin-right: 10px;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
                margin: auto;
                max-width: 500px;
              }
              .headingtext {
                color: #000000;
              }
              .title {
                margin-top: 0;
                text-align: center;
              }
              .form {
                display: flex;
                flex-direction: column;
                align-items: center;
              }
              .table {
                width: 100%;
              }
              label {
                font-weight: bold;
                display: block;
              }
            
              input {
                padding: 10px;
                margin-bottom: 10px;
                width:80%;
                border: 1px solid #ccc;
                border-radius: 5px;
                
              }
              .button {
                padding: 10px;
                background-color: #008CBA;
                color: #fff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                position: center;
                width: 50%
              }
              .button:hover {
                background-color: #00698c;
              }
              p {
                font-size: 14px;
                color: #666;
                margin-top: 10px;
                text-align: center;
              }
            `}
          </style>
        </div>
        </div>
      );
}