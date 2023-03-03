import React from 'react';
import { EmptyPageType } from '../../helpers/types';
import emptyBox from '../../icons/box.png';
import roadmapImg from '../../icons/maps.png';
import styles from './EmptyData.module.scss';

type Props = {
  text: string;
  type: EmptyPageType;
}

const EmptyData = (props: Props) => {
  return (
    <div className={styles.container}>
{/*         <div className={styles.imgContainer}>
            <img className={styles.img} src={props.type === EmptyPageType.featureRequests ? emptyBox : EmptyPageType.roadmap ? roadmapImg : ''} alt='empty-box' />
        </div>
        <div className={styles.text}>
            {props.text}
        </div> */}
    </div>
  )
}

export default EmptyData