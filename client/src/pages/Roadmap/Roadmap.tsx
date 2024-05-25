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
import { ContainerWIthThemeLinearGradient } from "../../components/ContainerWIthThemeLinearGradient/ContainerWIthThemeLinearGradient";
import { SidebarNavBar } from "../../components/SidebarNavBar/SidebarNavBar";
import { ContentWithSidebar } from "../../components/ContentWithSidebar/ContentWithSidebar";

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
      <ContentWithSidebar>
        <div className={styles.container}>
          <Box className={styles.box}>
            <>
              {Object.values(FeatureRequestStatus).map((status) => {
                const featureRequestsWithCorrespondingStatus =
                  allFeatureRequests.filter(
                    (featureRequest) => featureRequest.status === status
                  );
                return (
                  <Paper
                    elevation={3}
                    className={styles.paperContainer}
                    key={status}
                  >
                    <Card
                      className={styles.title}
                      sx={{
                        backgroundColor:
                          status === FeatureRequestStatus.done
                            ? theme.palette.primary.dark
                            : "",
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
                              key={featureRequestWithCorrespondingStatus._id}
                              featureRequest={
                                featureRequestWithCorrespondingStatus
                              }
                            />
                          )
                        )
                      ) : (
                        <div className={styles.emptyDataContainer}>
                          <EmptyData
                            title="Rien de prévu ici"
                            details="Rien dans la roadmap pour ce statut"
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
      </ContentWithSidebar>
    </>
  );
}

export default Roadmap;
