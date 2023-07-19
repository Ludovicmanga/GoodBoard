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
};

export type User = {
  _id: string;
  email: string;
  voted: string[];
  type: UserType | null;
};

export type Board = {
  _id: string;
  name: string;
  description: string;
  picture: string;
  themeColor: string;
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
  done = "done",
}

export enum FeatureRequestModalMode {
  update = "update",
  creation = "creation",
}

export enum MenuSelected {
  yourIdeas = "your ideas",
  ourIdeas = "our ideas",
  roadmap = "roadmap",
}

export enum EmptyPageType {
  roadmap = "roadmap",
  featureRequests = "feature requests",
}

export enum AuthPageType {
  login = "login",
  signUp = "signUp",
}
