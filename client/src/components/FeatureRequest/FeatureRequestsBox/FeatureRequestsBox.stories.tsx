import React from "react";
import { FeatureRequestsBox } from "./FeatureRequestsBox";

export default {
    title: "UI/Feature requests Box",
    component: FeatureRequestsBox
}

export const Default = () => (
    <FeatureRequestsBox featureRequestId={3} title='titre' details='' votes={2} />
)