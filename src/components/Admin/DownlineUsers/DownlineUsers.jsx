import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../AdminSidebar/Sidebar';
import './global.css'; // Import the global CSS file if needed

const DownlineUsers = () => {
  const [userId, setUserId] = useState('');
  const [downlineUsers, setDownlineUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [paidUsers, setPaidUsers] = useState(0);
  const [unPaidUsers, setUnPaidUsers] = useState(0);
  const [data, setData] = useState(false);

  const fetchDownlineUsers = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/admin/all-downline-users/${userId}`);
      setDownlineUsers(result.data.downlineUsers);
      activatedUsers(result.data.downlineUsers);
      console.log("length: ==>",result.data.downlineUsers);
      
      setData(true);
      setError('');
    } catch (err) {
      console.error('Error fetching downline users', err);
      setError('Failed to fetch downline users.');
    } finally {
      setLoading(false);
    }
  };


  const activatedUsers = (users) => {
    let paidCount = 0;
    let unPaidCount = 0;
      for(const user of users){
          if(user.active){
            paidCount++;
          }else{
            unPaidCount++;
          }
      }

      setPaidUsers(paidCount)
      setUnPaidUsers(unPaidCount);
  }

  const renderDownlineUsers = (users, parentLevel) => {
    return users.map((user, index) => (
      <React.Fragment key={user._id}>
        <tr className={`border-b text-center border-gray-200 hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
          <td className="px-5 py-3">{index + 1}</td>
          <td className="px-5 py-3">{user.level}</td>
          <td className="px-5 py-3">{user.referralCode}</td>
          <td className="px-5 py-3">{user.email || 'Unknown'}</td>
          <td className="px-5 py-3">{user.mobileNumber || 'N/A'}</td>
          <td className="px-5 py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
          <td className="px-5 py-3">{user.purchaseDate.length>0 ? new Date(user.purchaseDate[user.purchaseDate.length-1]).toLocaleDateString() : 'Unrecharged'}</td>
          <td className="px-5 py-3">{user.wallet ? `₹ ${user.wallet.toFixed(2)}` : '₹ 0.00'}</td>
        </tr>
        {user.downlineUsers.length > 0 && renderDownlineUsers(user.downlineUsers, user.level)}
      </React.Fragment>
    ));
  };

  return (
    <div className="flex min-h-screen gap-4">
      <Sidebar className="fixed w-60 h-full"  />
      <div className="ml-60 container mx-auto p-4">
        <div className="flex justify-between mb-10 mt-10">
          <input
            type="text"
            placeholder="Enter User ID"
            className="border-2 border-gray-200 rounded-lg p-2 w-[86%]"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button
            className={`bg-green-500 text-white px-4 py-2 rounded-lg ml-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={fetchDownlineUsers}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Get Downline'}
          </button>
        </div>
        {
            data ? (<div>
                <div>Total Users under {userId} are {paidUsers + unPaidUsers}</div>
                <div>Paid Users : {paidUsers}</div>
                <div>Unpaid Users : {unPaidUsers}</div>
            </div>) : (<></>)
        }
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="relative">
          {loading && (
            <div className="spinner-overlay">
              <div className="spinner"></div>
            </div>
          )}
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                {['S.No.', 'Level', 'User Id', 'Email', 'Mobile No.', 'Date of Joining', 'Date of Activation', 'Wallet'].map((header) => (
                  <th
                    key={header}
                    className="px-5 py-3 border-b border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">

              {downlineUsers.length > 0 ? (
                renderDownlineUsers(downlineUsers, 1)
              ) : !loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">No downline users found</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DownlineUsers;
