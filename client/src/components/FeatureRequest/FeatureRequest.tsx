import { Card, CardContent, ToggleButton } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import React, { useState } from 'react';
import styles from './FeatureRequest.module.scss';

type Props = {}

function FeatureRequest({}: Props) {
    const [selected, setSelected] = useState(true);
  return (
    <div className={styles.newFeatureRequestsBox}>
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <h3 className={styles.featureRequestTitle}>Change the damn color</h3>
            <div className={styles.featureRequestDescription}>i want the app to be red</div>
        </CardContent>
        </Card>
        <ToggleButton
            value="check"
            selected={selected}
            onChange={() => setSelected(!selected)}
        >
            <div className={styles.votesBox}>
            { selected ? 
                <div className={styles.iconContainer}>
                    <CheckRoundedIcon sx={{ fontSize: 15 }}/>
                </div> : (
                <div className={styles.iconContainer}>
                    <ArrowDropUpRoundedIcon />
                </div>
                ) }
            <div className={styles.voteCountContainer}>
                250
            </div>
            </div>
        </ToggleButton>
    </div>
  )
}

export default FeatureRequest