import boardModel from "../models/board.model";
import boardUserRelModel from "../models/boardUserRel.model";

export const getBoard = async (req, res) => {
  try {
    const foundBoard = await boardModel.find({ _id: req.body.boardId });
    res.status(200).send(foundBoard[0]);
  } catch (e) {
    console.log(e, ' is the error');
  }
}

export const getUserBoards = async (req, res) => {
  if (req.user) {
    try {
      const boardsIds = await boardUserRelModel
        .find({ user: req.user.id })
        .then((boardUserRels) =>
          boardUserRels.map((boardUserRel) => boardUserRel.board)
        )

      const boardsLinkedToUser = await boardModel.find({
        _id: {
          $in: boardsIds,
        },
      });
      res.status(200).send(boardsLinkedToUser);
    } catch (e) {
      console.log(e, " is the error");
    }
  }
};

export const createBoard = async (req, res) => {
  if (req.user) {
    const newBoard = new boardModel({
      name: req.body.name,
      description: req.body.description,
    });
    newBoard.save().catch((error) => console.log(error));

    const newBoardUserRelation = new boardUserRelModel({
      user: req.user.id,
      board: newBoard.id,
      userRole: "company",
    });

    newBoardUserRelation.save().catch((error) => console.log(error));
    res.send(newBoard);
  } else {
    console.log("user not logged in");
  }
};
