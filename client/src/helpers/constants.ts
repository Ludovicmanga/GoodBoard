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
  votersPics: [],
};

export const websiteUrl =
  process.env.NODE_ENV === "production"
    ? "https://goodboard-app-41de944b1f08.herokuapp.com"
    : "http://localhost:8080";

export const rolesList: UserType[] = [
  UserType.admin,
  UserType.member,
  UserType.externalUser,
];

export const topicsList = ["Website UX", "Website design", "Speed", "Features"];

export const emptyBox =
  "https://goodboard.s3.eu-central-1.amazonaws.com/box.png";
export const roadmapImg =
  "https://goodboard.s3.eu-central-1.amazonaws.com/maps.png";
export const upgradeImg =
  "https://goodboard.s3.eu-central-1.amazonaws.com/undraw_Stripe_payments_re_chlm.png";
export const logInImg =
  "https://goodboard.s3.eu-central-1.amazonaws.com/undraw_Join_re_w1lh.png";

export const crispWebsiteId = "4612f4ac-120a-4dcb-ae7a-6b4df1853289"