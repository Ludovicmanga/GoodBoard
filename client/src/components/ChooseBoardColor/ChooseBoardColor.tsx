import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import styles from "./ChooseBoardColor.module.scss";
import CheckIcon from "@mui/icons-material/Check";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import axios from "axios";
import { websiteUrl } from "../../helpers/constants";

type Props = {
  mode: "creation" | "update";
  setThemeColor?: (color: string) => void;
};

const ChooseBoardColor = (props: Props) => {
  const activeBoardId = useAppSelector(
    (state) => state.generalProperties.activeBoard
  );
  const dispatch = useAppDispatch();
  const handleChangeColorTheme = async (colorTheme: {
    name: string;
    hex: string;
  }) => {
    setSelected(colorTheme);
    if (props.mode === "creation" && props.setThemeColor) {
      props.setThemeColor(colorTheme.name);
    } else {
      const updateColorRes = await axios<string>({
        method: "post",
        data: {
          boardId: activeBoardId,
          themeColor: colorTheme.name,
        },
        url: `${websiteUrl}/api/board/update-color`,
      });
      if (updateColorRes) {
        dispatch(
          setGeneralProperties({
            mainSnackBar: {
              isOpen: true,
              message: "La couleur du board a été mise à jour",
            },
          })
        );
        dispatch(
          setGeneralProperties({
            darkMode: false,
          })
        );
        dispatch(
          setGeneralProperties({
            colorMode: updateColorRes.data,
          })
        );
      }
    }
  };
  const colors = [
    {
      name: "blue",
      hex: "#a5d8ff",
    },
    {
      name: "red",
      hex: "#ffc9c9",
    },
    {
      name: "green",
      hex: "#b2f2bb",
    },
    {
      name: "yellow",
      hex: "#ffec99",
    },
    {
      name: "purple",
      hex: "#d0bfff",
    },
    {
      name: "teal",
      hex: "#96f2d7",
    },
    {
      name: "orange",
      hex: "#ffd8a8",
    },
  ];
  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );
  const [selected, setSelected] = useState<{
    name: string;
    hex: string;
  } | null>(null);

  useEffect(() => {
    const foundActiveColor = colors.find(
      (color) => color.name === generalPropertiesState.colorMode
    );
    if (foundActiveColor) {
      setSelected(foundActiveColor);
    }
  }, [generalPropertiesState.colorMode]);

  return (
    <>
      <div className={styles.colorPaletteBoxContainer}>
        {colors.map((color) => (
          <div
            className={styles.avatarContainer}
            key={color.name}
            onClick={async () => await handleChangeColorTheme(color)}
          >
            <Avatar
              sx={{
                background: `${color.hex}`,
              }}
              className={styles.colorPaletteBox}
              variant="rounded"
            >
              {selected && selected.name === color.name && <CheckIcon />}
            </Avatar>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChooseBoardColor;
