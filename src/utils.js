import axios from "./axios";

export const createThread = (
  language,
  framework,
  library,
  textMessage,
  threadId
) =>
  axios.post("/prompt/post-prompt/", {
    thread_id: threadId,
    programming_language_id: language,
    framework_id: framework,
    option_id: library,
    prompt: textMessage,
  });

export const getThreadStatus = (threadId) =>
  axios.get(`/prompt/thread-status?thread_id=${threadId}`);

export const getThreadMessages = (threadId) =>
  axios.get(`/prompt/thread-messages/?thread_id=${threadId}`);

export const getAllThreads = () => {
  axios.get("/prompt/threads-list/");
};

export const giveThreadFeedback = (threadId, rate, userComment) =>
  axios.post("/prompt/post-feedback/", {
    thread_id: threadId,
    value: rate,
    comment: userComment,
  });
