import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createNewFeatureRequest, getAllFeatureRequests } from "../../../actions/featureRequest.actions";

type NewFeatureRequestModalProps = {
    handleCloseModal: (newFeatureRequestModalState: boolean) => void;
    title?: string;
    details?: string;
}

export const NewFeatureRequestModal: React.FC<NewFeatureRequestModalProps> = ({ handleCloseModal }) => {
    const dispatch: any = useDispatch();
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [status, setStatus] = useState('unassigned');
    const userData = useSelector((state: any) => state.userReducer);

    const handleCreateNewFeatureRequest = (e) => {
        e.preventDefault();
        const creatorType = userData.type;
        const creator = userData._id;

        dispatch(createNewFeatureRequest(title, details, creatorType, status, creator));
        dispatch(getAllFeatureRequests());
        handleCloseModal(false);
    }

    return (
        <div className='newFeatureRequestModal'>
            <div className='newFeatureRequestModal--wrapper'>
                <div className='closeModalIconContainer'>
                    <span onClick={() => handleCloseModal(false)} className='closeModalIcon'>&#10005;</span>
                </div>
                <form className='newFeatureRequestModal--form' onSubmit={(e) => handleCreateNewFeatureRequest(e)}>
                    { userData.type === "admin" && (
                         <>
                            <label>Status</label><br />
                            <div className='inputContainer'>
                                <select className='newFeatureRequestModal--statusInput' onChange={(e) => setStatus(e.target.value)}>
                                    <option value='unassigned'>Unassigned</option>
                                    <option value='planned'>Planned</option>
                                    <option value='in-progress'>In progress</option>
                                    <option value='done'>Done</option>
                                </select>
                            </div>
                        </>
                    )}
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
                    <label htmlFor='newFeatureRequestModal--detailsInput'>D??tails</label><br />
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