import express from "express";
import {
  createBoard,
  getBoard,
  getUserBoards,
  getShareUrl,
  updateColor,
  uploadImage,
  updatePublicStatus,
  getPublicStatus,
  deleteUserFromBoard,
  updateUserRole,
  getBoardUsersList,
  inviteUsers,
} from "../controllers/board.controller";
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage });
const router = express();

router.get("/get/user-boards", getUserBoards);
router.get("/get/:boardId", getBoard);
router.get('/get-board-users-list/:boardId', getBoardUsersList);
router.post('/invite-users', inviteUsers)
router.post("/create", createBoard);
router.post("/get-public-status", getPublicStatus);
router.post("/update-color", updateColor);
router.post("/update-public-status", updatePublicStatus);
router.post("/get-share-url", getShareUrl);
router.post("/upload-image", upload.single("image"), uploadImage);
router.post('/delete-user', deleteUserFromBoard);
router.put('/update-user-role', updateUserRole);
//router.get('/:token', getPublicBoard);

export default router;
