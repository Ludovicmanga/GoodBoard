import { Badge, Card, CardContent, ToggleButton } from '@mui/material';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import React, { useState } from 'react';
import styles from './FeatureRequests.module.scss';
import NewFeatureRequestsButton from '../../components/buttons/NewFeatureRequestButton/NewFeatureRequestsButton';

type Props = {}

const FeatureRequests = (props: Props) => {
  const [selected, setSelected] = useState(true);
  return (
    <>
      <div className={styles.container}>
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
      </div>
      <NewFeatureRequestsButton />
    </>
  )
}

export default FeatureRequests