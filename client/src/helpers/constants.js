import { FeatureRequestStatus, UserType } from "./types";
export var emptyFeatureRequest = {
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
    topics: []
};
export var websiteUrl = process.env.NODE_ENV === "production"
    ? "https://goodboard-app.herokuapp.com"
    : "http://localhost:8080";
export var rolesList = [
    UserType.admin,
    UserType.member,
    UserType.externalUser,
];
