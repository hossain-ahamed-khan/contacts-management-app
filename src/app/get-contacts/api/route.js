import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server";

export const GET = async () => {
    const db = await connectDB()
    const contactsCollection = db.collection('contacts')

    try {
        const contacts = await contactsCollection.find().toArray();
        return NextResponse.json({ contacts })
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "no data found", error })
    }
}