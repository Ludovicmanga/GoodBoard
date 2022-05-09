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
                <div>
                    <ul className='menuChoiceNavbar--liWrapper'>
                        <a href='#' onClick={(e) => handleToggle(e)}>
                            <li className='menuChoiceli'>
                                {isToggled ? (
                                    <>
                                        <i className="fa-solid fa-angle-down icon" />
                                        <MenuChoiceModal />
                                    </>
                                ) : (
                                    <i className="fa-solid fa-angle-right icon" />
                                ) }
                                { currentPage }
                            </li>
                        </a>
                        <li>
                            <i className="fa-solid fa-magnifying-glass icon menuChoiceNavbar--searchIcon"></i>
                            <input className='menuChoiceNavbar--searchInput' placeholder='Search' />
                        </li>
                    </ul>
                </div>
            </nav>
        );
}