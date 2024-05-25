import { updateChangelogVoteApiCall } from "../../helpers/changelog";
import { ChangeLog } from "../../helpers/types";
import { updateVoteOneChangeLogItem } from "../../redux/features/changeLogSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { EmojiVoteBtn } from "../EmojiVoteBtn/EmojiVoteBtn";
import styles from "./EmojiVotesContainer.module.scss";

export const EmojiVotesContainer = (props: { changelogData: ChangeLog }) => {
  const loggedUserState = useAppSelector((state) => state.loggedUser.user);
  const activeBoardState = useAppSelector((state) => state.activeBoard);

  const dispatch = useAppDispatch();

  const handleVote = async (
    voteDirection: "up" | "down",
    emoji: "happy" | "middle" | "sad"
  ) => {
    const response = await updateChangelogVoteApiCall(
      props.changelogData?._id,
      voteDirection,
      emoji,
      activeBoardState._id
    );
    if (response) {
      dispatch(
        updateVoteOneChangeLogItem({
          changeLogId: props.changelogData?._id,
          direction: voteDirection,
          emoji,
          userId: loggedUserState?._id,
        })
      );
    }
  };

  return (
    <>
      <EmojiVoteBtn
        icon={<div>🥰</div>}
        votesCount={props.changelogData?.happyEmojiVoters.length}
        isVoted={props.changelogData?.happyEmojiVoters.includes(
          loggedUserState?._id!
        )}
        onClick={(isVoted: boolean) =>
          handleVote(isVoted ? "down" : "up", "happy")
        }
      />
      <EmojiVoteBtn
        icon={<div>🤔</div>}
        votesCount={props.changelogData?.middleEmojiVoters.length}
        isVoted={props.changelogData?.middleEmojiVoters.includes(
          loggedUserState?._id!
        )}
        onClick={(isVoted: boolean) =>
          handleVote(isVoted ? "down" : "up", "middle")
        }
      />
      <EmojiVoteBtn
        icon={<div>😥</div>}
        votesCount={props.changelogData?.sadEmojiVoters.length}
        isVoted={props.changelogData?.sadEmojiVoters.includes(
          loggedUserState?._id!
        )}
        onClick={(isVoted: boolean) =>
          handleVote(isVoted ? "down" : "up", "sad")
        }
      />
    </>
  );
};
