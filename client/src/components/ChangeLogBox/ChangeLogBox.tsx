import React from 'react';
import styles from './ChangeLogBox.module.scss';
import { Card, useTheme } from '@mui/material';

type Props = {}

const ChangeLogBox = (props: Props) => {
    const theme = useTheme();

    // Function to generate a semi-transparent color
    const getTransparentColor = (color: string, opacity: number) => {
        const rgbValues = color.match(/\w\w/g)?.map((hex) => parseInt(hex, 16));
        if (!rgbValues) return color;
        
        return `rgba(${rgbValues.join(",")},${opacity})`;
    };

    // Example: You can pass the theme.palette.primary.main color and the opacity you want
    const transparentColor = getTransparentColor(theme.palette.primary.main, 0.04); // Opacity: 0.8 (80% transparent)

    return (
        <Card className={styles.container} sx={{ background: transparentColor }}>
            <div className={styles.title}>Feature title</div>
            <p className={styles.description}>Feature description</p>
        </Card>
    )
}

export default ChangeLogBox;
