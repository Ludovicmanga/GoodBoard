import { Button, ButtonGroup, Chip, IconButton } from "@mui/material";
import { StyledPopover } from "../StyledPopover/StyledPopover";
import styles from "./FilterPopover.module.scss";
import { SexyCheckbox } from "../SexyCheckbox/SexyCheckbox";
import { SexyCheckBox2 } from "../SexyCheckBox2/SexyCheckBox2";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import { TbCircleOff } from "react-icons/tb";
import { FilterType } from "../../helpers/types";

const statusFiltersList: FilterType[] = [
  {
    id: 1,
    label: "Non assigné",
    type: "status",
  },
  {
    id: 2,
    label: "Assigné",
    type: "status",
  },
  {
    id: 3,
    label: "Fait",
    type: "status",
  },
];

const topicsFiltersList: FilterType[] = [
  {
    id: 4,
    label: "Rapidité",
    type: "topic",
  },
  {
    id: 5,
    label: "Design",
    type: "topic",
  },
  {
    id: 6,
    label: "UX",
    type: "topic",
  },
];

const allFiltersList = [...topicsFiltersList, ...statusFiltersList];

export const FilterPopover = (props: {
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}) => {
  const [filteredFiltersList, setFilteredFiltersList] = useState<FilterType[]>(
    []
  );

  const [activeFiltersList, setActiveFiltersList] = useState<FilterType[]>([]);

  const [searchedWord, setSearchedWord] = useState("");

  const [filtersViewMode, setFiltersViewMode] = useState<"status" | "topic">(
    "status"
  );

  useEffect(() => {
    setFilteredFiltersList(
      allFiltersList.filter(
        (el) =>
          el.type === filtersViewMode &&
          el.label.toLowerCase().includes(searchedWord.toLowerCase())
      )
    );
  }, [filtersViewMode, searchedWord]);

  useEffect(() => {
    setSearchedWord("");
  }, [filtersViewMode]);

  const handleDeleteFilter = (idToDelete: number) => {
    setActiveFiltersList((curr) => curr.filter((el) => el.id !== idToDelete));
  };

  const handleClearAllFilters = () => {
    setActiveFiltersList([]);
  };

  return (
    <StyledPopover anchorEl={props.anchorEl} setAnchorEl={props.setAnchorEl}>
      <div className={styles.activeFiltersSection}>
        <h3 className={styles.sectionTitle}>Filtres actifs</h3>
        {activeFiltersList.length > 0 ? (
          <>
            <IconButton
              className={styles.clearFiltersBtn}
              onClick={handleClearAllFilters}
            >
              <Close className={styles.clearFiltersBtnIcon} />
              Supprimer tous les filtres
            </IconButton>
            <div className={styles.chipsContainer}>
              {activeFiltersList.map((activeFilter) => (
                <Chip
                  key={activeFilter.id}
                  className={styles.chip}
                  onDelete={() => handleDeleteFilter(activeFilter.id)}
                  label={activeFilter.label}
                  sx={{
                    bgcolor:
                      activeFilter.type === "status" ? "#e3fafc" : "#f8f0fc",
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
        {filteredFiltersList.map((elt) => (
          <OneFilter
            key={elt.id}
            {...elt}
            setActiveFiltersList={setActiveFiltersList}
            handleDeleteFilter={handleDeleteFilter}
            activeFiltersList={activeFiltersList}
          />
        ))}
      </div>
    </StyledPopover>
  );
};

const OneFilter = (props: {
  id: number;
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
          id: props.id,
          label: props.label,
          type: props.type,
        },
      ]);
    } else {
      props.handleDeleteFilter(props.id);
    }
  };

  return (
    <div className={styles.oneFilterContainer}>
      <div>{props.label}</div>
      <SexyCheckBox2
        onClick={handleAddFilter}
        activeFiltersList={props.activeFiltersList}
        id={props.id}
      />
    </div>
  );
};
