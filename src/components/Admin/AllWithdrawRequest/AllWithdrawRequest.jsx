import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../AdminSidebar/Sidebar";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import moment from "moment";

const AllWithdrawRequest = () => {
  const [transactions, setTransactions] = useState([]);
//   const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null); // State to track copied wallet

  // Fetch transactions from the API
  const getTransactions = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/all-withdrawl-history`
      );
    //   console.log("res ==> ", response.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
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
      toast.error("Failed to fetch transactions.");
    }
  };

  // Function to update transaction status
  const updateTransactionStatus = async (transactionId, status) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/update-transaction-status`,
        {
          transactionId,
          status,
        }
      );

      if (response.status === 200) {
        toast.success(`Transaction ${status.toLowerCase()} successfully!`);
        // Update the transaction status in the UI
        setTransactions(
          transactions.map((txn) =>
            txn._id === transactionId ? { ...txn, status } : txn
          )
        );
      }
    } catch (error) {
      console.error("Error updating transaction status:", error);
      toast.error("Failed to update transaction status.");
    }
  };

  // Function to copy wallet address
  const copyToClipboard = (walletAddress, id) => {
    navigator.clipboard.writeText(walletAddress);
    setCopiedId(id);
    toast.success("Wallet address copied!");
    // Reset the copied state after 2 seconds
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex min-h-screen gap-6">
      {/* Sidebar */}
      <Sidebar className="fixed w-60 h-full" />

      {/* Main content */}
      <Toaster />
      <div className="ml-60 p-4 flex-1">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">
          Withdrawal History
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-2 py-1 md:px-4 md:py-2">#</th>
                <th className="px-2 py-1 md:px-4 md:py-2">User ID</th>
                <th className="px-2 py-1 md:px-4 md:py-2 max-w-56">
                  Wallet Address
                </th>
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
                    <td className="p-2 text-center align-middle">
                      {index + 1}
                    </td>
                    <td className="p-2 text-center align-middle">
                      {history.userId}
                    </td>
                    <td className="p-2 max-w-56 break-words text-center align-middle">
                      <div className="flex flex-col items-center">
                        <span className="break-all w-full text-center">
                          {history.walletAddress}
                        </span>
                        <button
                          className={`mt-2 px-2 py-1 rounded text-white ${
                            copiedId === history._id
                              ? "bg-green-500"
                              : "bg-blue-500"
                          }`}
                          onClick={() =>
                            copyToClipboard(history.walletAddress, history._id)
                          }
                        >
                          {copiedId === history._id ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </td>
                    <td className="p-2 text-center align-middle">
                      {parseFloat(history.amount).toFixed(2)}
                    </td>
                    <td className="p-2 text-center align-middle">50 %</td>
                    <td className="p-2 text-center align-middle">
                      ${" "}
                      {parseFloat(
                        history.amount - (history.amount * 50) / 100
                      ).toFixed(2)}
                    </td>
                    <td className="p-2 text-center align-middle">
                      {history.status}
                    </td>
                    <td className="p-2 text-center align-middle">
                      {moment(history.createdAt).format("YYYY-MM-DD")}
                    </td>
                    <td className="p-2 mt-6">
  {history.status === "Approved" ? (
    <button
      className="px-2 py-1 bg-green-500 text-white rounded w-full cursor-not-allowed"
      disabled
    >
      Approved
    </button>
  ) : history.status === "Rejected" ? (
    <button
      className="px-2 py-1 bg-red-500 text-white rounded w-full cursor-not-allowed"
      disabled
    >
      Rejected
    </button>
  ) : (
    <>
      <button
        className="px-2 py-1 bg-green-500 mb-2 w-full text-white rounded"
        onClick={() => updateTransactionStatus(history._id, "Approved")}
      >
        Approve
      </button>
      <button
        className="px-2 py-1 bg-red-500 w-full text-white rounded"
        onClick={() => updateTransactionStatus(history._id, "Rejected")}
      >
        Reject
      </button>
    </>
  )}
</td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="px-2 py-1 md:px-4 md:py-2 text-center"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllWithdrawRequest;
