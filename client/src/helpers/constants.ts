import { FeatureRequest, FeatureRequestStatus, UserType } from "./types";

export const emptyFeatureRequest: FeatureRequest = {
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