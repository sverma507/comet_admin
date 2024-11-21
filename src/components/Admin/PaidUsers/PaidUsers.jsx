import React, { useEffect, useState } from "react";
import Sidebar from "../AdminSidebar/Sidebar";
import axios from "axios";
// import { toast } from "react-toastify";

const PaidUsers = () => {
  const [paidUsers, setPaidUsers] = useState([]);

  const getPaidUsers = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/admin/all-active-users`
      );
      // console.log("resultt===>",result);
      setPaidUsers(result.data.users);
    } catch (err) {
      console.log("Error while getting paid users", err);
    }
  };

  useEffect(() => {
    getPaidUsers();
  }, []);

  console.log(paidUsers)
  return (
    <div className="flex min-h-screen gap-4">
      <Sidebar className="fixed w-60 h-full"  />
      <div className="ml-60 container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2">😊</span> Paid User List
        </h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="py-2 px-4 border-b">S.No</th>
              <th className="py-2 px-4 border-b">Referral Code</th>
              <th className="py-2 px-4 border-b">Mobile Number</th>
              {/* <th className="py-2 px-4 border-b">Packages</th> */}
              <th className="py-2 px-4 border-b">Wallet</th>
              {/* <th className="py-2 px-4 border-b">Prices</th> */}
              {/* <th className="py-2 px-4 border-b">Activation Date/Time</th> */}
            </tr>
          </thead>
          <tbody>
            {paidUsers.length > 0 ? (
              paidUsers?.map((user, index) => (
                <tr
                  key={user._id}
                  className={`text-center ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{user.referralCode}</td>
                  <td className="py-2 px-4 border-b">{user.phone}</td>
                  {/* <td className="py-2 px-4 border-b">
                    {user.packages.map((pkg, index) => (
                      <div key={index}>
                        {pkg ? pkg.name : "Unknown Package"}
                      </div>
                    ))}
                  </td> */}
                  {/* <td className="py-2 px-4 border-b">
                    {user.packages.map((pkg, index) => (
                      <div key={index}>
                        {pkg ? `Rs. ${pkg.price.toFixed(2)}` : "0.00"}
                      </div>
                    ))}
                  </td> */}
                  <td className="py-2 px-4 border-b">
                    Rs. {user.earningWallet.toFixed(2)}
                  </td>
                  {/* <td className="py-2 px-4 border-b">
                    {user.purchaseDate.length > 0
                      ? `${new Date(
                          user.purchaseDate[0]
                        ).toLocaleDateString()} ${new Date(
                          user.purchaseDate[0]
                        ).toLocaleTimeString()}`
                      : `${new Date(
                          user.createdAt
                        ).toLocaleDateString()} ${new Date(
                          user.createdAt
                        ).toLocaleTimeString()}`}
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No active users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaidUsers;
