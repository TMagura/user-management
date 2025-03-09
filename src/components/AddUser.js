"use client";
import { Dialog, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import UserList from './UserList';

function AddUser() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({
        id: "",
        firstname: "",
        lastname: "",
        emailId: ""
    });
    //handle refresh of the UserList
    const [responseUser, setResponseUser] = useState({
        id: "",
        firstname: "",
        lastname: "",
        emailId: ""
    })

    //function to handle change on values from user input
    const handleChange = (event)=>{
        const value = event.target.value;
        setUser({...user, [event.target.name]:value });
    };

    function closeModal() {
        setIsOpen(false);
    }
    function openModal() {
        setIsOpen(true);
    }

    const saveUser = async (e)=>{
        //to avaid refreshing the page use
        e.preventDefault();
        const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";
        const response = await fetch(USER_API_BASE_URL, {
            method: "POST", 
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error("Something went wrong")
        }
        const _user = response.json();
        setResponseUser(_user);
        closeModal();
        reset();
    };

    const reset =(e)=>{
        e.preventDefault();
        setUser({
            id:"",
            firstname:"",
            lastname:"",
            emailId:""
        });

       closeModal();
    }

    return (
        <> {/*<!--use this fragment to allow 2 or more seperate divs in a component-->*/}
            <div className='container mx-auto my-8'>
                <div className='h-12'>
                    <button onClick={openModal} className='rounded bg-green-600 text-white px-6 py-2 font-semibold'>Add User</button>
                </div>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
                    <div className='min-h-screen px-4 text-center'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'>
                            <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md'>
                                <DialogTitle as='h3' className="text-lg font-medium leading-6 text-gray-900" >Add new User</DialogTitle>
                                <div className='flex max-w-md max-auto'>
                                    <div className='py-2'>
                                        <div className='h-14 my-4'>
                                            <label className='block text-gray-600 text-sm font-normal'>First Name</label>
                                            <input type='text' 
                                            name='firstname' 
                                            value={user.firstname} 
                                            onChange={(e)=>handleChange(e)}
                                            className='h-10 w-96 border border-blue-500 rounded mt-2 px=2 py-2 text-gray-800'></input>
                                        </div>
                                        <div className='h-14 my-4'>
                                            <label className='block text-gray-600 text-sm font-normal'>Last Name</label>
                                            <input type='text' 
                                            name='lastname' 
                                            value={user.lastname} 
                                            onChange={(e)=>handleChange(e)}
                                            className='h-10 w-96 border border-blue-500 rounded mt-2 px=2 py-2 text-gray-800'></input>
                                        </div>
                                        <div className='h-14 my-4'>
                                            <label className='block text-gray-600 text-sm font-normal'>Email Id</label>
                                            <input type='email' 
                                            name='emailId' 
                                            value={user.emailId} 
                                            onChange={(e)=>handleChange(e)}
                                            className='h-10 w-96 border border-blue-500 rounded mt-2 px=2 py-2 text-gray-800'></input>
                                        </div>
                                        <div className='h-14 my-4 space-x-4 pt-4'>
                                            <button 
                                            onClick={saveUser}
                                            className='rounded text-white font-semibold bg-green-400 hover:bg-green-600 py-2 px-6'> Save </button>
                                            <button 
                                            onClick={reset}
                                            className='rounded text-white font-semibold bg-red-400 hover:bg-red-600 py-2 px-6'> Close </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
            <UserList user={responseUser}/>
        </>
    )
}

export default AddUser