//import dbConnect from "@/lib/dbConnect"
//import Suppliers from "@/models/Suppliers"

import { connect, model, models, Schema } from "mongoose";
const connectionString = process.env.MONGODB_URI_SUPPLY

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method: ", req.method)

    if (req.method === 'GET') {
        const docs = await Suppliers.find()
        res.status(200).json(docs)
    } else if (req.method === 'POST') {
        // console.log(typeof(req.body))
        console.log("POST",req.body)
        const doc = await Suppliers.create(req.body)
        res.status(201).json(doc)
    } else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

const SupplierSchema = new Schema({
    name: String,
    address: String,
    phonenumber: String,
});


const Suppliers = models?.suppliers || model('suppliers', SupplierSchema);