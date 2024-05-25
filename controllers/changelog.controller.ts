import { checkUserIsAdminOnThisBoard } from "../helpers/user";
import changeLogModel from "../models/changeLog.model";

export const updateVoteChangelog = async (req, res) => {
    try {
        const { changelogId, voteDirection, emojiVoted, boardId } = req.body;
        const userIsAdmin = await checkUserIsAdminOnThisBoard(req.user, boardId);
        if (userIsAdmin && (emojiVoted === "happy" || emojiVoted === "middle" || emojiVoted === "sad" )) {

            const objectParameterForDb = emojiVoted === 'happy' ? {
                happyEmojiVoters: req.user._id
            } : emojiVoted === 'middle' ? {
                middleEmojiVoters: req.user._id
            } : {
                sadEmojiVoters: req.user._id
            };

            let toAddToSet = {};
            let toPullToSet = {};

            if (voteDirection === "up") {
                toAddToSet = objectParameterForDb
            } else {
                toPullToSet = objectParameterForDb
            }

            const updatedChangeLog = await changeLogModel.findOneAndUpdate({
                _id: changelogId
            }, {
                $addToSet: toAddToSet,
                $pull: toPullToSet
            }, {
                new: true
            });
            if (updatedChangeLog) {
                res.json(updatedChangeLog);
            }
        }
    } catch(e) {
        console.log(e, ' is the error');
    }
}
