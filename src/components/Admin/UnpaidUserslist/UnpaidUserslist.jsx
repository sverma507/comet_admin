import React, { useEffect, useState } from 'react';
import Sidebar from '../AdminSidebar/Sidebar';
import axios from 'axios';

const UnpaidUsersList = () => {
    const [unpaidUsers, setUnpaidUsers] = useState([]);

    const getUnpaidUsers = async () => {
        try {
            const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/admin/all-unactive-users`);
            setUnpaidUsers(result.data.users);
        } catch (err) {
            console.log("Error while getting unpaid users", err);
        }
    };

    useEffect(() => {
        getUnpaidUsers();
    }, []);

    return (
        <div className="flex min-h-screen gap-4">
        <Sidebar className="fixed w-60 h-full"  />
        <div className="ml-60 container mx-auto p-4">
                <div className="flex justify-between items-center bg-green-500 text-white text-sm font-bold px-4 py-3">
                    <h3>Unpaid User List</h3>
                   
                </div>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-center">Sn No.</th>
                            <th className="py-3 px-6 text-center">User Id</th>
                            <th className="py-3 px-6 text-center">Sponser Id</th>
                            <th className="py-3 px-6 text-center">Email</th>
                            <th className="py-3 px-6 text-center">Mobile No.</th>
                            <th className="py-3 px-6 text-center">Joining Date/Time</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {unpaidUsers.length > 0 ? (
                            unpaidUsers.map((user, index) => (
                                <tr key={user._id} className={`border-b border-gray-200 hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                    <td className="py-3 px-6 text-center">{index + 1}</td>
                                    <td className="py-3 px-6 text-center">{user.referralCode}</td>
                                    <td className="py-3 px-6 text-center">{user.referredBy}</td>
                                    <td className="py-3 px-6 text-center">{user.email}</td>
                                    <td className="py-3 px-6 text-center">{user.phone}</td>
                                    <td className="py-3 px-6 text-center">{new Date(user.createdAt).toLocaleDateString()} - {new Date(user.createdAt).toLocaleTimeString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4">No unpaid users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UnpaidUsersList;
