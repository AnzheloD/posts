import { FC } from "react";

import { Card, CardContent, Typography } from "@mui/material";

interface Props {
  title: string;
  body: string;
  id: number;
}

const CustomCard: FC<Props> = ({ title, body, id }) => {
  return (
    <Card sx={{ m: 2 }}>
      <CardContent>
        <Typography variant={"body1"}>
          {id} {title}
        </Typography>
        <Typography variant={"body2"}>{body}</Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
