import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FeaturesLoadingSkeleton } from "../FeaturesLoadingSkeleton/FeaturesLoadingSkeleton";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function AlertDialog(props: {}) {
  const dialogAlertState = useAppSelector(
    (state) => state.generalProperties.dialogAlert
  );

  const [isLoading, setIsLoading] = React.useState(true);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (
      dialogAlertState &&
      dialogAlertState.title &&
      dialogAlertState.textDetails &&
      dialogAlertState.submitBtnText &&
      dialogAlertState.submitBtnColor
    ) {
      setIsLoading(false);
    }
  }, [dialogAlertState, dialogAlertState?.isOpen]);

  return (
    <Dialog
      open={dialogAlertState?.isOpen!}
      onClose={dialogAlertState?.handleClose}
    >
      {isLoading ? (
        <FeaturesLoadingSkeleton />
      ) : (
        <>
          <DialogTitle>{dialogAlertState?.title}</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={dialogAlertState?.handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
          <DialogContent>
            <DialogContentText>
              {dialogAlertState?.textDetails}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color={dialogAlertState?.submitBtnColor}
              onClick={async () => {
                await dialogAlertState?.handleSubmit();
                dispatch(
                  setGeneralProperties({
                    dialogAlert: null,
                  })
                );
              }}
              autoFocus
            >
              {dialogAlertState?.submitBtnText}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
