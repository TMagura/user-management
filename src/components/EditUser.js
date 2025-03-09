import {React, useState, useEffect} from 'react'
import { Transition } from '@headlessui/react';
import { Dialog } from '@headlessui/react';
import { TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import { DialogTitle } from '@headlessui/react';


function EditUser({userId, setResponseUser}) {
    const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";
     const [isOpen, setIsOpen] = useState(false);
        const [user, setUser] = useState({
            id: "",
            firstname: "",
            lastname: "",
            emailId: ""
        });

    function closeModal() {
        setIsOpen(false);
    }
    function openModal() {
        setIsOpen(true);
    }
    //function to handle change on values from user input
    const handleChange = (event) => {
        const value = event.target.value;
        setUser({ ...user, [event.target.name]: value });
    };

    useEffect(() => {
      const fetchData = async ()=>{
        try {
            const response = await fetch(USER_API_BASE_URL +"/"+userId,{
             method: "GET",
             headers: {"Content-Type":"application/json"},
            });
            const _user = await response.json();
            console.log(_user.firstname);
            setUser(_user);
            setIsOpen(true);
        } catch (error) {
            console.log(error);
        }
      };
      if (userId) {
        fetchData();
      }
    }, [userId]);

    const updateUser = async (e)=>{
       e.preventDefault();
       const response = await fetch(USER_API_BASE_URL +"/"+userId, {
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)

       });
       if (!response.ok) {
        throw new Error("Something went wrong")
       }
       const _user =await response.json();
       setResponseUser(_user);
       reset(e);
    }

    const reset =(e)=>{
        e.preventDefault();
        closeModal();
    }
    

    return (
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
                            <DialogTitle as='h3' className="text-lg font-medium leading-6 text-gray-900" >Update User</DialogTitle>
                            <div className='flex max-w-md max-auto'>
                                <div className='py-2'>
                                    <div className='h-14 my-4'>
                                        <label className='block text-gray-600 text-sm font-normal'>First Name</label>
                                        <input type='text'
                                            name='firstname'
                                            value={user.firstname}
                                            onChange={(e) => handleChange(e)}
                                            className='h-10 w-96 border border-blue-500 rounded mt-2 px=2 py-2 text-gray-800'></input>
                                    </div>
                                    <div className='h-14 my-4'>
                                        <label className='block text-gray-600 text-sm font-normal'>Last Name</label>
                                        <input type='text'
                                            name='lastname'
                                            value={user.lastname}
                                            onChange={(e) => handleChange(e)}
                                            className='h-10 w-96 border border-blue-500 rounded mt-2 px=2 py-2 text-gray-800'></input>
                                    </div>
                                    <div className='h-14 my-4'>
                                        <label className='block text-gray-600 text-sm font-normal'>Email Id</label>
                                        <input type='email'
                                            name='emailId'
                                            value={user.emailId}
                                            onChange={(e) => handleChange(e)}
                                            className='h-10 w-96 border border-blue-500 rounded mt-2 px=2 py-2 text-gray-800'></input>
                                    </div>
                                    <div className='h-14 my-4 space-x-4 pt-4'>
                                        <button
                                            onClick={updateUser}
                                            className='rounded text-white font-semibold bg-green-400 hover:bg-green-600 py-2 px-6'> Update </button>
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
    );
};

export default EditUser;