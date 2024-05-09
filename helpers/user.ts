import { User } from "../client/src/helpers/types";
import boardUserRelModel from "../models/boardUserRel.model";
import { UserRoles } from "./types";

export const checkUserIsAdminOnThisBoard = async (user: User, boardId: number) => {
    const boardUserRel = await boardUserRelModel.findOne({ user: user._id, board: boardId });
    const userIsAdminOnThisBoard = boardUserRel?.userRole === UserRoles.admin;
    return userIsAdminOnThisBoard;
}