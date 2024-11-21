// src/components/Admin/AdminLogin/AdminLogin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "@/redux/adminSlice";

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
                `${import.meta.env.VITE_API_URL}/api/v1/admin/login`,
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
                navigate("/admin/dashbord");
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
            navigate("/admin/dashbord");
        }
    }, [admin, navigate]);

    return (
        <div className="flex items-center w-screen h-screen justify-center">
            <form onSubmit={signupHandler} className="shadow-lg flex flex-col gap-5 p-8">
                <div className="my-4">
                    <h1 className="text-center font-bold text-xl">LOGO</h1>
                    <p className="text-sm text-center">Login to see photos & videos from your friends</p>
                </div>
                <div>
                    <span className="font-medium">Email</span>
                    <input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2 p-2 border"
                    />
                </div>
                <div>
                    <span className="font-medium">Password</span>
                    <input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2 p-2 border"
                    />
                </div>
                {loading ? (
                    <button className="flex items-center justify-center py-2 px-4 bg-blue-500 text-white rounded">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </button>
                ) : (
                    <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">
                        Login
                    </button>
                )}
            </form>
        </div>
    );
};

export default AdminLogin;
