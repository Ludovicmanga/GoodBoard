import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleSetActiveBoard } from "../../helpers/boards";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

type Props = {};

const ViewBoard = (props: Props) => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.boardId) {
      handleSetActiveBoard(params.boardId, dispatch, navigate);
    }
  }, [params.boardId]);

  return <div></div>;
};

export default ViewBoard;
