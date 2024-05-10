export type FeatureRequest = {
  _id: string;
  title: string;
  details: string;
  voters: string[];
  creatorType: string;
  status: string;
  creator: string;
  createdAt: any;
  updatedAt: any;
  board: string;
  topics: TopicType[];
  votersPics: string[];
};

export type User = {
  _id: string;
  email: string;
  voted: string[];
  roleOnThisBoard: UserType | null;
  picture: string;
};

export type Board = {
  _id: string;
  name: string;
  description: string;
  picture: string;
  themeColor: string;
  websiteUrl: string;
  billingPlan: BillingPlan | null;
};

export enum UserType {
  user = "user",
  admin = "admin",
  member = "member",
  externalUser = "external user"
}
export enum FeatureRequestStatus {
  unassigned = "unassigned",
  assigned = "assigned",
  done = "fait",
}

export enum FeatureRequestModalMode {
  update = "update",
  creation = "creation",
}

export enum MenuSelected {
  yourIdeas = "vos idées",
  ourIdeas = "nos idées",
  roadmap = "roadmap",
}

export enum EmptyPageType {
  roadmap = "roadmap",
  featureRequests = "feature requests",
  featureRequestsSearch = "feature requests search",
  changeLog = "changelog",
}

export enum AuthPageType {
  login = "login",
  signUp = "signUp",
}

export enum BillingPlan {
  free = "free",
  basic = "basic",
  business = "business"
}

export type FilterType = {
  _id: number;
  label: string;
  type: "status" | "topic";
};

export type TopicType = {
  _id: number; 
  label: string
}