import React from "react";
import styles from "./ChangeLogBox.module.scss";
import { Card, useTheme } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";

type Props = {
  title: string;
  details: string;
  createdAt: string;
};

const ChangeLogBox = (props: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const getTransparentColor = (color: string, opacity: number) => {
    const rgbValues = color.match(/\w\w/g)?.map((hex) => parseInt(hex, 16));
    if (!rgbValues) return color;
    return `rgba(${rgbValues.join(",")},${opacity})`;
  };
  const transparentColor = getTransparentColor(
    theme.palette.primary.main,
    0.04
  );
  return (
    <Card
      className={styles.container}
      sx={{ background: transparentColor }}
      onClick={() =>
        dispatch(
          setGeneralProperties({
            changeLogDetailsModalOpen: {
              isOpen: true,
              title: props.title,
              details: props.details,
              createdAt: props.createdAt,
            },
          })
        )
      }
    >
      <div className={styles.title}>
        {props.title.slice(0, 30)}
        {props.title.length > 30 && "..."}
      </div>
      <p className={styles.description}>
        {props.details.slice(0, 30)}
        {props.details.length > 30 && "..."}
      </p>
    </Card>
  );
};

export default ChangeLogBox;
