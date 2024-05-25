import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import boardUserRelModel from "../models/boardUserRel.model";
import userModel from "../models/user.model";
import { s3 } from "../middleware/multer";

export const getUser = async (req, res, next) => {
  try {
    if (req.user) {
      const { boardId } = req.body;
      let roleUserOnThisBoard;
      const user = await userModel.findById(req.user.id);
      if (boardId) {
        const userBoardRel = await boardUserRelModel.findOne({
          user: req.user.id,
          board: boardId,
        });
        if (userBoardRel) {
          roleUserOnThisBoard = userBoardRel.userRole;
        }
      }

      if (user) {
        res.send({
          user,
          roleUserOnThisBoard,
        });
      }
    } else {
      res.send({
        notAuthenticated: true,
      });
    }
  } catch (e) {
    console.log(e, " is the god damn error");
  }
};

export const updateEmail = async (req, res) => {
  if (req.user) {
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.user.id },
      { email: req.body.updatedEmail },
      { new: true }
    );
    if (updatedUser) {
      res.status(200).json({
        updatedEmail: updatedUser.email,
      });
    }
  }
};

export const updatePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided." });
    }
    const fileUrl = req.file.location;
    const oldUserData = await userModel.findById(req.user.id);

    if (
      oldUserData &&
      oldUserData.picture &&
      oldUserData.picture.includes("amazonaws.com")
    ) {
      const oldPictureKey = oldUserData.picture.split("/").pop();
      const deleteParams = {
        Bucket: "goodboard",
        Key: oldPictureKey,
      };
      await s3.send(new DeleteObjectCommand(deleteParams));
    }
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.user.id },
      {
        picture: fileUrl,
      },
      {
        new: true,
      }
    );
    if (updatedUser) {
      res.status(200).json(updatedUser);
    }
  } catch (e) {
    console.log(e, " is the error");
  }
};

export const deletePicture = async (req, res) => {
  try {
    if (req.user) {
      const updatedUser = await userModel.findOneAndUpdate(
        { _id: req.user.id },
        {
          picture: null,
        },
        {
          new: true,
        }
      );
      if (updatedUser) {
        res.status(200).json(updatedUser);
      }
    }
  } catch (e) {
    console.log(e);
  }
}