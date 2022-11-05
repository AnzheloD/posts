import { SyntheticEvent, useEffect, useState } from "react";

import { Box, Tab, Tabs } from "@mui/material";

import CreatePost from "../components/CreatePost";
import Posts from "../components/Posts";
import TabPanel from "../components/TabPanel";
import TopPosts from "../components/TopPosts";
import UserSelector from "../components/UserSelector";
import { postsActions } from "../store/slices/postsSlice";
import { useDispatch } from "../store/store";
import { TabInterface } from "../types/default";

const Home = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postsActions.getPosts());
  }, []);

  const handleChange = (event: SyntheticEvent, newValue: number) => setValue(newValue);

  const tabConfig: TabInterface[] = [
    {
      component: <Posts />,
      index: 0,
    },
    {
      component: <TopPosts />,
      index: 1,
    },
    {
      component: <UserSelector />,
      index: 2,
    },
    {
      component: <CreatePost />,
      index: 3,
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="All posts" />
          <Tab label="Top 20 posts" />
          <Tab label="Posts by user id" />
          <Tab label="Create post" />
        </Tabs>
      </Box>
      {tabConfig.map(tab => (
        <TabPanel key={tab.index} value={value} index={tab.index}>
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  );
};

export default Home;
