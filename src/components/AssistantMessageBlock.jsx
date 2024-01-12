import React from "react";
import CodeFormater from "./CodeFormater";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { IconButton, Tooltip } from "@mui/material";
import FeedbackModal from "./FeedbackModal";

const AssistantMessageBlock = ({ text, threadId }) => {
  const [isModalOpen, setModalOpen] = React.useState(false);

  const parts =
    text.split(/(```[\s\S]*?```)/); /*check if text have parts of code*/
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", columnGap: 10 }}>
        <div
          style={{
            width: 25,
            height: 25,
            borderRadius: "50%",
            backgroundColor: "blue",
          }}
        />
        <p style={{ fontWeight: "bold" }}>Assistant</p>
      </div>
      <div
        style={{
          marginLeft: 35,
          display: "flex",
          flexDirection: "column",
          gap: 15,
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
            return <div key={index}>{part}</div>;
          }
        })}
        <div style={{ display: "flex" }}>
          <Tooltip title="Leave feedback">
            <IconButton onClick={() => setModalOpen(true)}>
              <RateReviewIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <FeedbackModal id={threadId} open={isModalOpen} setOpen={setModalOpen} />
    </div>
  );
};

export default AssistantMessageBlock;
