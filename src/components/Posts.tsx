import { postsSelector } from "../store/slices/postsSlice";
import { useSelector } from "../store/store";
import Cards from "./Cards";

const Posts = () => {
  const { data } = useSelector(postsSelector);

  return <Cards postsData={data} />;
};

export default Posts;
