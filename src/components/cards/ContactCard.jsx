"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Swal from 'sweetalert2';

const ContactCard = ({ contact }) => {

    const { _id, name, email, phone_number, address, profile_picture } = contact || {};

    const handleDelete = async (id) => {
        const deleted = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/my-contacts/api/contact/${id}`, {
            cache: "no-store",
            method: "DELETE",
        })
        const resp = await deleted.json();
        if (resp?.response?.deletedCount > 0) {
            Swal.fire({
                position: "center",
                title: "contact Deleted successfully",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl border-2 border-red-500">
            <figure>
                <Image
                    className="rounded-2xl"
                    height={120}
                    width={120}
                    src={profile_picture}
                    alt={name}
                    priority={true}
                ></Image>
            </figure>
            <div className="flex w-full">
                <div className="card-body w-11/12">
                    <h2 className="text-3xl font-bold">{name}</h2>
                    <p><span className='font-bold'>Email: </span>{email}</p>
                    <p><span className='font-bold'>Phone: </span>{phone_number}</p>
                    <p><span className='font-bold'>Address: </span>{address}</p>
                </div>
                <div className="card-body w-1/12 flex flex-col justify-center items-center">
                    <div>
                        <Link href={`/my-contacts/update/${_id}`}><button><FaEdit className='text-[#009de4] text-2xl hover:text-[#009ce48c]' /></button></Link>
                    </div>
                    <div>
                        <button onClick={() => handleDelete(_id)}><MdDeleteOutline className='text-[#ef4c53] text-3xl hover:text-[#ef4c548e]' /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;