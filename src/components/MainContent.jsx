import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import BaseSelect from "./BaseSelect";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createThread, getThreadMessages, getThreadStatus } from "../utils";
import AssistantMessageBlock from "./AssistantMessageBlock";
import UserMessageBlock from "./UserMessageBlock";
import FeedbackModal from "./FeedbackModal";

const drawerWidth = 240;

const MainContent = ({ threadId, setThreadId }) => {
  const {
    register,
    handleSubmit,
    resetField,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      textMessage: "",
      language: "",
      framework: "",
      library: "",
    },
  });
  const languages = useSelector((state) => state.auth.languages);

  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [selectedFramework, setSelectedFramework] = React.useState("");
  const [selectedLibrary, setSelectedLibrary] = React.useState("");
  const [userRequestMessage, setUserRequestMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [messages, setMesages] = React.useState([]);

  const checkThreadStatus = async (id) => {
    setThreadId(id);
    getThreadStatus(id)
      .then((res) => {
        if (res.data.status === "in_progress") {
          setTimeout(() => {
            checkThreadStatus(id);
          }, 5000);
        } else {
          setLoading(false);
          getThreadMessages(id)
            .then((data) => setMesages(data.data))
            .catch((err) => console.log(err));
          setUserRequestMessage("");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    threadId &&
      getThreadMessages(threadId)
        .then((data) => setMesages(data.data))
        .catch((err) => console.log(err));
  }, [threadId]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <form
        onSubmit={handleSubmit(async (data) => {
          setLoading(true);
          setUserRequestMessage(data?.textMessage);
          await createThread(
            data?.language,
            data?.framework,
            data?.library,
            data?.textMessage,
            threadId
          )
            .then((data) => checkThreadStatus(data.data.thread_id))
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
          resetField("textMessage");
        })}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <Box sx={{ display: "flex", columnGap: 3 }}>
            <BaseSelect
              name="language"
              rules={{ required: "Language is required" }}
              control={control}
              label="Language"
              item={selectedLanguage.name}
              setItem={setSelectedLanguage}
              data={languages}
              error={Boolean(errors.language)}
              helperText={
                Boolean(errors.language) ? errors.language.message : null
              }
            />

            <BaseSelect
              name="framework"
              control={control}
              disabled={!selectedLanguage}
              label="Framework"
              item={selectedFramework}
              setItem={setSelectedFramework}
              data={
                languages?.find((item) => item.name === selectedLanguage.name)
                  ?.frameworks
              }
            />

            <BaseSelect
              name="library"
              control={control}
              disabled={!selectedLanguage}
              label="Library"
              item={selectedLibrary}
              setItem={setSelectedLibrary}
              data={languages
                ?.find((item) => item.name === selectedLanguage.name)
                ?.options.filter((library) =>
                  selectedFramework
                    ? library.framework === selectedFramework.id
                    : Boolean(!library.framework)
                )}
            />
          </Box>

          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => setModalOpen(true)}
          >
            Leave feedback
          </Button>
        </Box>

        <Box>
          {messages?.map((item) =>
            item.role === "user" ? (
              <UserMessageBlock text={item.content} />
            ) : (
              <>
                <AssistantMessageBlock
                  threadId={threadId}
                  text={item.content}
                />
              </>
            )
          )}

          {userRequestMessage && <UserMessageBlock text={userRequestMessage} />}
          {loading && <p>Assistant is writting...</p>}
        </Box>

        <Box sx={{ display: "flex", alignItems: "start", columnGap: 2 }}>
          <TextField
            {...register("textMessage", { required: "Message is required" })}
            error={Boolean(errors.textMessage)}
            sx={{ width: "100%" }}
            id="filled-multiline-static"
            label="Text here"
            multiline
            variant="filled"
            helperText={
              Boolean(errors.textMessage) ? errors.textMessage.message : null
            }
          />
          <Button type="submit" variant="contained" color="primary">
            {loading ? <CircularProgress color="inherit" /> : "SEND"}
          </Button>
        </Box>
      </form>
      <FeedbackModal id={threadId} open={isModalOpen} setOpen={setModalOpen} />
    </Box>
  );
};

export default MainContent;
