import { Alert, Snackbar } from "@mui/material";
import React, { useEffect } from "react";
import { setGeneralProperties } from "../../../redux/features/generalPropertiesSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import MainHero from "../../MainHero/MainHero";
import MainNavBar from "../../MainNavBar/MainNavBar";
import MenuChoiceNavBar from "../../MenuChoiceNavBar/MenuChoiceNavBar";

type Props = {};

const SiteMainHeader = (props: Props) => {
  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );

  const dispatch = useAppDispatch();

  return (
    <>
      <MainNavBar />
      <MainHero />
      <MenuChoiceNavBar />
{/*       <Snackbar
        open={generalPropertiesState.mainSnackBar.isOpen}
        autoHideDuration={4000}
        onClose={() => {
          dispatch(
            setGeneralProperties({
              mainSnackBar: {
                isOpen: false,
                message: '',
              },
            })
          )
        }}
      >
        <Alert
          onClose={() => {
            dispatch(
              setGeneralProperties({
                mainSnackBar: {
                  isOpen: false,
                  message: '',
                },
              })
            )
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          {generalPropertiesState.mainSnackBar.message}
        </Alert>
      </Snackbar> */}
    </>
  );
};

export default SiteMainHeader;
