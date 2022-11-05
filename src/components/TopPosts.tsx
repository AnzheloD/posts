import { useEffect, useState } from "react";

import { CircularProgress, Box } from "@mui/material";

import { postsSelector } from "../store/slices/postsSlice";
import { useSelector } from "../store/store";
import { Post } from "../types/posts";
import Cards from "./Cards";

const TopPosts = () => {
  const [postsData, setPostsData] = useState<Post[] | null>(null);
  const { data, isError, isFetching, errorMessage } = useSelector(postsSelector);

  useEffect(() => {
    const filteredData = data.slice(-20).sort((a, b) => b.id - a.id);
    setPostsData(filteredData);
  }, []);

  if (isFetching) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Box>{errorMessage}</Box>;
  }

  return <>{postsData && <Cards postsData={postsData} />}</>;
};

export default TopPosts;
