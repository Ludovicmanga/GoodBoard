import { Card, CardContent, Divider } from '@mui/material'
import React from 'react'
import styles from './RoadMapFeature.module.scss';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

type Props = {}

const RoadMapFeature = (props: Props) => {
  return (
    <Card className={styles.container}>
        <CardContent>
            <div className={styles.topContent}>
                <FiberManualRecordIcon className={styles.dotIcon} sx={{
                    fontSize: 10,
                    color: 'green',
                }} />
                <div>Nos suggestions</div>
            </div>
            <div className={styles.title}>Hey le sangre</div>
            <div className={styles.detailsContainer}>Yoo ça dit kwa</div>
            <Divider className={styles.divider} />
            <div className={styles.bottomContent}>
                <ArrowDropUpIcon className={styles.icon} sx={{
                    fontSize: 25,
                    color: 'blue',
                }} />
                <div>45</div>
            </div>
        </CardContent>
    </Card>
  )
}

export default RoadMapFeature