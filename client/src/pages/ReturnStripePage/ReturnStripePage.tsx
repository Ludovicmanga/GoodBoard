import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { websiteUrl } from "../../helpers/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import LoadingSkeleton from "../../components/LoadingSkeleton/LoadingSkeleton";
import styles from "./ReturnStripePage.module.scss";
import { Skeleton } from "@mui/material";

export const ReturnStripePage = () => {
  const [status, setStatus] = useState(null);
  const activeBoardState = useAppSelector((state) => state.activeBoard);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sessionId = urlParams.get("session_id");
  const boardId = urlParams.get("board_id");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSession = async () => {
    const response = await axios({
      method: "post",
      withCredentials: true,
      url: `${websiteUrl}/api/board/session-status`,
      data: { session_id: sessionId },
    });
    if (response.data) {
      setStatus(response.data.status);
    }
  };

  const updateDB = async () => {
    console.log(activeBoardState._id, " is the id");
    const response = await axios({
      method: "post",
      url: `${websiteUrl}/api/board/update-board-billing-plan`,
      withCredentials: true,
      data: { session_id: sessionId, boardId },
    });
    if (response.data) {
      navigate("/");
      dispatch(
        setGeneralProperties({
          mainSnackBar: {
            isOpen: true,
            message: "Votre plan a bien été changé !",
          },
        })
      );
    }
  };

  useEffect(() => {
    handleSession();
  }, []);

  useEffect(() => {
    if (status === "complete") {
      updateDB();
    }
  }, [status, activeBoardState]);

  return (
    <div className={styles.loaderContainer}>
      <Skeleton
        variant="rounded"
        height={170}
        sx={{
          marginBottom: "1rem",
        }}
      />
      <Skeleton
        variant="rounded"
        height={170}
        sx={{
          marginBottom: "1rem",
        }}
      />
      <Skeleton
        variant="rounded"
        height={170}
        sx={{
          marginBottom: "1rem",
        }}
      />
      <Skeleton
        variant="rounded"
        height={170}
        sx={{
          marginBottom: "1rem",
        }}
      />
    </div>
  );
};
