import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../AdminSidebar/Sidebar';
import moment from 'moment';

const AllRequestList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllRequests = async () => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/admin/all-recharge-history`);

            console.log("transactions=>", result);
            setTransactions(result.data.data);
            setLoading(false);
        } catch (err) {
            console.log("Error while getting the transactions", err);
            setLoading(false);
        }
    };


    useEffect(() => {
        getAllRequests();
    }, []);

    return (
        <div className="flex min-h-screen gap-6">
        {/* Sidebar */}
        <Sidebar className="fixed w-60 h-full" />
      
        {/* Main content */}
        <div className="ml-60 p-4 flex-1">
            
            <h2 className="text-2xl font-bold mb-4">All Transactions</h2>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <table className="min-w-full  bg-slate-500">
                    <thead>
                        <tr>
                            <th className="py-2">Sr#</th>
                            <th className="py-2">User Id</th>
                            <th className="py-2">Amount</th>
                            <th className="py-2">ActivatedBy</th>
                            <th className="py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length > 0 ? (
                            transactions.map((transaction, index) => (
                                <tr key={transaction._id}>
                                    <td className="py-2 text-center text-white">{index + 1}</td>
                                    <td className="py-2 text-center text-white">{transaction.referralCode}</td>
                                    <td className="py-2 text-center text-white">$ {transaction.amount}</td>
                                    <td className="py-2 text-center text-white">{transaction.activatedBy}</td>
                                    <td className="py-2 text-center text-white"> {moment(transaction.createdAt).format("YYYY-MM-DD")}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">No Recharge found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
        </div>
    );
};

export default AllRequestList;
