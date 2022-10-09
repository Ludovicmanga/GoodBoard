import { Badge, Card, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import styles from './FeatureRequests.module.scss';

type Props = {}

const FeatureRequests = (props: Props) => {
  return (
    <div className={styles.container}>
        <div className={styles.newFeatureRequestsBox}>
          <Card variant="outlined" sx={{ minWidth: 275 }}>
              <Badge>Badge</Badge>
              Feature requests????
          </Card>
          <Card variant="outlined" sx={{ minWidth: 275 }}>
              Vote box
          </Card>
        </div>
        <div className={styles.newFeatureRequestButtonContainer}>
        <Fab color="primary" variant="extended">
          <AddIcon sx={{ mr: 1 }} />
          New feature request
          </Fab>
        </div>
    </div>
  )
}

export default FeatureRequests