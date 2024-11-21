import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    selectedPost: null,
    isFollowingUser: [], // New array to track following status for posts
  },
  reducers: {
    // actions
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    setIsFollowingUser: (state, action) => {
      state.isFollowingUser = action.payload; // Update isFollowing array
    }
  }
});

export const { setPosts, setSelectedPost, setIsFollowingUser } = postSlice.actions;
export default postSlice.reducer;
