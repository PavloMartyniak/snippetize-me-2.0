import React from "react";
import { Box } from "@mui/material";
import MainContent from "../components/MainContent";
import SideBar from "../components/SideBar";

const HomePage = () => {
  const [threadId, setThreadId] = React.useState(null);

  const handleSelectThread = (id) => {
    setThreadId(id);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar selectThread={handleSelectThread} />
      <MainContent threadId={threadId} setThreadId={setThreadId} />
    </Box>
  );
};

export default HomePage;
