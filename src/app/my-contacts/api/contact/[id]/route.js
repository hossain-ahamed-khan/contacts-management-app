import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export const DELETE = async (request, { params }) => {
    const db = await connectDB();
    const contactsCollection = db.collection("contacts");

    try {
        const resp = await contactsCollection.deleteOne({ _id: new ObjectId(params.id) })
        return Response.json({ message: "deleted the contact", response: resp });
    }
    catch (error) {
        return Response.json({ message: "Something went wrong" });
    }
}


export const PATCH = async (request, { params }) => {
    const db = await connectDB();
    const contactsCollection = db.collection("contacts");

    const updateDoc = await request.json()

    try {
        const resp = await contactsCollection.updateOne(
            { _id: new ObjectId(params.id) },
            {
                $set: {
                    ...updateDoc
                },
            },
            {
                upsert: true
            }
        )
        return Response.json({ message: "updated the contact", response: resp });
    }
    catch (error) {
        return Response.json({ message: "Something went wrong" });
    }
}


export const GET = async (request, { params }) => {
    const db = await connectDB();
    const contactsCollection = db.collection("contacts");

    try {
        const resp = await contactsCollection.findOne({ _id: new ObjectId(params.id) })
        return Response.json({ message: "contact found", data: resp });
    }
    catch (error) {
        return Response.json({ message: "Something went wrong" });
    }
}