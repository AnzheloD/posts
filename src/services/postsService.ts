import typicodeApi from "../configs/axios";
import { Post, PostBody } from "../types/posts";

const fetchPosts = async (): Promise<Post[]> => {
  try {
    const res = await typicodeApi.get<Post[]>("/posts");

    return res.data;
  } catch (error) {
    throw new Error("Something went wrong...");
  }
};

const fetchPostsById = async (id: number): Promise<Post[]> => {
  try {
    const res = await typicodeApi.get<Post[]>(`/users/${id}/posts`);

    return res.data;
  } catch (error) {
    throw new Error("Something went wrong...");
  }
};

const addPost = async (body: PostBody<string>): Promise<Post> => {
  try {
    const { data } = await typicodeApi.post<Post>("/posts", {
      ...body,
      userId: Number(body.userId),
    });

    return data;
  } catch (error) {
    throw new Error("Something went wrong...");
  }
};

const postsService = {
  fetchPosts,
  addPost,
  fetchPostsById,
};

export default postsService;
