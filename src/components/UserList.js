"use client";
import React, { useEffect, useState } from 'react'
import User from './user'



function UserList() {
    const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";
    const [users, setUsers] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setloading(true);
            try {
                const response = await fetch(USER_API_BASE_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const users = await response.json();
                console.log(users);
                setUsers(users);

            } catch (error) {
                console.log(error);
                setloading(false);
            }
        };
        fetchData();
    }, []);

    //the [] dependency makes calls to be done once

    return (
        <div className='container mx-auto my-8'>
            <div className='flex shadow border-b'>
                <table className=' min-w-full'>
                    <thead className='bg-gray-300'>
                        <tr>
                            <th className='text-left font-medium text-gray-700 uppercase tracking-wide py-3 px-6'>First Name</th>
                            <th className='text-left font-medium text-gray-700 uppercase tracking-wide py-3 px-6'>Last Name</th>
                            <th className='text-left font-medium text-gray-700 uppercase tracking-wide py-3 px-6'>Email Id</th>
                            <th className='text-left font-medium text-gray-700 uppercase tracking-wide py-3 px-6'>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody className='bg-white'>
                            {users?.map((user) => (
                                // then add a prop to the User component
                                <User user={user} key={user.id} />
                            ))}

                        </tbody>
                    )}
                </table>
            </div>
        </div>
    )
}

export default UserList