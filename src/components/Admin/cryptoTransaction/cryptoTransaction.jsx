import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../AdminSidebar/Sidebar';
import { toast, Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import moment from 'moment';

const AllCryptoTransaction = () => {
    const [transactions, setTransactions] = useState([]); 
    const { user } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(true);

    // Fetch transactions from the API
    const getTransactions = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/admin/all-withdrawl-history`);
            console.log('res ==> ', response.data);
            return response.data.data; 
        } catch (error) {
            console.error('Error fetching transactions:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (error) {
            toast.error('Failed to fetch transactions.');
        }
    };

    // Function to update transaction status
    const updateTransactionStatus = async (transactionId, status) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/admin/update-transaction-status`, {
                transactionId,
                status
            });

            if (response.status === 200) {
                toast.success(`Transaction ${status.toLowerCase()} successfully!`);
                // Update the transaction status in the UI
                setTransactions(transactions.map(txn => txn._id === transactionId ? { ...txn, status } : txn));
            }
        } catch (error) {
            console.error('Error updating transaction status:', error);
            toast.error('Failed to update transaction status.');
        }
    };

    return (
        <div className="flex min-h-screen gap-6">
            {/* Sidebar */}
            <Sidebar className="fixed w-60 h-full" />

            {/* Main content */}
            <Toaster />
            <div className="ml-60 p-4 flex-1">
                <h3 className="text-xl md:text-2xl font-semibold mb-4">Withdrawal History</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-2 py-1 md:px-4 md:py-2">#</th>
                                <th className="px-2 py-1 md:px-4 md:py-2">User ID</th>
                                <th className="px-2 py-1 md:px-4 md:py-2">Withdrawal</th>
                                <th className="px-2 py-1 md:px-4 md:py-2">Charge</th>
                                <th className="px-2 py-1 md:px-4 md:py-2">Amount</th>
                                <th className="px-2 py-1 md:px-4 md:py-2">Status</th>
                                <th className="px-2 py-1 md:px-4 md:py-2">Date</th>
                                <th className="px-2 py-1 md:px-4 md:py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length > 0 ? (
                                transactions.map((history, index) => (
                                    <tr
                                        className="thteamInvite border-b text-center border-gray-400 text-black"
                                        key={history._id}
                                    >
                                        <td className="p-2">{index + 1}</td>
                                        <td className="p-2">{history.userId}</td>
                                        <td className="p-2">{parseFloat(history.amount).toFixed(2)}</td>
                                        <td className="p-2">5 %</td>
                                        <td className="p-2">
                                            $ {parseFloat((history.amount) - (history.amount) * 5 / 100).toFixed(2)}
                                        </td>
                                        <td className="p-2">{history.status}</td>
                                        <td className="p-2">
                                            {moment(history.createdAt).format("YYYY-MM-DD")}
                                        </td>
                                        <td className="p-2 flex gap-2 justify-center">
                                            <button
                                                className="px-2 py-1 bg-green-500 text-white rounded"
                                                onClick={() => updateTransactionStatus(history._id, 'Approved')}
                                                disabled={history.status === 'Approved'}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="px-2 py-1 bg-red-500 text-white rounded"
                                                onClick={() => updateTransactionStatus(history._id, 'Rejected')}
                                                disabled={history.status === 'Rejected'}
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-2 py-1 md:px-4 md:py-2 text-center">No transactions found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllCryptoTransaction;
