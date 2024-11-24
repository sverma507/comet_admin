import React, { useEffect, useState } from "react";
import Sidebar from "../AdminSidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

function ActivateUserForm() {
  const [referralCode, setRefferalCode] = useState("");
  const [amount, setAmount] = useState(null);
  const [activationList, setActivationList] = useState([]);
  const [isActivating, setIsActivating] = useState(false);
  const [message, setMessage] = useState('');

  const { admin } = useSelector((store) => store.adminAuth);
  const navigate = useNavigate();

  const getActivationList = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/activate-user-history`
      );
      setActivationList(result.data.data);
      console.log("result==>",result.data);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching activation list.");
    }
  };

  useEffect(() => {
    getActivationList();
  }, []);

  const handleUserIdChange = (event) => setRefferalCode(event.target.value);
  const handleAmountChange = (event) => setAmount(event.target.value);

  const handleActivate = async (e) => {
    e.preventDefault();
    setIsActivating(true); // Set the button to "activating" state

    try {
      const token = admin?.token;
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/activate-user`,
        { referralCode, amount },
      );
      setMessage(response.data.message);
      if (response.data.success) {
        toast.success(response.data.message); // Show success message
        // setReferralCode("");
        setAmount("");
        // getActivationList(); // Refresh the activation list
      } else {
        toast.error(response.data.message); // Show error message
      }
    } catch (error) {
      // Show specific error message if available
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error activating user");
      }
    } finally {
      setIsActivating(false); // Reset the button state
    }
  };

  return (
    <div className="flex min-h-screen gap-4">
      {/* Sidebar */}
      <Sidebar className="fixed w-60 h-full" />

      {/* Main Content */}
      <div className="ml-60 container mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 mt-[50px] w-[50%] max-w-[800px] mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Activate / Upgrade Package Now
          </h2>
          <form onSubmit={handleActivate}>
            <div className="mb-6">
              <label htmlFor="userId" className="block text-gray-700 text-sm font-bold mb-2">
                User Id<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="userId"
                className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Please Enter Valid User ID"
                value={referralCode}
                onChange={handleUserIdChange}
                disabled={isActivating}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
                Enter Amount
              </label>
              <input
                type="number"
                id="amount"
                className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                value={amount}
                onChange={handleAmountChange}
                disabled={isActivating}
              />
            </div>
            <div className="flex justify-center flex-col ">
              <button
                type="submit"
                className={`${
                  isActivating ? "bg-gray-500" : "bg-green-500 hover:bg-green-700"
                } text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300`}
                disabled={isActivating}
              >
                {isActivating ? "Activating..." : "Activate Now"}
              </button>
             <div>
             {message && (
                    <div className="mt-4 text-center text-sm text-gray-700">
                        {message}
                    </div>
                )}
             </div>
            </div>
          </form>
        </div>

        {/* Latest Activated User Table */}
        <div className="bg-white shadow-lg rounded-lg p-8 mt-8 w-[90%] mx-auto">
          <h3 className="text-xl font-bold mb-4 text-center">Activated User Id</h3>
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b text-center">#</th>
                <th className="py-2 px-4 border-b text-center">User Id</th>
                <th className="py-2 px-4 border-b text-center">Package</th>
                <th className="py-2 px-4 border-b text-center">Activated By</th>
                <th className="py-2 px-4 border-b text-center">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {activationList.map((activation, index) => (
                <tr key={activation.id}>
                  <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                  <td className="py-2 px-4 border-b text-center">{activation.referralCode}</td>
                  {/* <td className="py-2 px-4 border-b text-center">{activation.mobileNumber}</td> */}
                  {/* <td className="py-2 px-4 border-b text-center">{activation.activateBy}</td> */}
                  <td className="py-2 px-4 border-b text-center">{activation.amount}</td>
                  <td className="py-2 px-4 border-b text-center">{activation.activatedBy}</td>
                  {/* <td className="py-2 px-4 border-b text-center">Rs. {(activation.packagePrice || 0).toLocaleString("en-IN")}</td> */}
                  <td className="py-2 px-4 border-b text-center">{new Date(activation.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ActivateUserForm;
