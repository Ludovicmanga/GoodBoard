import { Box, Card, Paper, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import EmptyData from "../../components/EmptyData/EmptyData";
import MainHero from "../../components/MainHero/MainHero";
import MainNavBar from "../../components/MainNavBar/MainNavBar";
import RoadMapFeature from "../../components/RoadMapFeature/RoadMapFeature";
import {
  EmptyPageType,
  FeatureRequestStatus,
  MenuSelected,
} from "../../helpers/types";
import { capitalizeFirstLetter } from "../../helpers/utils";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import styles from "./Roadmap.module.scss";

type Props = {};

function Roadmap({}: Props) {
  const allFeatureRequests = useAppSelector(
    (state) => state.allFeatureRequests
  );
  const dispatch = useAppDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(
      setGeneralProperties({
        menuSelected: MenuSelected.roadmap,
      })
    );
  }, []);

  return (
    <>
      <MainNavBar />
      <MainHero />
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
                  <Card
                    className={styles.title}
                    sx={{
                      backgroundColor:
                        status === "done" ? theme.palette.primary.dark : "",
                    }}
                  >
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
                          title="Nothing planned yet"
                          details="Nothing in the roadmap for this status"
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
