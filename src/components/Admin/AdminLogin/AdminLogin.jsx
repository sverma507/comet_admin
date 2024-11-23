// src/components/Admin/AdminLogin/AdminLogin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../../../redux/adminSlice";
import bnb from "./bnb_login.png"
// import { setAdmin } from "@/redux/adminSlice.jsx";

const AdminLogin = () => {
    const [input, setInput] = useState({    
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const { admin } = useSelector((store) => store.adminAuth); // Access adminAuth state
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/admin/login`,
                input,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );
            // console.log("response ==>",res)
            if (res.data.success) {
                navigate("/");
                dispatch(setAdmin(res.data.user));
                toast.success("Welcone Sir");
                setInput({
                    email: "",
                    password: ""
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (admin) {
            navigate("/");
        }
    }, [admin, navigate]);

    return (
        <div className="min-h-screen w-full bg-cover bg-center pt-20" style={{backgroundImage: `url(${bnb})`}}>
            <Toaster/>
            <div className="">
            <form onSubmit = {signupHandler} className = " m-auto w-full max-w-sm bg-opacity-60 backdrop-blur-md bg-white rounded-lg shadow-lg p-10">
                <div className="my-4">
                    <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">Admin Login</h1>
                </div>
                <div className="w-full">
                    <span className="block text-sm font-medium text-gray-600">Email</span>
                    <input
                        type="email"
                        name="email"
                        value={input.email}
                        placeholder="Enter email"
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2 p-2 border w-full rounded-full text-center"
                    />
                </div>
                <div>
                    <span className="block text-sm font-medium text-gray-600 mt-6">Password</span>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={input.password}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2 p-2 border w-full rounded-full text-center"
                    />
                </div>
                {loading ? (
                    <button className="flex items-center justify-center py-2 px-4 bg-blue-500 text-white rounded w-full mt-4">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </button>
                ) : (
                    <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded w-full mt-4">
                        Login
                    </button>
                )}
            </form>
            </div>
        </div>
    );
};

export default AdminLogin;
