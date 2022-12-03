import React from 'react';
import emptyBox from '../../icons/empty-box.svg';
import styles from './EmptyData.module.scss';

type Props = {}

const EmptyData = (props: Props) => {
  return (
    <div className={styles.container}>
        <div className={styles.imgContainer}>
            <img className={styles.img} src={emptyBox} alt='empty-box' />
        </div>
        <div className={styles.text}>
            No feature request from us yet
        </div>
    </div>
  )
}

export default EmptyData