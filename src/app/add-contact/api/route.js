import { connectDB } from "@/lib/connectDB";

export const POST = async (request) => {

    const newContact = await request.json();

    try {
        const db = await connectDB();
        const contactsCollection = db.collection('contacts');
        const resp = await contactsCollection.insertOne(newContact);

        return Response.json({ message: "contact added" }, { status: 200 })
    }
    catch (error) {
        return Response.json({ message: "something went wrong", error }, { status: 500 })
    }
}