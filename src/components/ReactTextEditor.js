import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Box,
  Modal,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import Http from "../services/Http";
import ToastNotification from "./ToastNotification";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ReactTextEditor(props) {
  const {
    open,
    data,
    onClose,
    onConfirm,
    row,
    placeholder,
    label,
    title,
    loading,
  } = props;

  const [formValues, setFormValues] = React.useState("");

  React.useEffect(() => {
    if (data) {
      setFormValues(data.items_breakdown);
    }
  }, [data]);

  const handleChange = (content, delta, source, editor) => {
    setFormValues(content);
  };

  const styles = {
    quillWrapper: {
      ".ql-editor": {
        height: row ? row * 100 : 200,
      },
    },
  };

  const handleUpdate = () => {
    onConfirm(formValues);
  };

  return (
    <div>
      <Modal open={open} onCLose={onClose}>
        <Box sx={style}>
          <Box sx={{ backgroundColor: "#EEEEEE", p: 0.5, mb: 1 }}>
            <Typography sx={{ mb: 1, fontSize: 20, fontWeight: 600 }}>
              {label ? label : title ? title : "Update"}
            </Typography>
          </Box>
          <Box sx={styles.quillWrapper}>
            <ReactQuill
              theme="snow"
              value={formValues}
              onChange={handleChange}
              placeholder={placeholder}
            />
          </Box>
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={onClose}
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Update"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ReactTextEditor;
