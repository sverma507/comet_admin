import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import Aos from "aos";
import axios from "axios";
import {toast} from "react-toastify"

const RechargeDummy = () => {
  const [auth, setAuth] = useAuth();
  const [user, setUser] = useState();

  const getUser = async () => {
    const { id } = auth.user;
    const token = auth.token;

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/profile/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res && res.data) {
        setUser(res.data);
        console.log(user);
        
        console.log("auth=>", auth);
      } else {
        toast.error("Failed to retrieve user profile");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getUser();
    // console.log(user.email);
  }, []);

  return <div>Recharge</div>;
};

export default RechargeDummy;
