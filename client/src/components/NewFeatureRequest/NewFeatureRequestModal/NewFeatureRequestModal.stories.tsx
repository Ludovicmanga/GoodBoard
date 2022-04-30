import React, { useState } from "react";
import { NewFeatureRequestModal } from "./NewFeatureRequestModal";

  const handleCloseModal = (newFeatureRequestModalState) => {
    return false;
  }

export default  {
    title: 'UI/ New Feature Request Modal',
    component: NewFeatureRequestModal
}

export const Default = () => {
    return <NewFeatureRequestModal handleCloseModal={handleCloseModal} />
}