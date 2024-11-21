import React, { useState, useEffect } from 'react';
import Sidebar from '../AdminSidebar/Sidebar';
import "./editUser.css";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditUser = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize state with user data if available
  const [user, setUser] = useState(location.state?.data);
  
  useEffect(() => {
    if (!user) {
      // Handle the case where user data is not available
      console.warn("No user data available");
      navigate('/dashboard/admin/all-users');
    }
  }, [user, navigate]);

  console.log("user=>", user);

  const [formData, setFormData] = useState({
    userName: user?.userName || "",
    mobileNumber: user?.mobileNumber || "",
    email: user?.email || "",
    accountNumber: user?.accountNumber || "",
    ifscCode: user?.ifscCode || "",
    wallet: user?.wallet || "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/user-update/${user._id}`,
        formData
      );
      if (result.data.success) {
        toast.success('User information updated successfully');
        navigate('/dashboard/admin/all-users');
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      toast.error("Failed to update user information. Please try again.");
    }
  };

  if (!user) return null; // Don't render anything if user data is not available

  return (
    <div className='flex'>
      <Sidebar />
      <div className="update-member-container">
        <h2 className="update-member-title">Update Member</h2>
        <form onSubmit={handleSubmit} className="form-group">
          <div className="section">
            <h3 className="section-title">Personal Info</h3>

            <div className="form-group-row">
              <label>Name <span className="required">*</span></label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter user name"
              />
            </div>

            <div className="form-group-row">
              <label>Mobile No <span className="required">*</span></label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter mobile number"
              />
            </div>

            <div className="form-group-row">
              <label>Email Id <span className="required">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="section">
            <h3 className="section-title">Banking Details</h3>

            <div className="form-group-row">
              <label>A/c Holder Name</label>
              <input
                type="text"
                name="accountHolderName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter account holder name"
                readOnly
              />
            </div>

            <div className="form-group-row">
              <label>A/c No.</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Enter account number"
              />
            </div>

            <div className="form-group-row">
              <label>IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                placeholder="Enter IFSC code"
              />
            </div>

            <div className="form-group-row">
              <label>Wallet Balance</label>
              <input
                type="text"
                name="wallet"
                value={formData.wallet}
                onChange={handleChange}
                placeholder="Enter wallet balance"
              />
            </div>
          </div>

          <button type="submit" className="submit-button">Update User</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditUser;
