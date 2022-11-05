import { ReactNode } from "react";

import { Box } from "@mui/material";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Box hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </Box>
  );
};

export default TabPanel;
