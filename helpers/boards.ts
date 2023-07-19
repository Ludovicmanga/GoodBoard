import boardUserRelModel from "../models/boardUserRel.model";
import nodemailer from "nodemailer";

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

export const sendEmailToUser = async (userEmail: string[], password: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ludovic.mangaj@gmail.com", // Your Gmail email address
      pass: "wzzsdkxqcahasfem", // Your Gmail password or App Password if using 2FA
    },
  });

  // Define the email options
  const mailOptions = {
    from: "ludovic.mangaj@gmail.com", // Sender address (your Gmail email address)
    to: userEmail, // Recipient's email address
    subject: "You got invited to Goodboard",
    text: `Hello, you got invited to goodboard! here are the infos for login. Login : ${userEmail}, password: ${password}`,
  };
  return await transporter.sendMail(mailOptions);
};

export const giveAccessToBoard = async (userId: number, boardId: number, userRole: string) => {
  const newRel = new boardUserRelModel({
    user: userId,
    board: boardId,
    userRole
  });
  await newRel.save().catch((error) => {
    console.log("didnt work because ", error);
  });
}