import React from "react";
import { useForm } from "react-hook-form";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import BaseSelect from "../components/BaseSelect";
import {
  createThread,
  getAllThreads,
  getThreadMessages,
  getThreadStatus,
} from "../utils";
import UserMessageBlock from "../components/UserMessageBlock";
import AssistantMessageBlock from "../components/AssistantMessageBlock";

const HomePage = () => {
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
  const [messages, setMesages] = React.useState([]);
  const [threadId, setThreadId] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [allThreads, setAllThreads] = React.useState([]);

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

  const getAllThreadsList = async () => {
    const data = await getAllThreads();
    setAllThreads(data.data);
  };

  React.useEffect(() => {
    getAllThreadsList();
    threadId &&
      getThreadMessages(threadId)
        .then((data) => setMesages(data.data))
        .catch((err) => console.log(err));
  }, [threadId]);

  return (
    <div style={{ display: "flex", maxHeight: "93vh" }}>
      <div
        style={{
          overflow: "auto",
          width: "10%",
          paddingLeft: 20,
          backgroundColor: "#1E1E1E",
          color: "white",
        }}
      >
        {allThreads?.map((item) => (
          <p onClick={() => setThreadId(item.id)} style={{ cursor: "pointer" }}>
            {item.id}
          </p>
        ))}
      </div>
      <form
        style={{
          width: "100%",
          marginInline: 20,
          overflow: "auto",
          paddingBlock: 20,
        }}
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
        <div style={{ display: "flex", alignItems: "center", columnGap: 10 }}>
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
        </div>
        <div style={{ maxHeight: "85%", minHeight: "85%", overflow: "auto" }}>
          <div>
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

            {userRequestMessage && (
              <UserMessageBlock text={userRequestMessage} />
            )}
            {loading && <p>Assistant is writting...</p>}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "start", columnGap: 10 }}>
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
        </div>
      </form>
    </div>
  );
};

export default HomePage;
