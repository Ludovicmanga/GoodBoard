import { Box, Card, Paper } from "@mui/material";
import React from "react";
import EmptyData from "../../components/EmptyData/EmptyData";
import RoadMapFeature from "../../components/RoadMapFeature/RoadMapFeature";
import SiteMainHeader from "../../components/Sections/SiteMainHeader/SiteMainHeader";
import { EmptyPageType, FeatureRequestStatus } from "../../helpers/types";
import { capitalizeFirstLetter } from "../../helpers/utils";
import { useAppSelector } from "../../redux/hooks";
import styles from "./Roadmap.module.scss";

type Props = {};

function Roadmap({}: Props) {
  const allFeatureRequests = useAppSelector(
    (state) => state.allFeatureRequests
  );
  console.log(allFeatureRequests, ' are all the fratrue requests');

  return (
    <>
      <SiteMainHeader />
      <div className={styles.container}>
        <Box className={styles.box}>
          <>
            {(
              Object.keys(FeatureRequestStatus) as Array<
                keyof typeof FeatureRequestStatus
              >
            ).map((status) => {
              const featureRequestsWithCorrespondingStatus =
                allFeatureRequests.filter(
                  (featureRequest) => featureRequest.status === status
                );
              return (
                <Paper elevation={3} className={styles.paperContainer}>
                  <Card className={styles.title}>
                    <div className={styles.statusTitle}>
                      {capitalizeFirstLetter(status)}
                    </div>
                    <div className={styles.featureNumberContainer}>
                      {featureRequestsWithCorrespondingStatus.length}
                    </div>
                  </Card>
                  <div className={styles.featureContainer}>
                    {featureRequestsWithCorrespondingStatus.length > 0 ? (
                      featureRequestsWithCorrespondingStatus.map(
                        (featureRequestWithCorrespondingStatus) => (
                          <RoadMapFeature
                            featureRequest={
                              featureRequestWithCorrespondingStatus
                            }
                          />
                        )
                      )
                    ) : (
                      <div className={styles.emptyDataContainer}>
                        <EmptyData
                          text="Nothing planned yet"
                          type={EmptyPageType.roadmap}
                        />
                      </div>
                    )}
                  </div>
                </Paper>
              );
            })}
          </>
        </Box>
      </div>
    </>
  );
}

export default Roadmap;
