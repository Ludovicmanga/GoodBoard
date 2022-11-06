import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Avatar, AvatarGroup, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import styles from './FeatureRequestModal.module.scss';
import ludoPhoto from '../../../photos/ludoImg.jpg';
import { useState } from 'react';
import { FeatureRequest, FeatureRequestModalMode } from '../../../helpers/types';
import { useEffect } from 'react';

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
    status: 'unassigned',
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
    <div>
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
            { props.modalMode === FeatureRequestModalMode.update && (
              <>
                <div className={styles.votersSection}>
                <div>
                  Voters:
                </div>
                <AvatarGroup total={featureRequestProperties.voters?.length}>
                  { featureRequestProperties.voters?.slice(0,4).map( voter =>
                      <Avatar key={voter} alt="Voters pic" src={ludoPhoto} />
                  ) }
                </AvatarGroup>
                </div>
                <div>
                  Status:
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
                    <MenuItem value='assigned'>Assigned</MenuItem>
                    <MenuItem value='unassigned'>Unassigned</MenuItem>
                    <MenuItem value='done'>Done</MenuItem>
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
            />
            <div className={styles.submitButtonContainer}>
              <Button variant="contained">Add request</Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}