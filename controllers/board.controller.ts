import boardModel from "../models/board.model";
import boardUserRelModel from "../models/boardUserRel.model";
import { getAllBoardFeatureRequestsHelper } from "../helpers/featureRequests";
import { secretKey, verifyJwtToken, websiteUrl } from "../helpers/auth";
import { UserRoles } from "../helpers/types";
import userModel from "../models/user.model";
import {
  checkUserHasAccessToBoard,
  giveAccessToBoard,
  sendEmailToUser,
} from "../helpers/boards";
import { generateStrongPassword } from "../utils/utils";

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
        isPublic: req.body.boardIsPublic,
        websiteUrl: req.body.website,
      });
      newBoard
        .save()
        .then((savedObject) => {
          //const token = generateJwtToken(savedObject.id, secretKey);
          savedObject.url = `${websiteUrl}/view-board/${savedObject.id}`;
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
    if (foundBoard) {
      res.status(200).send({ url: foundBoard.url });
    } else {
      res.status(200).send({ url: "" });
    }
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

export const setBoardImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided." });
    }
    const { boardId } = req.body;
    const fileUrl = req.file.location;

    if (req.body.boardId) {
      const boardFoundInDB = await boardModel.findOneAndUpdate(
        { _id: boardId },
        {
          picture: fileUrl,
        },
        {
          new: true,
        }
      );
      if (boardFoundInDB) {
        res.status(200).json({ url: fileUrl });
      }
    }
  } catch (e) {
    console.log(e, " is the error");
  }
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
    const foundBoardStatus = await boardModel
      .findById(req.body.activeBoard)
      .select("isPublic");
    if (foundBoardStatus) {
      res.send(foundBoardStatus.isPublic);
    }
  } catch (e) {
    console.log(e, "is the error");
  }
};

export const deleteUserFromBoard = async (req, res) => {
  try {
    const userFound = await userModel.findOne({ email: req.body.userEmail });
    const deletedUser = await boardUserRelModel.findOneAndDelete({
      user: userFound._id,
      board: req.body.boardId,
    });
    if (deletedUser) {
      res.send("deleted");
    }
  } catch (e) {
    console.log(e, " is the error");
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const userFound = await userModel.findOne({ email: req.body.userEmail });
    const updatedUser = await boardUserRelModel.findOneAndUpdate(
      {
        user: userFound._id,
        board: req.body.boardId,
      },
      {
        userRole: req.body.role,
      },
      { new: true }
    );
    if (updatedUser) {
      res.status(200).send(updatedUser);
    }
  } catch (e) {
    console.log(e, " is the error");
  }
};

export const getBoardUsersList = async (req, res) => {
  try {
    const boardUserRels = await boardUserRelModel.find({
      board: req.params.boardId,
    });

    const userIds = boardUserRels.map((boardUserRel) => boardUserRel.user);

    const usersLinkedToBoard = await userModel.find({
      _id: {
        $in: userIds,
      },
    });
    if (usersLinkedToBoard) {
      const usersMappedWithRole = usersLinkedToBoard
        .map((user) => {
          return {
            email: user.email,
            role: boardUserRels.find(
              (rel) => rel.user.toString() === user._id.toString()
            ).userRole,
          };
        })
        .filter(
          (userMapped) => userMapped && userMapped.email !== req.user.email
        );
      res.send(usersMappedWithRole || []);
    }
  } catch (e) {
    console.log(e, " is the error");
  }
};

export const inviteUsers = async (req, res) => {
  try {
    for (const userToInvite of req.body.usersToInviteList) {
      const foundUser = await userModel.findOne({
        email: userToInvite.email,
      });
      if (foundUser) {
        const userHasAccessToBoard = await checkUserHasAccessToBoard(
          foundUser._id,
          req.body.boardId
        );
        if (userHasAccessToBoard) {
          console.log("user already has access to board");
        } else {
          await giveAccessToBoard(
            foundUser._id,
            req.body.boardId,
            userToInvite.role
          );
        }
      } else {
        const randomPassword = generateStrongPassword(10);
        const newUser = new userModel({
          email: userToInvite.email,
          password: randomPassword,
          type: "user",
        });

        const newUserSaved = await newUser.save().catch((error) => {
          console.log("didnt work because ", error);
        });
        await giveAccessToBoard(
          newUserSaved._id,
          req.body.boardId,
          userToInvite.role
        );
        await sendEmailToUser(userToInvite.email, randomPassword);
      }
    }
    res.send("all good");
  } catch (e) {
    console.log(e, " is the error");
  }
};
