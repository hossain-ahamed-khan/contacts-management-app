import React from 'react';
import { contacts } from "../../lib/contacts";
import ContactCard from '../cards/ContactCard';

const Contacts = () => {
    return (
        <div>
            <h1 className="text-center text-3xl font-bold my-6">Contacts</h1>

            <div className="container mx-auto mt-10 grid grid-cols-1 gap-6">
                {
                    contacts.map((contact) => (
                        <ContactCard contact={contact} key={contact.phone_number}></ContactCard>
                    ))
                }
            </div>

        </div>
    );
};

export default Contacts;