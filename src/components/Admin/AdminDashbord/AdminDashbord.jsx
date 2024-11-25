import React from "react";
import Sidebar from "../AdminSidebar/Sidebar";
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Dashboard = () => {
  // State for statistics
  const [registerUser, setRegisterUser] = useState(0);
  const [paidUser, setPaidUser] = useState(0);
  const [unpaidUser, setUnpaidUser] = useState(0);
  const [paidUsersLastMonth, setPaidUsersLastMonth] = useState(0);
  const [users, setUsers] = useState([]);
  const [rupeeTotal, setRupeeTotal] = useState();
  const [lastWithDrawl, setLastWithdrawl] = useState([]);
  const [totalWithdrawl, setTotalWithdrawl] = useState(0);
  const [totalDeposite, setTotalDeposite] = useState(0);
  const [todayDeposite, setTodayDeposite] = useState(0);
  const [todayCollection, setTodayCollection] = useState(0);
  const [activeAdminTotal, setActiveAdminTotal] = useState(0);
  const [activeUserTotal, setActiveUserTotal] = useState(0);
  const [todayAdminActivateTotal, setTodayAdminActivateTotal] = useState(0);
  const [todayUserActivateTotal, setTodayUserActivateTotal] = useState(0);
  const [totalEarningWallet, setEarningWallet] = useState(0);
  const [totalRechargeWallet, setRechargeWallet] = useState(0);
  const { allUsers } = useSelector((store) => store.auth);

  const getData = async () => {
    let pd = [];
    let unpd = [];
    let earningWallet = 0;
    let rechargeWallet = 0;
    let totalInvest = 0;
    let lastmonth = [];

    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/all-users`
      );
      setUsers(result.data.data);
      setRegisterUser(result.data.data.length);

// Get the current date
const now = new Date();

// Get the first and last day of the previous month
const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);


      for (let i = 0; i < result.data.data.length; i++) {
        if (result.data.data[i].isActive == true) {
          const userCreatedAt = new Date(result.data.data[i].createdAt);
          pd.push(result.data.data[i]);
          if (
            userCreatedAt >= firstDayOfLastMonth && lastDayOfLastMonth &&
            userCreatedAt <= lastDayOfLastMonth
        ) {
          lastmonth.push(result.data.data[i]);
        }
        } else {
          unpd.push(result.data.data[i]);
        }
        earningWallet += result.data.data[i].earningWallet;
        rechargeWallet += result.data.data[i].rechargeWallet;
        totalInvest += result.data.data[i].totalInvestment;
      }
      setPaidUser(pd.length);
      setUnpaidUser(unpd.length);
      setPaidUsersLastMonth(lastmonth.length);
      setRechargeWallet(rechargeWallet);
      setEarningWallet(earningWallet);
      setRupeeTotal(totalInvest);
      // console.log(result);
    } catch (err) {
      console.log("error while getting all users ", err);
    }
  };



  const getQRPaymentRequests = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/qr-payment-requests`
      );
      console.log(result.data.data);

      let resArray = [];
      let dep = 0;
      let todayDep = 0;

      for(let i=0;i<result.data.data.length;i++){
        if(result.data.data[i].paymentStatus == "Approved"){
           resArray.push(result.data.data[i]);
        }
      }
      
      const today = new Date().toISOString().slice(0, 10);
      
      for(let i=0;i<resArray.length;i++){
        console.log(resArray[i]);
        
        const activationDate = new Date(resArray[i].createdAt)
          .toISOString()
          .slice(0, 10);
          dep += resArray[i].amount;
          if(activationDate === today){
             todayDep += resArray[i].amount
          }
      }
      console.log(dep, todayDep);
      
      setTotalDeposite(dep);
      setTodayDeposite(todayDep);
      
    } catch (err) {
      console.log("Error while getting QR payment requests", err);
    }
  };





  const getWithdrawalRequests = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/all-withdrawl-history`
      );
      console.log(result.data);
      let totalWith = 0;
      let todayWith = 0;
      const today = new Date().toISOString().slice(0, 10);

      for(let i=0;i<result.data.data.length;i++){
        
          const activationDate = new Date(result.data.data[i].createdAt)
        .toISOString()
        .slice(0, 10);
            totalWith += result.data.data[i].amount;
            if(activationDate === today){
                todayWith += result.data.data[i].amount
            }
      }

      setTotalWithdrawl(totalWith);
      setLastWithdrawl(todayWith);
      
    } catch (err) {
      console.log("Error while getting the withdrawal requests", err);
    }
  };

  const getActivationList = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/activate-user-history`
      );
      // setActivationList(result.data);
      let count1 = 0;
      let count2 = 0;
      let todayCount1 = 0;
      let todayCount2 = 0;
      let todayCol = 0;

      const today = new Date().toISOString().slice(0, 10);

      console.log(result.data.data);
      for (let i = 0; i < result.data.data.length; i++) {
        const activationDate = new Date(result.data.data[i].createdAt)
          .toISOString()
          .slice(0, 10);
          // console.log(result.data.data[i]);
          console.log('----->',activationDate);
          
          

        if (result.data.data[i].activatedBy == "Admin") {
          count1 += result.data.data[i].amount;
          
          if (activationDate === today) {
            todayCount1 += result.data.data[i].amount; // Increment today's admin activation count
            todayCol += result.data.data[i].amount
          }
          
        } else {
          count2 += result.data.data[i].amount;
          if (activationDate === today) {
            todayCount2 += result.data.data[i].amount; // Increment today's user activation count
            todayCol += result.data.data[i].amount;
          }
        }
      }
      console.log(count1,count2);
      
      setActiveAdminTotal(count1);
      setActiveUserTotal(count2);
      setTodayAdminActivateTotal(todayCount1);
      setTodayUserActivateTotal(todayCount2);
      setTodayCollection(todayCol);
    } catch (error) {
      console.log(error);
    }
  };

  // const getTotalUSDCollection = async () => {
  //   try {
  //     const result = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/admin/total-usd-collection`
  //     );

  //     if (result && result.data) {
  //       console.log("result =>", result.data);

  //       // Calculate the total of txnAmount
  //       const totalTxnAmount = result.data.reduce((total, transaction) => {
  //         return total + transaction.amount;
  //       }, 0);

  //       setUSDTotal(totalTxnAmount);

  //       // console.log("Total txnAmount =>", );
  //     }
  //   } catch (err) {
  //     console.log("Error while getting total collection", err);
  //   }
  // };

  useEffect(() => {
    getData();
    // getTotalRupeePayment();
    // getAllRequests();
    getWithdrawalRequests();
    getActivationList();
    // getQRPaymentRequests();
    // getTotalINRCollection();
    // getTotalUSDCollection();
  }, []);

  return (
    <div className="flex min-h-screen gap-6 bg-gradient-to-b from-green-400 to-blue-500">
      {/* Sidebar */}
      <Sidebar className="fixed w-60 h-full" />

      {/* Main content */}
      <div className="ml-60 p-4 flex-1 bg-gradient-to-b from-green-400 to-blue-500">
        <div className="flex gap-8">
          {/* Revenue Chart Section */}
          <div className="bg-slate-300 w-[60%] text-white p-8 rounded-lg">
            <h2 className="text-xl font-bold text-gray-500 mb-4">Revenue Chart</h2>
            <div className="grid grid-cols-2 gap-8 mt-10">
              {/* Revenue Stats */}
              <div className="bg-gradient-to-r from-green-600 via-green-500 to-teal-400  p-4 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform translate-y-[-10px] transition-all duration-300 hover:translate-y-[-20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:scale-105">
                <h3 className="text-lg font-semibold">Total Collection</h3>
                <p className="text-sm">
                  ${" "}
                  {(rupeeTotal || 0).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-600 via-green-500 to-teal-400 p-4 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform translate-y-[-10px] transition-all duration-300 hover:translate-y-[-20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:scale-105">
                <h3 className="text-lg font-semibold">Today Collection</h3>
                <p className="text-sm">
                  $ {(todayCollection || 0).toLocaleString("en-IN")}
                </p>
              </div>
              {/* <div className="bg-gradient-to-r from-green-600 via-green-500 to-teal-400 p-4 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform translate-y-[-10px] transition-all duration-300 hover:translate-y-[-20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:scale-105">
                <h3 className="text-lg font-semibold">Total Deposite</h3>
                <p className="text-sm">
                  ${" "}
                  {(totalDeposite || 0).toLocaleString("en-IN")}
                </p>
              </div> */}
              {/* <div className="bg-gradient-to-r from-green-600 via-green-500 to-teal-400 p-4 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform translate-y-[-10px] transition-all duration-300 hover:translate-y-[-20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:scale-105">
                <h3 className="text-lg font-semibold">Today Deposite</h3>
                <p className="text-sm">
                  ${" "}
                  {(
                    todayDeposite || 0
                  ).toLocaleString("en-IN")}
                </p>
              </div> */}
              <div className="bg-gradient-to-r from-green-600 via-green-500 to-teal-400 p-4 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform translate-y-[-10px] transition-all duration-300 hover:translate-y-[-20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:scale-105">
                <h3 className="text-lg font-semibold">Total Withdrawl</h3>
                <p className="text-sm">
                  ${" "}
                  {(
                    totalWithdrawl || 0
                  ).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-600 via-green-500 to-teal-400 p-4 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform translate-y-[-10px] transition-all duration-300 hover:translate-y-[-20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:scale-105">
                <h3 className="text-lg font-semibold">Today Withdrawl</h3>
                <p className="text-sm">
                  ${" "}
                  {(
                    lastWithDrawl || 0
                  ).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          {/* User Statistics */}
          <div className="w-[40%] bg-gradient-to-t from-yellow-400  via-yellow-500 to-orange-400 p-6 rounded-lg">
            <h2 className="text-xl text-white text-center font-bold mb-8">
              User Statistics
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center h-[120px]">
                <h3 className="mb-2 text-center">Total Registered User</h3>
                <CircularProgressbar
                  value={registerUser}
                  maxValue={1000}
                  text={`${registerUser}`}
                  styles={buildStyles({
                    pathColor: `#3b82f6`,
                    textColor: "#3b82f6",
                  })}
                />
              </div>
              <div className="flex flex-col items-center h-[120px]">
                <h3 className="mb-2 text-center">Total Paid User</h3>
                <CircularProgressbar
                  value={paidUser}
                  maxValue={1000}
                  text={`${paidUser}`}
                  styles={buildStyles({
                    pathColor: `#10b981`,
                    textColor: "#10b981",
                  })}
                />
              </div>
              <div className="flex flex-col items-center h-[120px]">
                <h3 className="mb-2">Total Unpaid User</h3>
                <CircularProgressbar
                  value={unpaidUser}
                  maxValue={1000}
                  text={`${unpaidUser}`}
                  styles={buildStyles({
                    pathColor: `#ef4444`,
                    textColor: "#ef4444",
                  })}
                />
              </div>
              <div className="flex flex-col items-center h-[120px]">
                <h3 className="mb-2 text-center">Paid Users Last Month</h3>
                <CircularProgressbar
                  value={paidUsersLastMonth}
                  maxValue={1000}
                  text={`${paidUsersLastMonth}`}
                  styles={buildStyles({
                    pathColor: `#8b5cf6`,
                    textColor: "#8b5cf6",
                  })}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 p-6 border  rounded-xl bg-white">
          <h2 className="text-xl font-bold mb-8">Available Wallet</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-purple-500 via-purple-400 to-purple-200 text-white p-4 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform translate-y-[-10px] transition-all duration-300 hover:translate-y-[-20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:scale-105">
              <h3 className="text-lg font-semibold">E-wallet</h3>
              <p className="text-lg">
                $ {(totalEarningWallet || 0).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 via-purple-400 to-purple-200 text-white p-4 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform translate-y-[-10px] transition-all duration-300 hover:translate-y-[-20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:scale-105">
              <h3 className="text-lg font-semibold">R-wallet</h3>
              <p className="text-lg">
                $ {(totalRechargeWallet || 0).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 p-6 border  rounded-xl bg-white">
          <h2 className="text-xl font-bold mb-8">Activation Details</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-purple-500 via-purple-400 to-purple-200 text-white p-4 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform translate-y-[-10px] transition-all duration-300 hover:translate-y-[-20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:scale-105">
              <h3 className="text-lg font-semibold">Today Active By User</h3>
              <p className="text-lg">
                $ {(todayUserActivateTotal || 0).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 via-purple-400 to-purple-200 text-white p-4 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform translate-y-[-10px] transition-all duration-300 hover:translate-y-[-20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:scale-105">
              <h3 className="text-lg font-semibold">Today Active By Admin</h3>
              <p className="text-lg">
                $ {(todayAdminActivateTotal || 0).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 via-purple-400 to-purple-200 text-white p-4 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform translate-y-[-10px] transition-all duration-300 hover:translate-y-[-20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:scale-105">
              <h3 className="text-lg font-semibold">Total Active By User</h3>
              <p className="text-lg">
                $ {(activeUserTotal || 0).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 via-purple-400 to-purple-200 text-white p-4 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform translate-y-[-10px] transition-all duration-300 hover:translate-y-[-20px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:scale-105">
              <h3 className="text-lg font-semibold">Total Active By Admin</h3>
              <p className="text-lg">
                $ {(activeAdminTotal || 0).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
