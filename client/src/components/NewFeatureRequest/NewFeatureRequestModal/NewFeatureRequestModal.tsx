import React from "react";

type NewFeatureRequestModalProps = {
    handleCloseModal: (newFeatureRequestModalState: boolean) => void
}

export const NewFeatureRequestModal: React.FC<NewFeatureRequestModalProps> = ({ handleCloseModal }) => {
    
    return (
        <div className='newFeatureRequestModal'>
            <div className='newFeatureRequestModal--wrapper'>
                <div className='closeModalIconContainer'>
                    <span onClick={() => handleCloseModal(false)} className='closeModalIcon'>&#10005;</span>
                </div>
                <form className='newFeatureRequestModal--form'>
                    <label htmlFor='newFeatureRequestModal--titleInput'>Titre</label><br />
                    <div className='inputContainer'>
                    <input id="newFeatureRequestModal--titleInput" placeholder='Ex: Changer la couleur de fond du site' type="text" />
                    </div><br />
                    <label htmlFor='newFeatureRequestModal--detailsInput'>Détails</label><br />
                    <div className='inputContainer'>
                    <textarea id="newFeatureRequestModal--detailsInput" placeholder='Ex: Je voudrais que la page ait un fond anthracite'></textarea>
                    </div><br />
                    <div className='newFeatureRequestModal--form--btnContainer'>
                        <input type="submit" value="Valider" />
                    </div>
                </form>
            </div>
        </div>
    )
            
}