import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewFeatureRequest } from "../../../actions/featureRequest.actions";

type NewFeatureRequestModalProps = {
    handleCloseModal: (newFeatureRequestModalState: boolean) => void
}

export const NewFeatureRequestModal: React.FC<NewFeatureRequestModalProps> = ({ handleCloseModal }) => {
    const dispatch: any = useDispatch();
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');

    const handleCreateNewFeatureRequest = (e) => {
        e.preventDefault();
        const status = "unassigned";
        const creatorType = "user";

        dispatch(createNewFeatureRequest(title, details, creatorType, status));
        handleCloseModal(false);
    }

    return (
        <div className='newFeatureRequestModal'>
            <div className='newFeatureRequestModal--wrapper'>
                <div className='closeModalIconContainer'>
                    <span onClick={() => handleCloseModal(false)} className='closeModalIcon'>&#10005;</span>
                </div>
                <form className='newFeatureRequestModal--form' onSubmit={(e) => handleCreateNewFeatureRequest(e)}>
                    <label htmlFor='newFeatureRequestModal--titleInput'>Titre</label><br />
                    <div className='inputContainer'>
                    <input
                        id="newFeatureRequestModal--titleInput"
                        placeholder='Ex: Changer la couleur de fond du site'
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    </div><br />
                    <label htmlFor='newFeatureRequestModal--detailsInput'>Détails</label><br />
                    <div className='inputContainer'>
                    <textarea
                        id="newFeatureRequestModal--detailsInput"
                        placeholder='Ex: Je voudrais que la page ait un fond anthracite'
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    />
                    </div><br />
                    <div className='newFeatureRequestModal--form--btnContainer'>
                        <input type="submit" value="Valider" />
                    </div>
                </form>
            </div>
        </div>
    )
            
}