import { Box, Card, Paper } from '@mui/material'
import React from 'react'
import RoadMapFeature from '../../components/RoadMapFeature/RoadMapFeature'
import SiteMainHeader from '../../components/Sections/SiteMainHeader/SiteMainHeader'
import { lightBlue } from '../../helpers/colors'
import { FeatureRequestStatus } from '../../helpers/types'
import { capitalizeFirstLetter } from '../../helpers/utils'
import { useAppSelector } from '../../redux/hooks'
import styles from './Roadmap.module.scss';

type Props = {}

function Roadmap({}: Props) {
  const allFeatureRequests = useAppSelector(state => state.allFeatureRequests);
  console.log(allFeatureRequests, ' is all the feature requests')

  return (
    <>
      <SiteMainHeader />
      <div className={styles.container}>
        <Box className={styles.box}>
          <>
            {
              (Object.keys(FeatureRequestStatus) as Array<keyof typeof FeatureRequestStatus>).map((status) => {
                const featureRequestsWithCorrespondingStatus = allFeatureRequests.filter(featureRequest => featureRequest.status === status);
                console.log(featureRequestsWithCorrespondingStatus, ' is the corresponsing for ', status);
                  return (
                    <Paper elevation={3} className={styles.paperContainer}>
                      <Card className={styles.title} sx={{
                        background: lightBlue
                      }}>
                        <div className={styles.statusTitle}>{capitalizeFirstLetter(status)}</div>
                        <div className={styles.featureNumberContainer}>2</div>
                      </Card>
                      <div className={styles.featureContainer}>
                        {featureRequestsWithCorrespondingStatus.length > 0 ?
                        featureRequestsWithCorrespondingStatus.map(featureRequestWithCorrespondingStatus => <RoadMapFeature featureRequest={featureRequestWithCorrespondingStatus} />
                        )
                        :
                        <div>No feature request with this status</div>}
                      </div>
                  </Paper>
                  )
              })
            }
          </>
        </Box>
      </div>
    </>
  )
}

export default Roadmap