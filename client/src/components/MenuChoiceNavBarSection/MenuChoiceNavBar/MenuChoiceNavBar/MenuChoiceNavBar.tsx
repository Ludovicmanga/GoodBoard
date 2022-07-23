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
                <a href="#" className='menuChoiceNavBar--item'>Vos suggestions</a>
                <a href="#" className='menuChoiceNavBar--item'>Nos idées</a>
                <a href="#" className='menuChoiceNavBar--item'>Roadmap</a>
            </nav>
        );
}