import { useState } from "react";

import { Box, Button, CircularProgress, TextField } from "@mui/material";

import { postsActions, postsSelector } from "../store/slices/postsSlice";
import { useDispatch, useSelector } from "../store/store";
import { PostBody } from "../types/posts";

const CreatePost = () => {
  const [postBody, setPostBody] = useState<PostBody<string>>({ body: "", title: "", userId: "" });
  const { isError, isFetching, errorMessage } = useSelector(postsSelector);

  const dispatch = useDispatch();

  const handleSubmitPost = () => {
    postBody && dispatch(postsActions.createPost(postBody));
    setPostBody({ body: "", title: "", userId: "" });
  };

  if (isFetching) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Box>{errorMessage}</Box>;
  }

  return (
    <>
      <Box display={"flex"} marginBottom={2} marginTop={5}>
        <TextField
          required
          label="User ID"
          defaultValue=""
          fullWidth
          type={"number"}
          onChange={e => setPostBody({ ...postBody, userId: e.target.value })}
        />
        <TextField
          required
          label="Title"
          defaultValue=""
          fullWidth
          onChange={e => setPostBody({ ...postBody, title: e.target.value })}
        />
        <TextField
          required
          label="Body"
          defaultValue=""
          fullWidth
          onChange={e => setPostBody({ ...postBody, body: e.target.value })}
        />
      </Box>
      <Button
        fullWidth
        variant={"outlined"}
        disabled={!postBody.body || !postBody.title || !postBody.userId}
        onClick={handleSubmitPost}
      >
        Submit
      </Button>
    </>
  );
};

export default CreatePost;
