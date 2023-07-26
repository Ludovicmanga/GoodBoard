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
              message: "The theme color of your board is updated",
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
      hex: "#1976d2",
    },
    {
      name: "red",
      hex: "#F43C2B",
    },
    {
      name: "green",
      hex: "#469C63",
    },
    {
      name: "yellow",
      hex: "#EDD91A",
    },
  ];
  const generalPropertiesState = useAppSelector(state => state.generalProperties);
  const [selected, setSelected] = useState<{ name: string; hex: string } | null>(null);

  useEffect(() => {
    const foundActiveColor = colors.find(color => color.name === generalPropertiesState.colorMode);
    if (foundActiveColor) {
        setSelected(foundActiveColor);
    }
  }, [generalPropertiesState.colorMode])

  return (
    <>
      <div className={styles.colorPaletteBoxContainer}>
        {colors.map((color) => (
          <div className={styles.avatarContainer} key={color.name} onClick={async () => await handleChangeColorTheme(color)}>
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
