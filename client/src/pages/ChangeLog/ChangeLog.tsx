import React, { useEffect, useState } from "react";
import MainNavBar from "../../components/MainNavBar/MainNavBar";
import MainHero from "../../components/MainHero/MainHero";

import styles from "./ChangeLog.module.scss";
import ChangeLogBox from "../../components/ChangeLogBox/ChangeLogBox";
import axios from "axios";
import { websiteUrl } from "../../helpers/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ChangeLogDetailsModal from "../../components/Modals/ChangeLogDetailsModal/ChangeLogDetailsModal";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import EmptyData from "../../components/EmptyData/EmptyData";
import { ChangeLog as ChangeLogType, EmptyPageType } from "../../helpers/types";
import { Paper, useTheme } from "@mui/material";
import { setAllChangelogItems } from "../../redux/features/changeLogSlice";
import { FeaturesLoadingSkeleton } from "../../components/FeaturesLoadingSkeleton/FeaturesLoadingSkeleton";
import { ContainerWIthThemeLinearGradient } from "../../components/ContainerWIthThemeLinearGradient/ContainerWIthThemeLinearGradient";
import { SidebarNavBar } from "../../components/SidebarNavBar/SidebarNavBar";
import { ContentWithSidebar } from "../../components/ContentWithSidebar/ContentWithSidebar";

type Props = {};

const ChangeLog = (props: Props) => {
  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );
  const changeLogItemsState = useAppSelector((state) => state.changeLog);
  const dispatch = useAppDispatch();
  const getChangeLogList = async () => {
    const response = await axios({
      url: `${websiteUrl}/api/feature-request/get-changelog-list`,
      method: "post",
      withCredentials: true,
      data: { boardId: generalPropertiesState.activeBoard },
    });
    if (response.data) {
      dispatch(setAllChangelogItems(response.data));
      setIsLoading(false);
    }
  };
  const theme = useTheme();

  useEffect(() => {
    getChangeLogList();
  }, [generalPropertiesState.activeBoard]);

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <ContentWithSidebar>
        <div className={styles.container}>
          <Paper className={styles.changelogPageWrapper} elevation={5}>
            <div className={styles.topOfPage}>
              <div className={styles.changeLogPageLogo}>
                <h2>Changelog</h2>
                <p>Toutes nos dernières nouveautés</p>
              </div>
            </div>
            {isLoading ? (
              <div className={styles.skeletonLoaderContainer}>
                <FeaturesLoadingSkeleton />
              </div>
            ) : changeLogItemsState.length > 0 ? (
              <div className={styles.changeLogBoxSectionContainer}>
                {changeLogItemsState.map((changeLogItem) => (
                  <div
                    key={changeLogItem.createdAt}
                    className={styles.changeLogBoxContainer}
                  >
                    <ChangeLogBox
                      key={changeLogItem._id}
                      changelogData={changeLogItem}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyDataContainer}>
                <EmptyData
                  title="Rien dans le changelog pour l'instant !"
                  details="Change le statut de tes idées en 'fait' pour qu'elles s'ajoutent ici"
                  type={EmptyPageType.changeLog}
                />
              </div>
            )}
          </Paper>
        </div>
      </ContentWithSidebar>

      <ChangeLogDetailsModal
        handleClose={() =>
          dispatch(
            setGeneralProperties({
              changeLogDetailsModalOpen: {
                isOpen: false,
                changeLogId: null,
              },
            })
          )
        }
        modalIsOpen={generalPropertiesState.changeLogDetailsModalOpen.isOpen}
      />
    </>
  );
};

export default ChangeLog;
