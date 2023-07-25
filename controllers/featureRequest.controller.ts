import featureRequestModel from "../models/featureRequest.model";
import userModel from "../models/user.model";
import topicModel from "../models/topic.model";
import { UserRoles } from "../helpers/types";
import boardModel from "../models/board.model";
import {
  addToChangeLog,
  getAllBoardFeatureRequestsMappedWithTopics,
} from "../helpers/featureRequests";
import boardUserRelModel from "../models/boardUserRel.model";
import changeLogModel from "../models/changeLog.model";
import { checkUserHasAccessToBoardHelper } from "../helpers/boards";

export const getAllFeatureRequests = async (req, res) => {
  await featureRequestModel
    .find()
    .then((allFeatureRequests) => res.status(200).send(allFeatureRequests));
};

export const getAllBoardFeatureRequests = async (req, res) => {
  try {
    const activeBoard = await boardModel.findById(req.body.boardId);
    if (activeBoard) {
      if (activeBoard.isPublic) {
        const mapped = await getAllBoardFeatureRequestsMappedWithTopics(
          req.body.boardId
        );
        res.status(200).send(mapped);
      } else {
        let userHasAccessToTheBoard;
        if (req.user) {
          userHasAccessToTheBoard = await checkUserHasAccessToBoardHelper(
            req.user.id,
            req.body.boardId
          );
        } else {
          userHasAccessToTheBoard = false;
        }
        if (userHasAccessToTheBoard) {
          const mapped = await getAllBoardFeatureRequestsMappedWithTopics(
            req.body.boardId
          );
          res.status(200).send(mapped);
        } else {
          res.send("user doesn't have access to the board");
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getAllCompanyFeatureRequests = async (req, res) => {
  await featureRequestModel
    .find({ creatorType: { $in: [UserRoles.admin, UserRoles.member] } })
    .then((allCompanyFeatureRequests) =>
      res.status(200).send(allCompanyFeatureRequests)
    );
};
export const getAllUserFeatureRequests = async (req, res) => {
  await featureRequestModel
    .find({ creatorType: UserRoles.externalUser })
    .then((allUserFeatureRequests) =>
      res.status(200).send(allUserFeatureRequests)
    );
};

export const updateFeatureRequest = async (req, res) => {
  try {
    const { title, details, creatorType, status, creator, topics, boardId } =
      req.body.featureRequest;
    if (req.body.featureRequest._id.length > 0) {
      const beforeUpdate = await featureRequestModel.findById(req.body.featureRequest._id);
      const updated = await featureRequestModel.findOneAndUpdate(
        { _id: req.body.featureRequest._id },
        {
          title,
          details,
          creatorType,
          status,
          creator,
          topics,
        },
        {
          new: true,
        }
      );
      if (updated) {
        if (updated.status === "done" && beforeUpdate.status !== "done") {
          await addToChangeLog(updated.board, updated._id);
        }
        res.send(updated);
      }
    }
  } catch (e) {
    console.log(e, " is the error");
  }
};

export const createFeatureRequest = async (req, res) => {
  try {
    const featureRequestData = req.body.featureRequest;

    const foundUserBoardRel = await boardUserRelModel.findOne({
      user: req.user.id,
      board: req.body.boardId,
    });

    const newFeatureRequest = await featureRequestModel.create({
      title: featureRequestData.title,
      details: featureRequestData.details,
      creatorType: foundUserBoardRel.userRole,
      status: featureRequestData.status,
      creator: req.user.id,
      board: req.body.boardId,
    });

    if (newFeatureRequest.status === "done") {
      await addToChangeLog(newFeatureRequest.board, newFeatureRequest._id);
    }
    if (newFeatureRequest) {
      res.status(200).send(newFeatureRequest);
    }
  } catch (e) {
    console.log(e, " is the error message");
  }
};

export const upVote = async (req, res) => {
  const updatedFeatureRequest = await featureRequestModel.updateOne(
    { _id: req.params.id },
    { $addToSet: { voters: req.body.userId } }
  );

  await userModel.updateOne(
    { _id: req.body.userId },
    { $addToSet: { voted: req.params.id } }
  );

  res.status(200).json({ updatedFeatureRequest });
};

export const downVote = async (req, res) => {
  const updatedFeatureRequest = await featureRequestModel.updateOne(
    { _id: req.params.id },
    { $pull: { voters: req.body.userId } }
  );

  await userModel.updateOne(
    { _id: req.body.userId },
    { $pull: { voted: req.params.id } }
  );

  res.status(200).json({ updatedFeatureRequest });
};

export const deleteFeatureRequest = async (req, res) => {
  await featureRequestModel.findOneAndDelete({
    _id: req.body.featureRequestId,
  });
  res.json({
    deleted: true,
  });
};

export const getChangeLogList = async (req, res) => {
  try {
    const { boardId } = req.body;

    const changeLogList = await changeLogModel.find({
      boardId,
    });

    res.status(200).send(changeLogList);
  } catch (e) {}
};
