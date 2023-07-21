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
  board: "",
  topics: [],
  votersPics: []
};

export const websiteUrl =
  process.env.NODE_ENV === "production"
    ? "https://goodboard-app.herokuapp.com"
    : "http://localhost:8080";

export const rolesList: UserType[] = [
  UserType.admin,
  UserType.member,
  UserType.externalUser,
];