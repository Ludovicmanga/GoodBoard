import React, { useEffect } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import styles from "./SearchBar.module.scss";

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
  searchedWord: string | null;
  setSearchBtnIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchBar = (props: SearchBarProps) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    props.onSearch(searchTerm);
  };

  return (
    <div className={styles.container}>
      <TextField
        autoFocus
        placeholder="Chercher une idée..."
        fullWidth
        size="small"
        onChange={handleSearch}
        onBlur={() => {
          if (!props.searchedWord) {
            props.setSearchBtnIsClicked(false);
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton disabled>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;
