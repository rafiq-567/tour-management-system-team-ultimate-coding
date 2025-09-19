"use client"
import React from 'react';
import registerApi from '../actions/auth/registerApi';
import Swal from 'sweetalert2';

const RegisterForm = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        const payload = { username, email, password, role: "user" };
        const result = await registerApi(payload);
        
        if (!result) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "username or email already exits",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        } else {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
        }

    }
    return (
        <div className='p-3 border rounded-xl shadow'>
            <h3 className='text-xl font-bold text-center my-2'>Registration</h3>
            <form
                onSubmit={handleSubmit}
                className="space-y-3">
                <label htmlFor="username" className="block">
                    UserName
                </label>
                <input
                    className="block p-1 text-black border"
                    type="text"
                    name="username"
                    placeholder="Enter unique Email"
                />


                <label htmlFor="username" className="block">
                    Email
                </label>
                <input
                    className="block p-1 text-black border"
                    type="email"
                    name="email"
                    placeholder="Enter unique Email"
                />


                <label htmlFor="password" className="block">
                    Password
                </label>
                <input
                    className="block p-1 border  text-black"
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                <button type="submit" className="outline rounded-md p-2">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;