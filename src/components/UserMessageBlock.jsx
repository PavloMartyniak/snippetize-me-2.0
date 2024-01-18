import { Box, Typography } from "@mui/material";
import React from "react";

const UserMessageBlock = ({ text }) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", columnGap: 1.5 }}>
        <div
          style={{
            width: 25,
            height: 25,
            borderRadius: "50%",
            backgroundColor: "black",
          }}
        />
        <Typography style={{ fontWeight: "bold" }}>You</Typography>
      </Box>
      <Typography sx={{ marginLeft: 5 }}>{text}</Typography>
    </>
  );
};

export default UserMessageBlock;
