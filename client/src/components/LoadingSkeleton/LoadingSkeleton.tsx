import { Skeleton } from "@mui/material";
import React from "react";

const LoadingSkeleton = (props: { height: string }) => {
  return (
    <Skeleton variant="rectangular" animation="wave" height={props.height} />
  );
};

export default LoadingSkeleton;
