
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const AdminProtectedRoute = ({children}) => {
    const { admin } = useSelector((store) => store.adminAuth); // Access adminAuth state
    const navigate = useNavigate();
        useEffect(()=>{
        if(!admin){
            navigate("/admin/login");
        }
    },[])
  return <>{children}</>
}

export default AdminProtectedRoute;