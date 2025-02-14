"use client";

import { getAllUsers } from '@/apis'
import Button from '@/components/Button';
import { usersData } from '@/utils/user';
import { Icon } from '@iconify-icon/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Dashboard() {
    const router = useRouter()
    const [users, setUsers] = useState([]);
    const [formState, setFormState] = useState("")

    let token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            const fetchUsers = async () => {
                const response = await getAllUsers(token);
                setUsers(response.getUser);
            }
            fetchUsers();
        }
    }, []);


    const [originalUsers, setOriginalUsers] = useState([]);
    
    useEffect(() => {
        if (users.length > 0) {
            setOriginalUsers(users);
        }
    }, [users]);

    const handleFilterChange = (e) => {
        const selectedRole = e.target.value;
        if (!selectedRole) {
            setUsers(originalUsers);
            return;
        }
        
        const filteredUsers = originalUsers.filter(user => 
            user.type === String(selectedRole)
        );
        setUsers(filteredUsers);
    }

    const handleOnSearch = (e) => {
        e.preventDefault();
        if (!formState.trim() || formState === "" || !formState) {
            setUsers(originalUsers);
            return;
        }

        const searchTerm = formState.toLowerCase().trim();
        const filteredUsers = originalUsers.filter(user => 
            user.fname?.toLowerCase().includes(searchTerm) ||
            user.lname?.toLowerCase().includes(searchTerm) ||
            user.email?.toLowerCase().includes(searchTerm) ||
            user.phone?.toLowerCase().includes(searchTerm)
        );
        setUsers(filteredUsers);
    }

    if(!token){
        router.push("/")
    }
    return (
        <div className='min-h-screen bg-gray-50 p-8 sm:p-20'>
            <header className='mb-8'>
                <h1 className='text-2xl sm:text-3xl font-semibold text-green-600'>Welcome back User</h1>
            </header>

            <div className='bg-white rounded-lg shadow-md p-6'>
                <form className="mb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className='flex items-center gap-3'>
                            <Icon icon="mdi:filter" width="24" height="24" className="text-green-600" />
                            <select className="px-4 py-2 border rounded-md hover:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600" onChange={handleFilterChange}>
                                <option value="">Filter by role</option>
                                {usersData.map(item => (
                                    <option key={item.type} value={item.type}>{item.role}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex w-full sm:w-1/2 gap-2">
                            <input
                                type="text"
                                onChange={(e) => setFormState(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md hover:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                                placeholder="Search users..."
                            />
                            <Button 
                                title="Search" 
                                classNames="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors" 
                                onClick={handleOnSearch} 
                            />
                        </div>
                    </div>
                </form>

                <h2 className='text-xl font-semibold mb-4 text-gray-800'>Registered Users</h2>
                <div className='overflow-x-auto'>
                    <table className='min-w-full'>
                        <thead>
                            <tr className='border-b border-gray-200'>
                                <th className='py-3 px-4 text-left text-green-600'>Firstname</th>
                                <th className='py-3 px-4 text-left text-green-600'>Lastname</th>
                                <th className='py-3 px-4 text-left text-green-600'>Email</th>
                                <th className='py-3 px-4 text-left text-green-600'>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map(item => (
                                <tr key={item.id} className='border-b border-gray-100 hover:bg-gray-50'>
                                    <td className='py-3 px-4'>{item.fname}</td>
                                    <td className='py-3 px-4'>{item.lname}</td>
                                    <td className='py-3 px-4'>{item.email}</td>
                                    <td className='py-3 px-4'>{item.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard