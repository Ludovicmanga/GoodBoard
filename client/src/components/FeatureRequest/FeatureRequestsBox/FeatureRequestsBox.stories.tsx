import React from "react";
import { FeatureRequestsBox } from "./FeatureRequestsBox";

export default {
    title: "UI/Feature requests Box",
    component: FeatureRequestsBox
}

export const Default = () => (
    <FeatureRequestsBox title='titre' details='' votes={2} />
)