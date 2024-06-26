import featureRequestModel from "../models/featureRequest.model";
import userModel from "../models/user.model";
import { FeatureRequestStatus, UserRoles } from "../helpers/types";
import boardModel from "../models/board.model";
import {
  addToChangeLog,
  getAllBoardFeatureRequestsMappedWithTopics,
} from "../helpers/featureRequests";
import boardUserRelModel from "../models/boardUserRel.model";
import changeLogModel from "../models/changeLog.model";
import { checkUserHasAccessToBoardHelper } from "../helpers/boards";
import topicModel from "../models/topic.model";

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
    const { title, details, creatorType, status, creator, topics } =
      req.body.featureRequest;
    if (req.body.featureRequest._id.length > 0) {
      const beforeUpdate = await featureRequestModel.findById(
        req.body.featureRequest._id
      );
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
        if (updated.status === FeatureRequestStatus.done && beforeUpdate?.status !== FeatureRequestStatus.done) {
          await addToChangeLog(updated.board!, updated._id);
        }
        const topicsOfFeature = await topicModel.find({
          _id: {
            $in: topics.map(top => top._id),
          },
        });
 
        const updatedWithTopics = {
          ...updated.toObject(),
          topics: topicsOfFeature,
        }
        res.send(updatedWithTopics);
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
      creatorType: foundUserBoardRel?.userRole,
      status: featureRequestData.status,
      creator: req.user.id,
      board: req.body.boardId,
      topics: featureRequestData.topics.map(top => top._id),
    });

    const topicsOfFeature = await topicModel.find({
      _id: {
        $in: featureRequestData.topics.map(top => top._id),
      },
    });

    if (newFeatureRequest.status === "done") {
      await addToChangeLog(newFeatureRequest.board!, newFeatureRequest._id!);
    }
    if (newFeatureRequest) {
      res.status(200).send({
        ...newFeatureRequest.toObject(),
        topics: topicsOfFeature
      });
    }
  } catch (e) {
    console.log(e, " is the error message");
  }
};

export const upVote = async (req, res) => {
  try {
    const updatedFeatureRequest = await featureRequestModel.updateOne(
      { _id: req.body.featureRequestId },
      { $addToSet: { voters: req.user.id } }
    );

    await userModel.updateOne(
      { _id: req.user.id },
      { $addToSet: { voted: req.body.featureRequestId } }
    );

    res.status(200).send(updatedFeatureRequest);
  } catch (e) {
    console.log(e, " is the err");
  }
};

export const downVote = async (req, res) => {
  const updatedFeatureRequest = await featureRequestModel.updateOne(
    { _id: req.body.featureRequestId },
    { $pull: { voters: req.user.id } }
  );

  await userModel.updateOne(
    { _id: req.user.id },
    { $pull: { voted: req.body.featureRequestId } }
  );

  res.status(200).send(updatedFeatureRequest);
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

    const topicsFromBoard = await topicModel.find({ boardId });

    const changeLogListWithTopics = changeLogList.map(changeL => {
      return {
        ...changeL.toObject(),
        topics: topicsFromBoard.filter(top => changeL.topics.includes(top._id)),
      }
    })

    res.status(200).send(changeLogListWithTopics);
  } catch (e) {}
};
