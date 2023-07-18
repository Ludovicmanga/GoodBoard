import boardModel from "../models/board.model";
import boardUserRelModel from "../models/boardUserRel.model";
import { getAllBoardFeatureRequestsHelper } from "../helpers/featureRequests";
import { secretKey, verifyJwtToken, websiteUrl } from "../helpers/auth";
import { UserRoles } from "../helpers/types";

export const updateColor = async (req, res) => {
  try {
    const { themeColor, boardId } = req.body;
    const updatedBoard = await boardModel.findOneAndUpdate(
      { _id: boardId },
      {
        themeColor,
      },
      {
        new: true,
      }
    );
    res.status(200).send(updatedBoard.themeColor);
  } catch (e) {
    console.log(e, " is the error");
  }
};

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
        themeColor: req.body.themeColor,
        url: "emptyUrl",
        isPublic: false,
      });
      newBoard
        .save()
        .then((savedObject) => {
          //const token = generateJwtToken(savedObject.id, secretKey);
          savedObject.url = `${websiteUrl}/api/board/${savedObject.id}`;
          savedObject.save();
        })
        .catch((error) => console.log(error));

      const newBoardUserRelation = new boardUserRelModel({
        user: req.user.id,
        board: newBoard.id,
        userRole: UserRoles.admin,
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
      res.status(200).send({ url: foundBoard.url });
    }
    if (req.body.publicStatus === false) {
      res.status(200).send({ url: foundBoard.url });
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

export const uploadImage = (req, res) => {
  console.log("I will upload the image");
};

export const updatePublicStatus = async (req, res) => {
  try {
    const updatedBoard = await boardModel.findOneAndUpdate(
      { _id: req.body.activeBoard },
      {
        isPublic: req.body.publicStatus,
      },
      {
        new: true,
      }
    );
    if (updatedBoard) {
      res.send(req.body.publicStatus);
    }
  } catch (e) {
    console.log(e, "is the error");
  }
};

export const getPublicStatus = async (req, res) => {
  try {
    const foundBoardStatus = await boardModel.findById(req.body.activeBoard).select('isPublic');
    console.log(foundBoardStatus.isPublic, ' is the found board status')
    if (foundBoardStatus) {
      res.send(foundBoardStatus.isPublic)
    }
  } catch (e) {
    console.log(e, "is the error");
  }
};
