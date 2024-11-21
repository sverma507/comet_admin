import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../AdminSidebar/Sidebar";
import { toast, ToastContainer } from "react-toastify";

const ChangeUpi = () => {
  const [newUpi, setNewUpi] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [currentFile, setCurrentFile] = useState(null);
  const [upi_id, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name); // Display the selected file name
    }
  };


//   useEffect(() => {
//     async function fetchFile() {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/current`);
//         setCurrentFile(response.data);
//       } catch (error) {
//         console.error('Error fetching the current file:', error);
//       }
//     }
//     fetchFile();
//   }, []);


  const handleChangeUpi = async (e) => {
    e.preventDefault();
      try {
        setLoading(true);
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/admin/change-upi`,
          {
            newUpi
          }
        );

        // Success: Display success message
        toast.success("Upi Id updated successfully");
        setLoading(false);
        setNewUpi(" ")
      } catch (error) {
        // Error: Display specific error message from the backend
        setLoading(false);
        if (error.response && error.response.data) {
          toast.error(error.response.data.message); // Show the exact error message
        } else {
          toast.error("Something went wrong"); // General fallback error
        }
      }
  };

  const handleChangeQr = async (e) => {
    e.preventDefault();
    //   try {
    //     const response = await axios.put(
    //       `${process.env.REACT_APP_API_URL}/admin/change-password`,
    //       {
    //         newUpi
    //       }
    //     );

    //     // Success: Display success message
    //     toast.success(response.data.message);
    //     setNewUpi("");
    //   } catch (error) {
    //     // Error: Display specific error message from the backend
    //     if (error.response && error.response.data) {
    //       toast.error(error.response.data.message); // Show the exact error message
    //     } else {
    //       toast.error("Something went wrong"); // General fallback error
    //     }
    //   }
  };


  const getUpiId = async() => {
    try {
      const result =  await axios.get(`${process.env.REACT_APP_API_URL}/admin/get-upi`);
      console.log(result.data.name);
      setUpiId(result.data.name);  
    } catch (error) {
      console.log(error);
      
    }
  }
  
useEffect(() => {
  getUpiId();
},[])

  return (
    <div className="flex min-h-screen gap-4">
      {/* Sidebar */}
      <Sidebar className="fixed w-60 h-full" />

      {/* Main Content */}
      <div className="flex w-full gap-10 p-20 bg-gradient-to-b from-purple-300 to-indigo-400  text-white pb-16">
        <div className="m-auto shadow-md ml-[20%] container bg-white rounded-xl w-[55%] h-[350px] p-10 ">
          <ToastContainer />
          <h2 className="text-2xl font-bold mb-6 text-center">Change UPI Id</h2>
          <p className=" font-bold text-black text-center">Current Upi Id: {upi_id}</p>
          <form onSubmit={handleChangeUpi}>
            <div className="mb-6">
              <label
                htmlFor="userId"
                className="block text-gray-700 text-sm font-bold mb-2 mt-10"
              >
                Enter the new UPI Id
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="userId"
                className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Please Enter Upi Id"
                value={newUpi}
                required
                onChange={(e) => {
                  setNewUpi(e.target.value);
                }} // Disable input during activation
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300 mt-[5%]`}
                // Disable button during activation
              >
                {loading ? "Updating..." : "Update UPI"}
                
              </button>
            </div>
          </form>
        </div>
        <div className="m-auto shadow-md container bg-white rounded-xl w-[55%] h-[350px] p-10 ">
          <ToastContainer />
          <h2 className="text-2xl font-bold mb-6 text-center">
            Change Qr-Code
          </h2>
          <form onSubmit={handleChangeQr}>
            <div className="mb-4">
              {/* File input */}
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium text-gray-700 mt-14"
              >
                Upload File
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
              {/* Display the selected file name */}
              {fileName && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected file: {fileName}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              {/* Submit button */}
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300 mt-[10%]"
              >
                Update Qr-Code
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeUpi;
