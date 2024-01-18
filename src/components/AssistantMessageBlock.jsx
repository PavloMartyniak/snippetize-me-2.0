import React from "react";
import CodeFormater from "./CodeFormater";
import { Box, Typography } from "@mui/material";

const AssistantMessageBlock = ({ text, threadId }) => {
  const parts =
    text.split(/(```[\s\S]*?```)/); /*check if text have parts of code*/
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", columnGap: 1.5 }}>
        <div
          style={{
            width: 25,
            height: 25,
            borderRadius: "50%",
            backgroundColor: "blue",
          }}
        />
        <Typography sx={{ fontWeight: "bold" }}>Assistant</Typography>
      </Box>
      <Box
        sx={{
          marginLeft: 5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {parts.map((part, index) => {
          // Check if the part is code or non-code
          if (index % 2 === 1) {
            // Code part, extract language and code
            const [, language, code] = /```(\w+)([\s\S]*?)```/.exec(part) || [];
            return <CodeFormater key={index} code={code} language={language} />;
          } else {
            // Non-code part
            return <Typography key={index}>{part}</Typography>;
          }
        })}
      </Box>
    </>
  );
};

export default AssistantMessageBlock;
