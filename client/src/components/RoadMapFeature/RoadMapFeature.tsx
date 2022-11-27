import { Card, CardContent, Divider } from '@mui/material'
import React from 'react'
import styles from './RoadMapFeature.module.scss';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { FeatureRequest, UserType } from '../../helpers/types';

type Props = {
    featureRequest: FeatureRequest;
}

const RoadMapFeature = (props: Props) => {
  return (
    <Card className={styles.container}>
        <CardContent>
            <div className={styles.topContent}>
                <FiberManualRecordIcon className={styles.dotIcon} sx={{
                    fontSize: 10,
                    color: 'green',
                }} />
                <div>
                    { props.featureRequest.creatorType === UserType.admin ? 'Nos suggestions' : 'Vos suggestions'}
                </div>
            </div>
            <div className={styles.title}>{props.featureRequest.title}</div>
            <div className={styles.detailsContainer}>{props.featureRequest.details}</div>
            <Divider className={styles.divider} />
            <div className={styles.bottomContent}>
                <ArrowDropUpIcon className={styles.icon} sx={{
                    fontSize: 25,
                    color: 'blue',
                }} />
                <div>
                 {props.featureRequest.voters.length}
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default RoadMapFeature