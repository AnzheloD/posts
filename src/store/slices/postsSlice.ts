import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import postsService from "../../services/postsService";
import { BaseState } from "../../types/default";
import { Post, PostBody } from "../../types/posts";
import { RootState } from "../store";

interface PostsState extends BaseState {
  data: Post[];
  postsByUser: Post[];
  users: number[];
}

const initialState: PostsState = {
  data: [],
  postsByUser: [],
  users: [],
  isError: false,
  isFetching: false,
  errorMessage: "",
};

const getPosts = createAsyncThunk<Post[], void, { state: RootState; rejectValue: string }>(
  "posts/fetch",
  async (_, thunk) => {
    try {
      const posts = await postsService.fetchPosts();

      return posts;
    } catch (error) {
      const err = error as string;
      if (error) {
        return thunk.rejectWithValue(err);
      }
      throw new Error("Something went wrong...");
    }
  },
  {
    condition: (_, { getState }) => {
      const { posts } = getState();

      return !posts.isFetching;
    },
  }
);

const getPostsByUser = createAsyncThunk<Post[], number, { state: RootState; rejectValue: string }>(
  "posts/fetch-by-user",
  async (userId, thunk) => {
    try {
      const posts = await postsService.fetchPostsById(userId);

      return posts;
    } catch (error) {
      const err = error as string;
      if (error) {
        return thunk.rejectWithValue(err);
      }
      throw new Error("Something went wrong...");
    }
  },
  {
    condition: (_, { getState }) => {
      const { posts } = getState();

      return !posts.isFetching;
    },
  }
);

const createPost = createAsyncThunk<void, PostBody<string>, { state: RootState; rejectValue: string }>(
  "posts/create",
  async (data, thunk) => {
    try {
      await postsService.addPost(data);
    } catch (error) {
      const err = error as string;
      if (error) {
        return thunk.rejectWithValue(err);
      }
      throw new Error("Something went wrong...");
    }
  },
  {
    condition: (_, { getState }) => {
      const { posts } = getState();

      return !posts.isFetching;
    },
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPosts.pending, state => {
      state.isFetching = true;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload ? action.payload : action.error.message!;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.errorMessage = "";
      state.data = action.payload;
      const res = action.payload.map(post => post.userId);
      state.users = [...new Set(res)];
    });
    builder.addCase(getPostsByUser.pending, state => {
      state.isFetching = true;
    });
    builder.addCase(getPostsByUser.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload ? action.payload : action.error.message!;
    });
    builder.addCase(getPostsByUser.fulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.errorMessage = "";
      const posts = action.payload.sort((a, b) => b.id - a.id).slice(0, 20);
      state.postsByUser = posts;
    });
    builder.addCase(createPost.pending, state => {
      state.isFetching = true;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload ? action.payload : action.error.message!;
    });
    builder.addCase(createPost.fulfilled, state => {
      state.isError = false;
      state.isFetching = false;
      state.errorMessage = "";
    });
  },
});

export const postsActions = {
  getPosts,
  getPostsByUser,
  createPost,
};

export const postsSelector = (state: RootState) => state.posts;

export default postsSlice.reducer;
