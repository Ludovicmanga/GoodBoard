import { Button, Chip, IconButton } from "@mui/material";
import { StyledPopover } from "../StyledPopover/StyledPopover";
import styles from "./FilterPopover.module.scss";
import { SexyCheckBox2 } from "../SexyCheckBox2/SexyCheckBox2";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import { TbCircleOff } from "react-icons/tb";
import { FilterType } from "../../helpers/types";
import { getTopicsList } from "../../helpers/topics";
import { useAppSelector } from "../../redux/hooks";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

const statusFiltersList: FilterType[] = [
  {
    _id: 1,
    label: "Unassigned",
    type: "status",
  },
  {
    _id: 2,
    label: "Assigned",
    type: "status",
  },
  {
    _id: 3,
    label: "Done",
    type: "status",
  },
];

export const FilterPopover = (props: {
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  activeFiltersList: FilterType[];
  setActiveFiltersList: React.Dispatch<React.SetStateAction<FilterType[]>>;
}) => {
  const [filteredFiltersList, setFilteredFiltersList] = useState<FilterType[]>(
    []
  );

  const allFeatureRequestsState = useAppSelector(
    (state) => state.allFeatureRequests
  );

  const activeBoardState = useAppSelector((state) => state.activeBoard);

  const [topicsFiltersList, setTopicsFiltersList] = useState<FilterType[]>([]);

  const [allFiltersList, setAllFiltersList] = useState<FilterType[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [searchedWord, setSearchedWord] = useState("");

  const [filtersViewMode, setFiltersViewMode] = useState<"status" | "topic">(
    "status"
  );

  const handleGetTopicsList = async () => {
    const topicsListResponse = await getTopicsList(activeBoardState._id);
    if (topicsListResponse) {
      const topicsListWithRightType: FilterType[] = topicsListResponse.map(
        (top) => ({
          ...top,
          type: "topic",
        })
      );
      setTopicsFiltersList(topicsListWithRightType);
    }
  };

  useEffect(() => {
    setAllFiltersList([...topicsFiltersList, ...statusFiltersList]);
  }, [topicsFiltersList]);

  useEffect(() => {
    handleGetTopicsList();
    setIsLoading(false);
  }, [activeBoardState._id]);

  useEffect(() => {
    setFilteredFiltersList(
      allFiltersList.filter(
        (el) =>
          el.type === filtersViewMode &&
          el.label.toLowerCase().includes(searchedWord.toLowerCase())
      )
    );
  }, [allFiltersList, filtersViewMode, searchedWord]);

  useEffect(() => {
    setSearchedWord("");
  }, [filtersViewMode]);

  const handleDeleteFilter = (idToDelete: number) => {
    props.setActiveFiltersList((curr) =>
      curr.filter((el) => el._id !== idToDelete)
    );
  };

  const handleClearAllFilters = () => {
    props.setActiveFiltersList([]);
  };

  return (
    <StyledPopover anchorEl={props.anchorEl} setAnchorEl={props.setAnchorEl}>
      {isLoading ? (
        <LoadingSkeleton height="8rem" />
      ) : (
        <>
          <div className={styles.activeFiltersSection}>
            <h3 className={styles.sectionTitle}>Filtres actifs</h3>
            {props.activeFiltersList.length > 0 ? (
              <>
                <IconButton
                  className={styles.clearFiltersBtn}
                  onClick={handleClearAllFilters}
                >
                  <Close className={styles.clearFiltersBtnIcon} />
                  Supprimer tous les filtres
                </IconButton>
                <div className={styles.chipsContainer}>
                  {props.activeFiltersList.map((activeFilter) => (
                    <Chip
                      key={activeFilter._id}
                      className={styles.chip}
                      onDelete={() => handleDeleteFilter(activeFilter._id)}
                      label={activeFilter.label}
                      sx={{
                        bgcolor:
                          activeFilter.type === "status"
                            ? "#e3fafc"
                            : "#f8f0fc",
                      }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className={styles.noActiveFilters}>
                <TbCircleOff />
                <div className={styles.noActiveFiltersText}>
                  Pas de filtres actifs
                </div>
              </div>
            )}
          </div>
          <h3 className={styles.sectionTitle}>Choisir filtres</h3>
          <div className={styles.btnsContainer}>
            <Button
              className={styles.filterTypeBtn}
              variant={filtersViewMode === "status" ? "contained" : "text"}
              onClick={() => setFiltersViewMode("status")}
            >
              Statut
            </Button>
            <Button
              className={styles.filterTypeBtn}
              variant={filtersViewMode === "topic" ? "contained" : "text"}
              onClick={() => setFiltersViewMode("topic")}
            >
              Catégorie
            </Button>
          </div>
          <div>
            <div className={styles.searchBarContainer}>
              <SearchBar
                onSearch={(searchedWord) => setSearchedWord(searchedWord)}
                searchedWord={searchedWord}
                placeholder="Chercher un filtre..."
              />
            </div>
            {filteredFiltersList.length > 0 ? (
              filteredFiltersList.map((elt) => (
                <OneFilter
                  key={elt._id}
                  {...elt}
                  setActiveFiltersList={props.setActiveFiltersList}
                  handleDeleteFilter={handleDeleteFilter}
                  activeFiltersList={props.activeFiltersList}
                />
              ))
            ) : (
              <div>Rien pour cette recherche !</div>
            )}
          </div>
        </>
      )}
    </StyledPopover>
  );
};

const OneFilter = (props: {
  _id: number;
  label: string;
  type: "status" | "topic";
  setActiveFiltersList: React.Dispatch<React.SetStateAction<FilterType[]>>;
  activeFiltersList: FilterType[];
  handleDeleteFilter: (idToDelete: number) => void;
}) => {
  const handleAddFilter = (isChecked: boolean) => {
    if (isChecked) {
      props.setActiveFiltersList((curr) => [
        ...curr,
        {
          _id: props._id,
          label: props.label,
          type: props.type,
        },
      ]);
    } else {
      props.handleDeleteFilter(props._id);
    }
  };

  return (
    <div className={styles.oneFilterContainer}>
      <div>{props.label}</div>
      <SexyCheckBox2
        onClick={handleAddFilter}
        activeFiltersList={props.activeFiltersList}
        _id={props._id}
      />
    </div>
  );
};
