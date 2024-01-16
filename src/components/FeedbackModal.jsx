import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Rating, TextField } from "@mui/material";
import { giveThreadFeedback } from "../utils";

const FeedbackModal = ({ open, setOpen, id }) => {
  const [feedback, setFeedback] = React.useState({
    thread_id: id,
    value: null,
    comment: "",
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleSend = async () => {
    giveThreadFeedback(feedback)
      .then((res) => handleClose())
      .catch((err) => console.log("err", err));
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Leave your feedback"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let us help you. This means sending your feedback to us, and we will
            find best solutions for you.
          </DialogContentText>

          <Rating
            sx={{ marginTop: 1 }}
            name="simple-controlled"
            value={feedback.value}
            onChange={(event, newValue) => {
              setFeedback({ ...feedback, value: newValue });
            }}
          />

          <TextField
            sx={{ width: "100%", marginTop: 1 }}
            id="filled-multiline-static"
            label="Feedback message"
            onChange={(e) =>
              setFeedback({ ...feedback, comment: e.target.value })
            }
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSend} autoFocus>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default FeedbackModal;
