"use client";
import React from 'react'

function User({user, deleteUser, editUser}) {
    return (
        
            <tr key={user.id}>
                <td className='text-left px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>{user.firstname}</div>
                </td>
                <td className='text-left px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>{user.lastname}</div>
                </td>
                <td className='text-left px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>{user.emailId}</div>
                </td>
                <td className='text-left px-6 py-4 whitespace-nowrap'>
                    <a onClick={(e,id) => editUser(e, user.id)} 
                    className='text-indigo-600 hover:text-indigo-800 hover:cursor-pointer pr-4'>Edit</a>
                    <a onClick={(e,id) => deleteUser(e, user.id)} 
                    className='text-red-600 hover:text-red-800 hover:cursor-pointer'>Delete</a>
                </td>
            </tr>
        
    )
}

export default User