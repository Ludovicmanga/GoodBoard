import { Fab } from "@mui/material";
import styles from "./SexyBtn3.module.scss";
import { Add } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { handleOpenNewFeatureRequestModal } from "../../helpers/features";
import { FeatureRequestModalMode } from "../../helpers/types";

export const SexyBtn3 = () => {
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((state) => state.loggedUser);
  const activeBoardState = useAppSelector((state) => state.activeBoard);
  const allFeatureRequests = useAppSelector(
    (state) => state.allFeatureRequests
  );

  const openNewFeatureRequestModal = () => {
    if (activeBoardState.billingPlan) {
      handleOpenNewFeatureRequestModal({
        activeBoardPlan: activeBoardState.billingPlan,
        mode: FeatureRequestModalMode.creation,
        dispatch,
        numberOfFeatureRequests: allFeatureRequests.length,
        loggedUser: loggedUser.user,
      });
    }
  };

  return (
    <Fab
      color="primary"
      variant="extended"
      onClick={openNewFeatureRequestModal}
    >
      <Add sx={{ mr: 1 }} />
      Crée ta première idée
    </Fab>
  );
};
