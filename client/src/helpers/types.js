export var UserType;
(function (UserType) {
    UserType["user"] = "user";
    UserType["admin"] = "admin";
    UserType["member"] = "member";
    UserType["externalUser"] = "external user";
})(UserType || (UserType = {}));
export var FeatureRequestStatus;
(function (FeatureRequestStatus) {
    FeatureRequestStatus["unassigned"] = "unassigned";
    FeatureRequestStatus["assigned"] = "assigned";
    FeatureRequestStatus["done"] = "done";
})(FeatureRequestStatus || (FeatureRequestStatus = {}));
export var FeatureRequestModalMode;
(function (FeatureRequestModalMode) {
    FeatureRequestModalMode["update"] = "update";
    FeatureRequestModalMode["creation"] = "creation";
})(FeatureRequestModalMode || (FeatureRequestModalMode = {}));
export var MenuSelected;
(function (MenuSelected) {
    MenuSelected["yourIdeas"] = "your ideas";
    MenuSelected["ourIdeas"] = "our ideas";
    MenuSelected["roadmap"] = "roadmap";
})(MenuSelected || (MenuSelected = {}));
export var EmptyPageType;
(function (EmptyPageType) {
    EmptyPageType["roadmap"] = "roadmap";
    EmptyPageType["featureRequests"] = "feature requests";
})(EmptyPageType || (EmptyPageType = {}));
export var AuthPageType;
(function (AuthPageType) {
    AuthPageType["login"] = "login";
    AuthPageType["signUp"] = "signUp";
})(AuthPageType || (AuthPageType = {}));
