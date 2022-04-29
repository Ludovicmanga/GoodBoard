import React, { useState } from 'react'
import { MenuChoiceModal } from '../../MenuChoiceModal/MenuChoiceModal';

type MenuChoiceNavBarProps = {
}

export const MenuChoiceNavBar: React.FC<MenuChoiceNavBarProps> = ({}) => {
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
                                Feature requests
                            </li>
                        </a>
                        <li>
                            <i className="fa-solid fa-magnifying-glass icon"></i>
                            <input className='menuChoiceNavbar--searchInput' placeholder='Search' />
                        </li>
                    </ul>
                </div>
            </nav>
        );
}