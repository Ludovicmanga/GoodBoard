import boardModel from "../models/board.model";
import boardUserRelModel from "../models/boardUserRel.model";
import { getAllBoardFeatureRequestsHelper } from "../helpers/featureRequests";
import { secretKey, verifyJwtToken, websiteUrl } from "../helpers/auth";
import { UserRoles } from "../helpers/types";
import userModel from "../models/user.model";
import {
  checkUserHasAccessToBoardHelper,
  giveAccessToBoard,
  sendEmailToUser,
} from "../helpers/boards";
import { generateStrongPassword, normalizeURL } from "../utils/utils";
import Stripe from "stripe";
//const STRIPE_KEY = "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"
const STRIPE_KEY = "sk_test_JaQdbPBGQK1WZpu83jOtm9MU00EItXeAHs";
const stripe = new Stripe(STRIPE_KEY, {
  //@ts-ignore
  apiVersion: null,
});
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

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
  const { name, description, themeColor, isPublic, companyWebsiteUrl } =
    req.body;
  try {
    if (req.user) {
      let fileUrl;
      if (req.file && req.file.location) {
        fileUrl = req.file.location;
      }
      const newBoard = await boardModel.create({
        name,
        description,
        themeColor: themeColor || "blue",
        isPublic,
        websiteUrl: normalizeURL(companyWebsiteUrl),
        picture: fileUrl,
        billingPlan: "free",
      });
      const updatedNewBoard = await boardModel.findOneAndUpdate(
        {
          _id: newBoard.id,
        },
        {
          url: `${websiteUrl}/view-board/${newBoard.id}`,
        },
        {
          new: true,
        }
      );

      const newBoardUserRelation = await boardUserRelModel.create({
        user: req.user.id,
        board: newBoard.id,
        userRole: UserRoles.admin,
      });

      if (newBoardUserRelation) {
        res.send(updatedNewBoard);
      }
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

const s3 = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: "AKIAUOKDHNEHIBVHSDEY",
    secretAccessKey: "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",
  },
});

export const setBoardImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided." });
    }
    const { boardId } = req.body;
    const fileUrl = req.file.location;

    if (req.body.boardId) {
      const oldBoardData = await boardModel.findById(boardId);

      if (oldBoardData && oldBoardData.picture) {
        const oldPictureKey = oldBoardData.picture.split("/").pop();
        const deleteParams = {
          Bucket: "goodboard",
          Key: oldPictureKey,
        };
        await s3.send(new DeleteObjectCommand(deleteParams));
      }

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
    res.status(500).json({ message: "Internal Server Error" });
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
        const userHasAccessToBoard = await checkUserHasAccessToBoardHelper(
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

export const createCheckoutSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    line_items: [
      {
        price: req.body.selectedPlan.stripeId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `http://localhost:3000/successful-stripe-payment?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3000?canceled-stripe-payment`,
  });

  res.send(session.url);
};

export const createPortalSession = async (req, res) => {
  try {
    const { session_id } = req.body;
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    const returnUrl = websiteUrl;

    const portalSession = await stripe.billingPortal.sessions.create({
      //@ts-ignore
      customer: checkoutSession.customer,
      return_url: returnUrl,
    });
    if (portalSession.url) {
      res.send(portalSession.url);
    }
  } catch (e) {
    console.log(e);
  }
};

export const updateBoardBillingPlan = async (req, res) => {
  try {
    const { session_id, boardId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items.data.price.product"], // Expand the line items to include product details
    });

    if (session.payment_status === "paid") {
      const lineItems = session?.line_items?.data;
      //@ts-ignore
      const productName = lineItems?.[0]?.price?.product.name as string;
      if (productName) {
        const foundBoard = await boardModel.findOneAndUpdate(
          {
            _id: boardId,
          },
          {
            billingPlan: productName.toLowerCase(),
          },
          {
            new: true,
          }
        );
        if (foundBoard) {
          res.status(200).send(foundBoard);
        }
      }
    } else {
      // Payment not successful, or session not found
      res
        .status(400)
        .json({ status: "failed", message: "Payment not successful." });
    }
  } catch (error) {
    // Error occurred during the request
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching payment details.",
    });
  }
};

export const checkUserHasAccessToBoard = async (req, res) => {
  try {
    const { boardId } = req.body;
    const board = await boardModel.findById(boardId);
    if (board) {
      if (board.isPublic) {
        res.send(true);
      } else {
        if (req.user) {
          const boardToFind = await boardUserRelModel.findOne({
            user: req.user.id,
            board: boardId,
          });
          res.send(boardToFind);
        } else {
          console.log('need to be logged to access a private board')
          res.send(null);
        }
      }
    } else {
      res.send(null);
    }
  } catch (e) {
    console.log(e);
  }
};
