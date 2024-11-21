import React, { useEffect, useState } from 'react'
import Sidebar from '../AdminSidebar/Sidebar'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const ChangePassword = () => {

const [oldPassword, setOldPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
 
const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmed password must be the same");
    } else {
      try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/admin/change-password`, {
          oldPassword,
          newPassword,
        });
  
        // Success: Display success message
        toast.success(response.data.message);
        setOldPassword("")
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        // Error: Display specific error message from the backend
        if (error.response && error.response.data) {
          toast.error(error.response.data.message); // Show the exact error message
        } else {
          toast.error("Something went wrong"); // General fallback error
        }
      }
    }
  };


 

  return (
    <div className="flex min-h-screen gap-4">
    {/* Sidebar */}
    <Sidebar className="fixed w-60 h-full" />
  
    {/* Main Content */}
    <div className="m-auto shadow-md container w-[30%] p-10 ">
        <ToastContainer/>
    <h2 className="text-2xl font-bold mb-6 text-center">
            Change Password
          </h2>
          <form onSubmit={handleChangePassword}>
            <div className="mb-6">
              <label
                htmlFor="userId"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Old Password
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="userId"
                className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Please Enter Valid User ID"
                value={oldPassword}
                required
                onChange={(e) => {setOldPassword(e.target.value)}} // Disable input during activation
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="userId"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                New Password
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="userId"
                className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Please Enter Valid User ID"
                value={newPassword}
                required
                onChange={(e) => {setNewPassword(e.target.value)}} // Disable input during activation
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="userId"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm New Password
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="userId"
                className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Please Enter Valid User ID"
                value={confirmPassword}
                required
                onChange={(e) => {setConfirmPassword(e.target.value)}} // Disable input during activation
              />
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300`}
                 // Disable button during activation
              >
                Change Password
              </button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default ChangePassword