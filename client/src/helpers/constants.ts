import { FeatureRequestStatus, UserType } from "./types";

export const emptyFeatureRequest = {
    _id: "",
    title: "",
    details: "",
    voters: [],
    creatorType: UserType.admin,
    status: FeatureRequestStatus.unassigned,
    creator: "",
    createdAt: "",
    updatedAt: "",
  }