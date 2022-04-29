import { FeatureRequestBox } from "./FeatureRequestBox";
import React from "react";

export default {
    title: "UI/Feature-request",
    component: FeatureRequestBox
}

export const Default = () => (
    <FeatureRequestBox requestAuthorType="user" />
)