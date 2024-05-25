import { User, UserType } from "../client/src/helpers/types";
import boardUserRelModel from "../models/boardUserRel.model";
import { welcomeMessageTemplateID } from "./constants";
import { UserRoles } from "./types";
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export const checkUserIsAdminOnThisBoard = async (user: User, boardId: number) => {
    const boardUserRel = await boardUserRelModel.findOne({ user: user._id, board: boardId });
    const userIsAdminOnThisBoard = boardUserRel?.userRole === UserRoles.admin;
    return userIsAdminOnThisBoard;
}

export const getUserRoleOnThisBoard = async (user: User, boardId: string ): Promise<UserType | undefined> => {
    const userBoardRel = await boardUserRelModel.findOne({
        user: user._id,
        board: boardId,
    });
    return userBoardRel?.userRole as UserType | undefined;
}

export const sendWelcomeMessage = async (email: string, givenName: string) => {
    const msg = {
        to: email,
        from: 'ludovic.mangaj@gmail.com',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        template_id: welcomeMessageTemplateID,
        dynamic_template_data: {
            name: givenName
        }
      }
      
      await sgMail.send(msg);
}