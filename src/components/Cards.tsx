import { FC } from "react";

import { Post } from "../types/posts";
import CustomCard from "./CustomCard";

interface Props {
  postsData: Post[];
}

const Cards: FC<Props> = ({ postsData }) => {
  return (
    <>
      {postsData.map(post => (
        <CustomCard key={post.id} {...post} />
      ))}
    </>
  );
};

export default Cards;
