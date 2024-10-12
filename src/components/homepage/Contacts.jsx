import React from 'react';
import ContactCard from '../cards/ContactCard';

const Contacts = async () => {

    const getContacts = async () => {
        const res = await fetch("http://localhost:3000/get-contacts/api", { cache: "no-store" })
        const data = res.json();
        return data;
    }

    const { contacts } = await getContacts();

    if (contacts?.length <= 0) {
        return null;
    }

    return (
        <div>
            <h1 className="text-center text-3xl font-bold my-6">Contacts</h1>

            <div className="container mx-auto mt-10 grid grid-cols-1 gap-6">
                {
                    contacts?.length > 0 && contacts?.map((contact) => (
                        <ContactCard contact={contact} key={contact._id}></ContactCard>
                    ))
                }
            </div>

        </div>
    );
};

export default Contacts;