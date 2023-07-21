import boardUserRelModel from "../models/boardUserRel.model";
import userModel from "../models/user.model";

export const getUser = async (req, res, next) => {
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
