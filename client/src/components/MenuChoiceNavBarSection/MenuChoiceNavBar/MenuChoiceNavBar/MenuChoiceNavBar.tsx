import React, { useState } from 'react'
import { MenuChoiceModal } from '../../MenuChoiceModal/MenuChoiceModal';

type MenuChoiceNavBarProps = {
    currentPage: string
}

export const MenuChoiceNavBar: React.FC<MenuChoiceNavBarProps> = ({ currentPage }) => {
        const [isToggled, setIsToggled] = useState(false)

        const handleToggle = (e) => {
            e.preventDefault();
            setIsToggled(() => !isToggled );
        }

        return (
            <nav className='menuChoiceNavBar'>
                <div className='menuChoiceNavBar--item'>Vos suggestions</div>
                <div className='menuChoiceNavBar--item'>Nos idées</div>
                <div className='menuChoiceNavBar--item'>Roadmap</div>
            </nav>
        );
}