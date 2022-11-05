import { FC, useEffect, useState } from "react";

import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { postsActions, postsSelector } from "../store/slices/postsSlice";
import { useDispatch, useSelector } from "../store/store";
import Cards from "./Cards";

const UserSelector: FC = () => {
  const [userId, setUserId] = useState("1");
  const { users } = useSelector(postsSelector);
  const dispatch = useDispatch();

  const { isError, errorMessage, isFetching, postsByUser } = useSelector(postsSelector);

  useEffect(() => {
    dispatch(postsActions.getPostsByUser(Number(userId)));
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setUserId(event.target.value);
    dispatch(postsActions.getPostsByUser(Number(event.target.value)));
  };

  if (isFetching) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Box>{errorMessage}</Box>;
  }

  return (
    <>
      <FormControl sx={{ m: 2, minWidth: 120 }}>
        <InputLabel>User ID</InputLabel>
        <Select value={userId} label="User ID" onChange={handleChange}>
          {users?.map(user => (
            <MenuItem key={user} value={user}>
              {user}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {postsByUser && <Cards postsData={postsByUser} />}
    </>
  );
};

export default UserSelector;
