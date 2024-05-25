import { Skeleton } from "@mui/material";

export const FeaturesLoadingSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="rounded"
        height={150}
        sx={{
          marginBottom: "1rem",
        }}
      />
      <Skeleton
        variant="rounded"
        height={150}
        sx={{
          marginBottom: "1rem",
        }}
      />
      <Skeleton
        variant="rounded"
        height={150}
        sx={{
          marginBottom: "1rem",
        }}
      />
    </>
  );
};
