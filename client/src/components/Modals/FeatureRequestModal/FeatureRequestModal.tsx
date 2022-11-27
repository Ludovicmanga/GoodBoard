import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Avatar, AvatarGroup, Divider, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import styles from './FeatureRequestModal.module.scss';
import ludoPhoto from '../../../photos/ludoImg.jpg';
import noVoter from '../../../photos/no_voter.png';
import { useState } from 'react';
import { FeatureRequest, FeatureRequestModalMode, FeatureRequestStatus } from '../../../helpers/types';
import { useEffect } from 'react';
import { capitalizeFirstLetter } from '../../../helpers/utils';

export default function FeatureRequestModal(props: {
  modalMode: FeatureRequestModalMode;
  modalIsOpen: boolean;
  handleCloseModal: () => void;
  featureRequestProperties?: FeatureRequest;
}) {
  const [featureRequestProperties, setFeatureRequestProperties] = useState<FeatureRequest>({
    _id: '',
    title: '',
    details: '',
    voters: [],
    creatorType: 'admin',
    status: FeatureRequestStatus.unassigned,
    creator: '',
    createdAt: '',
    updatedAt: '',
});

  useEffect(() => {
    if (props.featureRequestProperties && props.modalMode === FeatureRequestModalMode.update && props.modalIsOpen) {
      setFeatureRequestProperties(props.featureRequestProperties)
    }
  }, [props.modalIsOpen, props.featureRequestProperties, props.modalMode])

  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.modalIsOpen}
        onClose={props.handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.modalIsOpen}>
          <div className={styles.modalContentContainer}>
            <div className={styles.modalTitle}>
              { props.modalMode === FeatureRequestModalMode.creation ? 'Make' : 'Update' } a feature request
            </div>
            <Divider className={styles.divider} />
            { props.modalMode === FeatureRequestModalMode.update && (
              <>
                <div className={styles.votersSection}>
                <div className={styles.votersSectionTitle}>
                  Voters :
                </div>
                <AvatarGroup className={styles.avatarGroup} total={featureRequestProperties.voters?.length}>
                  { featureRequestProperties.voters.length > 1 ? featureRequestProperties.voters?.slice(0,4).map( voter =>
                      <Avatar key={voter} alt="Voters pic" src={ludoPhoto} />
                  ) : <div>Not voted yet</div>}
                </AvatarGroup>
                </div>
                <div className={styles.statusSection}>
                  <div className={styles.statusSectionTitle}>
                    Status :
                  </div>
                  <Select
                    labelId="status"
                    id="status"
                    value={featureRequestProperties.status}
                    label="Status"
                    onChange={(e: SelectChangeEvent<string>) => {
                      setFeatureRequestProperties( propertiesState => {
                        return { ...propertiesState, status: e.target.value }
                      } )
                    }}
                    >
                    {
                      (Object.keys(FeatureRequestStatus) as Array<keyof typeof FeatureRequestStatus>).map((status) =>
                        <MenuItem value={status}>{capitalizeFirstLetter(status)}</MenuItem>
                      )
                    }
                  </Select>
                </div>
              </>
            )}
            <TextField
              label="Titre"
              variant="filled"
              value={featureRequestProperties.title}
              onChange={(e) => {
                setFeatureRequestProperties( propertiesState => {
                  return { ...propertiesState, title: e.target.value }
                } )
              }}
              className={styles.textInput}
            />
            <TextField
              label="Description"
              variant="filled"
              value={featureRequestProperties.details}
              onChange={(e) => {
                setFeatureRequestProperties( propertiesState => {
                  return { ...propertiesState, details: e.target.value }
                } )
              }}
              className={styles.textInput}
            />
            <div className={styles.submitButtonContainer}>
              <Button variant="contained">Add request</Button>
            </div>
          </div>
        </Fade>
      </Modal>
  );
}