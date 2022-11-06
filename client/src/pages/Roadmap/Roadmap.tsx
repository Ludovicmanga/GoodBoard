import { Box, Card, Paper } from '@mui/material'
import React from 'react'
import RoadMapFeature from '../../components/RoadMapFeature/RoadMapFeature'
import SiteMainHeader from '../../components/Sections/SiteMainHeader/SiteMainHeader'
import styles from './Roadmap.module.scss'

type Props = {}

function Roadmap({}: Props) {
  return (
    <>
      <SiteMainHeader />
      <div className={styles.container}>
        <Box className={styles.box}>
          <Paper elevation={3} className={styles.paperContainer}>
              <Card className={styles.title}>
                <div className={styles.statusTitle}>Prévu</div>
                <div className={styles.featureNumber}>2</div>
              </Card>
              <div className={styles.featureContainer}>
                <RoadMapFeature />
                <RoadMapFeature />
                <RoadMapFeature />
                <RoadMapFeature />
                <RoadMapFeature />
                <RoadMapFeature />
                <RoadMapFeature />
              </div>
          </Paper>
          <Paper elevation={3} className={styles.paperContainer} />
          <Paper elevation={3} className={styles.paperContainer} />
          <Paper elevation={3} className={styles.paperContainer} />
        </Box>
      </div>
    </>
  )
}

export default Roadmap