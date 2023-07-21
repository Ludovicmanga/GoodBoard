import { useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import { TbCopy } from "react-icons/tb";


const CopyToClipboardButton = (props: {
  textToCopy: string;
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(props.textToCopy);
  };

  return (
    <>
      <IconButton onClick={handleClick} color="primary">
        <TbCopy />
      </IconButton>
      <Snackbar
        message="Copied to clipboard"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
};

export default CopyToClipboardButton;
