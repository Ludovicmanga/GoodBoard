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
  topics: string[];
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
  unassigned = "non assigné",
  assigned = "assigné",
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
  changeLog = "changelog"
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