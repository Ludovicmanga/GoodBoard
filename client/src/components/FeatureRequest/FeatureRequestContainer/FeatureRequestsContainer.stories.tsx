import React from "react";
import { FeatureRequestsContainer } from "./FeatureRequestsContainer";

export default {
    title: "UI/Feature requests container",
    component: FeatureRequestsContainer
}

export const Default = () => (
    <FeatureRequestsContainer requestAuthorType="user" />
)