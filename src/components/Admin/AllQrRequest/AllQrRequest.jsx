// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../AdminSidebar/Sidebar";
// import { toast, ToastContainer } from "react-toastify";
// import "./qrPaymentRequests.css";

// const AllQRPaymentRequests = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [selectedTransactions, setSelectedTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionType, setActionType] = useState("");
//   const [filterStatus, setFilterStatus] = useState("Processing"); // Default filter status
//   const [statusDropdown, setStatusDropdown] = useState("Processing");
//   const token = "YOUR_ADMIN_TOKEN"; // Replace with the actual token if needed

//   // Fetch QR payment requests from the API
//   const getQRPaymentRequests = async () => {
//     try {
//       const result = await axios.get(
//         `${process.env.REACT_APP_API_URL}/admin/qr-payment-requests`
//       );
//       setTransactions(Array.isArray(result.data.data) ? result.data.data : []);
//       setLoading(false);
//     } catch (err) {
//       console.log("Error while getting QR payment requests", err);
//       setLoading(false);
//     }
//   };

//   // Handle checkbox change
//   const handleCheckboxChange = (transaction, isChecked) => {
//     if (isChecked) {
//       setSelectedTransactions((prev) => {
//         if (!prev.some((item) => item._id === transaction._id)) {
//           return [...prev, transaction];
//         }
//         return prev;
//       });
//     } else {
//       setSelectedTransactions((prev) =>
//         prev.filter((item) => item._id !== transaction._id)
//       );
//     }
//   };

//   // Handle action button clicks
//   const handleActionClick = async (action) => {
//     setActionType(action);

//     try {
//       setLoading(true);

//       for (let i = 0; i < selectedTransactions.length; i++) {
//         const transaction = selectedTransactions[i];

//         const endpoint =
//           action === "Approve"
//             ? "/admin/qr-payment-approve"
//             : "/admin/qr-payment-reject";

//         const res = await axios.put(
//           `${process.env.REACT_APP_API_URL}${endpoint}`,
//           {
//             transactionId: transaction._id,
//           }
//         );

//         if (res.data.status) {
//           updateTransactionStatus(transaction._id, action === "Approve" ? "Approved" : "Rejected");
//           toast.success(`Transaction ${action === "Approve" ? "Approved" : "rejected"} successfully!`);
//         } else {
//           toast.error(res.data.message);
//         }
//       }
//     } catch (error) {
//       toast.error("Operation failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to update the status of a transaction locally
//   const updateTransactionStatus = (transactionId, newStatus) => {
//     setTransactions((prevTransactions) =>
//       prevTransactions.map((transaction) =>
//         transaction._id === transactionId
//           ? { ...transaction, paymentStatus: newStatus }
//           : transaction
//       )
//     );
//     setSelectedTransactions([]);
//   };

//   // Handle filter button click
//   const handleFilterClick = (status) => {
//     setFilterStatus(status);
//   };

//   // Handle dropdown change
//   const handleDropdownChange = async (e) => {
//     const newStatus = e.target.value;
//     setStatusDropdown(newStatus);
//     try {
//       setLoading(true);
//       const endpoint = newStatus === "Approve" ? "/admin/qr-payment-approve" : "/admin/qr-payment-reject";
      
//       await Promise.all(selectedTransactions.map(async (transaction) => {
//         const res = await axios.put(
//           `${process.env.REACT_APP_API_URL}${endpoint}`,
//           {
//             transactionId: transaction._id,
//           }
//         );

//         if (res.data.status) {
//           updateTransactionStatus(transaction._id, newStatus);
//           toast.success(`Transaction ${newStatus} successfully!`);
//         } else {
//           toast.error(res.data.message);
//         }
//       }));
//     } catch (error) {
//       toast.error("Operation failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch QR payment requests on component mount
//   useEffect(() => {
//     getQRPaymentRequests();
//   }, []);

//   // Filter transactions based on selected status
//   const filteredTransactions = (Array.isArray(transactions) ? transactions : []).filter(
//     (transaction) => transaction.paymentStatus === filterStatus
//   );

//   return (
//     <div className="flex min-h-screen gap-2 bg-gradient-to-b from-green-400 to-blue-500">
//       <Sidebar className="fixed w-60 h-full" />

//       <ToastContainer />
//       <div className="ml-60 p-4 flex-1">
//         <h2 className="text-2xl font-bold mb-6 text-center text-white">
//           QR Payment Requests
//         </h2>

//         {/* Filter Buttons */}
//         <div className="flex justify-center mb-6">
//           <button
//             className={`px-4 py-2 mx-2 rounded-xl ${
//               filterStatus === "Processing"
//                 ? "bg-blue-700 text-white"
//                 : "bg-gray-300"
//             }`}
//             onClick={() => handleFilterClick("Processing")}
//           >
//             Processing
//           </button>
//           <button
//             className={`px-4 py-2 mx-2 rounded-xl ${
//               filterStatus === "Approved"
//                 ? "bg-green-700 text-white"
//                 : "bg-gray-300"
//             }`}
//             onClick={() => handleFilterClick("Approved")}
//           >
//             Approved
//           </button>
//           <button
//             className={`px-4 py-2 mx-2 rounded-xl ${
//               filterStatus === "Rejected"
//                 ? "bg-red-500 text-white"
//                 : "bg-gray-300"
//             }`}
//             onClick={() => handleFilterClick("Rejected")}
//           >
//             Rejected
//           </button>
//         </div>

//         {loading ? (
//           <p className="text-center text-lg text-gray-500">Loading...</p>
//         ) : (
//           <table className="min-w-full bg-gray-300 border border-gray-300 rounded-lg shadow-md">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="py-3 px-4 border-b text-center text-gray-600">
//                   <input type="checkbox" disabled />
//                 </th>
//                 <th className="py-3 px-4 border-b text-center text-gray-600">
//                   Sr#
//                 </th>
//                 <th className="py-3 px-4 border-b text-center text-gray-600">
//                   User ID
//                 </th>
//                 <th className="py-3 px-4 border-b text-center text-gray-600">
//                   Date/Time
//                 </th>
//                 <th className="py-3 px-4 border-b text-center text-gray-600">
//                   Amount
//                 </th>
//                 <th className="py-3 px-4 border-b text-center text-gray-600">
//                   Status
//                 </th>
//                 {filterStatus === "Processing" && (
//                   <th className="py-3 px-4 border-b text-center text-gray-600">
//                     Update Status
//                   </th>
//                 )}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTransactions.length > 0 ? (
//                 filteredTransactions.map((transaction, index) => {
//                   const isSelected = selectedTransactions.some(
//                     (item) => item._id === transaction._id
//                   );

//                   return (
//                     <tr
//                       key={transaction._id}
//                       className={`${
//                         filterStatus === "Processing" && isSelected
//                           ? "bg-gray-100 text-blue-700"
//                           : ""
//                       } hover:bg-gray-100 hover:text-blue-700 cursor-pointer`}
//                     >
//                       <td className="py-2 px-4 border-b text-center">
//                         <input
//                           type="checkbox"
//                           checked={isSelected}
//                           onChange={(e) =>
//                             handleCheckboxChange(transaction, e.target.checked)
//                           }
//                           disabled={filterStatus !== "Processing"}
//                         />
//                       </td>
//                       <td className="py-2 px-4 border-b text-center">
//                         {index + 1}
//                       </td>
//                       <td className="py-2 px-4 border-b text-center">
//                         {transaction.userCode}
//                       </td>
//                       <td className="py-2 px-4 border-b">
//                         {new Date(transaction.createdAt).toLocaleDateString()}{" "}
//                         {new Date(transaction.createdAt).toLocaleTimeString()}
//                       </td>
//                       <td className="py-2 px-4 border-b text-center">
//                         ₹{transaction.amount}
//                       </td>
//                       <td
//                         className={`py-2 px-4 border-b text-center ${
//                           transaction.paymentStatus === "Approved"
//                             ? "text-green-500"
//                             : transaction.paymentStatus === "Rejected"
//                             ? "text-red-500"
//                             : "text-blue-500"
//                         }`}
//                       >
//                         {transaction.paymentStatus}
//                       </td>
//                       {filterStatus === "Processing" && (
//                         <td className="py-2 px-4 border-b text-center">
//                           <select
//                             value={statusDropdown}
//                             onChange={handleDropdownChange}
//                             className="p-2 rounded border border-gray-300"
//                           >
//                             <option value="Approved">Approve</option>
//                             <option value="Rejected">Reject</option>
//                           </select>
//                         </td>
//                       )}
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan={filterStatus === "Processing" ? 7 : 6} className="py-4 text-center">
//                     No requests found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}

//         {/* Action Buttons */}
//         {filterStatus === "Processing" && (
//           <div className="flex justify-center mt-6 gap-4">
//             <button
//               onClick={() => handleActionClick("Approve")}
//               className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//               disabled={selectedTransactions.length === 0 || loading}
//             >
//               Approve Selected
//             </button>
//             <button
//               onClick={() => handleActionClick("Reject")}
//               className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//               disabled={selectedTransactions.length === 0 || loading}
//             >
//               Reject Selected
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllQRPaymentRequests;














import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../AdminSidebar/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "./qrPaymentRequests.css";

const AllQRPaymentRequests = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionType, setActionType] = useState("");
  const [filterStatus, setFilterStatus] = useState("Processing"); // Default filter status
  const [statusDropdown, setStatusDropdown] = useState({});
  const token = "YOUR_ADMIN_TOKEN"; // Replace with the actual token if needed

  // Fetch QR payment requests from the API
  const getQRPaymentRequests = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/qr-payment-requests`
      );
      setTransactions(Array.isArray(result.data.data) ? result.data.data : []);
      setLoading(false);
    } catch (err) {
      console.log("Error while getting QR payment requests", err);
      setLoading(false);
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (transaction, isChecked) => {
    if (isChecked) {
      setSelectedTransactions((prev) => {
        if (!prev.some((item) => item._id === transaction._id)) {
          return [...prev, transaction];
        }
        return prev;
      });
    } else {
      setSelectedTransactions((prev) =>
        prev.filter((item) => item._id !== transaction._id)
      );
    }
  };

  // Handle action button clicks
  const handleActionClick = async (action) => {
    setActionType(action);

    try {
      setLoading(true);

      for (let i = 0; i < selectedTransactions.length; i++) {
        const transaction = selectedTransactions[i];

        const endpoint =
          action === "Approve"
            ? "/admin/qr-payment-approve"
            : "/admin/qr-payment-reject";

        const res = await axios.put(
          `${process.env.REACT_APP_API_URL}${endpoint}`,
          {
            transactionId: transaction._id,
          }
        );

        if (res.data.status) {
          updateTransactionStatus(transaction._id, action === "Approve" ? "Approved" : "Rejected");
          toast.success(`Transaction ${action === "Approve" ? "Approved" : "rejected"} successfully!`);
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      toast.error("Operation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to update the status of a transaction locally
  const updateTransactionStatus = (transactionId, newStatus) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction._id === transactionId
          ? { ...transaction, paymentStatus: newStatus }
          : transaction
      )
    );
    setSelectedTransactions([]);
  };

  // Handle filter button click
  const handleFilterClick = (status) => {
    setFilterStatus(status);
  };

  // Handle dropdown change for individual transactions
  const handleDropdownChange = async (transactionId,userId, e) => {
    const newStatus = e.target.value;

    if (newStatus === "Processing") return; // Do nothing if the status is Processing

    try {
      setLoading(true);
      const endpoint = newStatus === "Approved" ? "/admin/qr-payment-approve" : "/admin/qr-payment-reject";
      
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}${endpoint}`,
        {
          transactionId,
          userId
        }
      );

      if (res.data.status) {
        updateTransactionStatus(transactionId, newStatus);
        toast.success(`Transaction ${newStatus} successfully!`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Operation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch QR payment requests on component mount
  useEffect(() => {
    getQRPaymentRequests();
  }, []);

  // Filter transactions based on selected status
  const filteredTransactions = (Array.isArray(transactions) ? transactions : []).filter(
    (transaction) => transaction.paymentStatus === filterStatus
  );

  return (
    <div className="flex min-h-screen gap-2 bg-gradient-to-b from-green-400 to-blue-500">
      <Sidebar className="fixed w-60 h-full" />

      <ToastContainer />
      <div className="ml-60 p-4 flex-1">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          QR Payment Requests
        </h2>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 mx-2 rounded-xl ${
              filterStatus === "Processing"
                ? "bg-blue-700 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => handleFilterClick("Processing")}
          >
            Processing
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-xl ${
              filterStatus === "Approved"
                ? "bg-green-700 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => handleFilterClick("Approved")}
          >
            Approved
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-xl ${
              filterStatus === "Rejected"
                ? "bg-red-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => handleFilterClick("Rejected")}
          >
            Rejected
          </button>
        </div>

        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading...</p>
        ) : (
          <table className="min-w-full bg-gray-300 border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                
                <th className="py-3 px-4 border-b text-center text-gray-600">
                  Sr#
                </th>
                <th className="py-3 px-4 border-b text-center text-gray-600">
                  User ID
                </th>
                <th className="py-3 px-4 border-b text-center text-gray-600">
                  Date/Time
                </th>
                <th className="py-3 px-4 border-b text-center text-gray-600">
                  Amount
                </th>
                <th className="py-3 px-4 border-b text-center text-gray-600">
                  Type
                </th>
                <th className="py-3 px-4 border-b text-center text-gray-600">
                  Status
                </th>
                {filterStatus === "Processing" && (
                  <th className="py-3 px-4 border-b text-center text-gray-600">
                    Update Status
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction, index) => {
                  const isSelected = selectedTransactions.some(
                    (item) => item._id === transaction._id
                  );

                  return (
                    <tr
                      key={transaction._id}
                      className={`${
                        filterStatus === "Processing" && isSelected
                          ? "bg-gray-100 text-blue-700"
                          : ""
                      } hover:bg-gray-100 hover:text-blue-700 cursor-pointer`}
                    >
                      
                      <td className="py-2 px-4 border-b text-center">
                        {index + 1}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {transaction.userCode}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {new Date(transaction.createdAt).toLocaleDateString()}{" "}
                        {new Date(transaction.createdAt).toLocaleTimeString()}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        ₹{transaction.amount}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {transaction.type}
                      </td>
                      <td
                        className={`py-2 px-4 border-b text-center ${
                          transaction.paymentStatus === "Approved"
                            ? "text-green-500"
                            : transaction.paymentStatus === "Rejected"
                            ? "text-red-500"
                            : "text-blue-500"
                        }`}
                      >
                        {transaction.paymentStatus}
                      </td>
                      {filterStatus === "Processing" && (
                        <td className="py-2 px-4 border-b text-center">
                          <select
                            value={statusDropdown[transaction._id] || transaction.paymentStatus}
                            onChange={(e) => handleDropdownChange(transaction._id,transaction.userId, e)}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={filterStatus === "Processing" ? 7 : 6}
                    className="py-2 px-4 text-center"
                  >
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* {filterStatus === "Processing" && (
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 mx-2 bg-green-500 text-white rounded-lg"
              onClick={() => handleActionClick("Approve")}
              disabled={selectedTransactions.length === 0}
            >
              Approve Selected
            </button>
            <button
              className="px-4 py-2 mx-2 bg-red-500 text-white rounded-lg"
              onClick={() => handleActionClick("Reject")}
              disabled={selectedTransactions.length === 0}
            >
              Reject Selected
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default AllQRPaymentRequests;



