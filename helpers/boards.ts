import boardUserRelModel from "../models/boardUserRel.model";

export const checkUserHasAccessToBoard = async (
  userId: number,
  boardId: number
) => {
  const boardsTheUserHasAccessTo = await boardUserRelModel.find({
    user: userId,
  });

  const boardFound = boardsTheUserHasAccessTo
    .map((boardUserRel) => boardUserRel.board)
    .find((board) => board.toString() === boardId);

  return boardFound.toString().length > 0;
};
