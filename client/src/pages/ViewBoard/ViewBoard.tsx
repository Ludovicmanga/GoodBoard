import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import { handleSetActiveBoard } from "../../helpers/boards";
import { useAppDispatch } from "../../redux/hooks";

type Props = {};

const ViewBoard = (props: Props) => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.boardId) {
      handleSetActiveBoard(params.boardId, dispatch, navigate);
    }
  }, [params]);
  return <div>ViewBoard</div>;
};

export default ViewBoard;
