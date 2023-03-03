import boardModel from "../models/board.model";
import boardUserRelModel from "../models/boardUserRel.model";
import { getAllBoardFeatureRequestsHelper } from "../helpers/featureRequests";
import {
  generateJwtToken,
  secretKey,
  verifyJwtToken,
  websiteUrl,
} from "../helpers/auth";

export const getBoard = async (req, res) => {
  try {
    const foundBoard = await boardModel.find({ _id: req.params.boardId });
    res.status(200).send(foundBoard[0]);
  } catch (e) {
    console.log(e, " is the error");
  }
};

export const getUserBoards = async (req, res) => {
  if (req.user) {
    try {
      const boardsIds = await boardUserRelModel
        .find({ user: req.user.id })
        .then((boardUserRels) =>
          boardUserRels.map((boardUserRel) => boardUserRel.board)
        );

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
  try {
    if (req.user) {
      const newBoard = new boardModel({
        name: req.body.name,
        description: req.body.description,
        privateUrl: 'emptyUrl',
        publicUrl: 'emptyUrl',
      });
      newBoard.save()
        .then(savedObject => {
          const token = generateJwtToken(savedObject.id, secretKey);
          const publicUrl = `${websiteUrl}/api/board/${token}`;
          savedObject.privateUrl = `${websiteUrl}/api/board/${savedObject.id}`;
          savedObject.publicUrl = publicUrl;
          savedObject.save();
      })
        .catch((error) => console.log(error));

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
  } catch (e) {
    console.log(e, " is the error");
  }
};

export const getShareUrl = async (req, res) => {
  try {
    const foundBoard = await boardModel.findOne({ _id: req.body.boardId });
    if (req.body.publicStatus === true) {
      res.status(200).send({ url: foundBoard.publicUrl });
    }
    if (req.body.publicStatus === false) {
      res.status(200).send({ url: foundBoard.privateUrl });
    }
    return null;
  } catch (e) {
    console.log(e, " is the error");
  }
};

export const getPublicBoard = async (req, res) => {
  try {
    const boardId = verifyJwtToken(req.params.token, secretKey);
    if (boardId) {
      const boardFeatureRequests = await getAllBoardFeatureRequestsHelper(
        boardId
      );
      res.status(200).send(boardFeatureRequests);
    } else {
      new Error("no board id found");
    }
  } catch (e) {
    console.log(e, " is the error");
  }
};
