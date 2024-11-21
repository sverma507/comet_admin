import { setPosts, setIsFollowingUser } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const useGetAllPost = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.auth);
    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/post/all`, { withCredentials: true });
                if (res.data.success) { 
                    // console.log(res.data.posts);
                    dispatch(setPosts(res.data.posts));
                    let isFollow = [];
                   for (let post = 0; post < res.data.posts.length; post++) {
                     const response = await axios.get(
                        `${import.meta.env.VITE_API_URL}/api/v1/user/isFollowing/${res.data.posts[post]?.author?._id}/${user?._id}`,
                        { withCredentials: true }
                      );
                    // console.log("resssssss",response.data.isFollowing);    
                        isFollow.push(response.data.isFollowing)
                   }
                    dispatch(setIsFollowingUser(isFollow))
                    // console.log(isFollow);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPost();
    }, []);
};
export default useGetAllPost;