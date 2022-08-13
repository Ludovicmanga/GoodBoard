import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
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
                <NavLink className='menuChoiceNavBar--item' to="/">
                    <h5>Nos idées</h5>
                </NavLink>
                <NavLink className='menuChoiceNavBar--item' to="/company-feature-requests">
                    <h5>Vos idées</h5>
                </NavLink>
                <NavLink className='menuChoiceNavBar--item' to="/roadmap">
                    <h5>Roadmap</h5>
                </NavLink>
            </nav>
        );
}