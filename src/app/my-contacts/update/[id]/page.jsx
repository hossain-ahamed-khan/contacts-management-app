"use client"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Page = ({ params }) => {
    const { register, handleSubmit } = useForm();
    const [contact, setContact] = useState([])

    const loadContact = async () => {
        const contactDetails = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/my-contacts/api/contact/${params.id}`, { cache: "no-store" })
        const data = await contactDetails.json();
        setContact(data.data);
    }

    useEffect(() => {
        loadContact()
    }, [params])

    const onSubmit = async (data) => {

        const updateContact = {
            name: data.name,
            email: data.email,
            phone_number: data.phone,
            address: data.address,
            profile_picture: data.imageURL,
        }

        const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/my-contacts/api/contact/${params.id}`, {
            cache: "no-store",
            method: "PATCH",
            body: JSON.stringify(updateContact),
            headers: {
                "content-type": "application/json"
            }
        })
        if (resp.status === 200) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${data.name} Updated successfully`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    return (
        <div className="w-1/2 mx-auto">
            <h1 className="text-4xl font-bold text-center mt-3">Update Contact</h1>
            <div className="min-h-screen p-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-2">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Name*</span>
                            </div>
                            <input {...register("name", { required: true })} type="text" placeholder="name" className="input input-bordered w-full" defaultValue={contact.name} />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered w-full" defaultValue={contact.email} />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Phone Number*</span>
                            </div>
                            <input {...register("phone", { required: true })} type="text" placeholder="phone number" className="input input-bordered w-full" defaultValue={contact.phone_number} />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Address*</span>
                            </div>
                            <input {...register("address", { required: true })} type="text" placeholder="address" className="input input-bordered w-full" defaultValue={contact.address} />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Profile picture URL*</span>
                            </div>
                            <input {...register("imageURL", { required: true })} type="text" placeholder="image URL " className="input input-bordered w-full" defaultValue={contact.profile_picture} />
                        </label>

                    </div>

                    <button type="submit" className="btn bg-[#4479e1] text-white mt-3" >
                        Update Contact
                    </button>
                </form>
            </div >
        </div >
    );
};

export default Page;