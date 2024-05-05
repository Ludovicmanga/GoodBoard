import React, { useEffect, useState } from "react";
import MainNavBar from "../../components/MainNavBar/MainNavBar";
import MainHero from "../../components/MainHero/MainHero";

import styles from "./ChangeLog.module.scss";
import ChangeLogBox from "../../components/ChangeLogBox/ChangeLogBox";
import axios from "axios";
import { websiteUrl } from "../../helpers/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { capitalizeFirstLetter, getMonthForYear } from "../../helpers/utils";
import ChangeLogDetailsModal from "../../components/Modals/ChangeLogDetailsModal/ChangeLogDetailsModal";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import EmptyData from "../../components/EmptyData/EmptyData";
import { EmptyPageType } from "../../helpers/types";

type Props = {};

const ChangeLog = (props: Props) => {
  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );
  const dispatch = useAppDispatch();
  const [changeLogItemsMappedByDate, setChangeLogItemsMappedByDate] = useState<
    {
      year: number;
      month: number;
      objects: {
        title: string;
        details: string;
        createdAt: string;
      }[];
    }[]
  >([]);

  function groupObjectsByMonthAndYear(
    data: { title: string; details: string; createdAt: string }[]
  ) {
    const groups = data.reduce((acc, obj) => {
      const date = new Date(obj.createdAt);
      const year = date.getFullYear();
      const month = date.getMonth();

      const key = `${year}-${month}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);

      return acc;
    }, {} as Record<string, typeof data>);

    const result = Object.keys(groups).map((key) => {
      const [year, month] = key.split("-").map(Number);
      return { year, month, objects: groups[key] };
    });

    return result;
  }
  const getChangeLogList = async () => {
    const response = await axios({
      url: `${websiteUrl}/api/feature-request/get-changelog-list`,
      method: "post",
      withCredentials: true,
      data: { boardId: generalPropertiesState.activeBoard },
    });
    if (response.data) {
      const changeLogsItemsMapped = groupObjectsByMonthAndYear(response.data);
      setChangeLogItemsMappedByDate(changeLogsItemsMapped);
    }
  };

  useEffect(() => {
    getChangeLogList();
  }, []);

  return (
    <>
      <MainNavBar />
      <MainHero />
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.pageTitleContainer}>
            <h1 className={styles.pageTitle}>ChangeLog</h1>
            <p className={styles.pageSubtitle}>
              Retrouvez ici toutes les fonctionnalités précédemment développées.
              Par ordre chronologique.
            </p>
          </div>
        </div>
        {changeLogItemsMappedByDate.length > 0 ? (
          <div className={styles.changeLogBoxSectionContainer}>
            {changeLogItemsMappedByDate.map((item) => (
              <div key={`${item.month} - ${item.year}`}>
                {item.objects.map((changeLogItem) => (
                  <div
                    key={changeLogItem.createdAt}
                    className={styles.changeLogBoxContainer}
                  >
                    <div className={styles.changeLogBoxWithDateContainer}>
                      <div className={styles.creationDate}>
                        Créé le {item.month} - {item.year}
                      </div>
                      <ChangeLogBox
                        title={changeLogItem.title}
                        details={changeLogItem.details}
                        createdAt={changeLogItem.createdAt}
                      />
                    </div>
                  </div>
                ))}
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
      </div>
      <ChangeLogDetailsModal
        handleClose={() =>
          dispatch(
            setGeneralProperties({
              changeLogDetailsModalOpen: {
                isOpen: false,
                title: "",
                details: "",
                createdAt: "",
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
