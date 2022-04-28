import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

type MenuChoiceNavBarProps = {

}

export const MenuChoiceNavBar: React.FC<MenuChoiceNavBarProps> = ({}) => {
        return (
            <nav className='menuChoiceNavBar'>
                <div>
                    <ul className='menuChoiceNavbar--liWrapper'>
                        <li>
                            <i className="fa-solid fa-angle-right icon"></i>
                            Feature suggestion</li>
                        <li>
                            <i className="fa-solid fa-magnifying-glass icon"></i>
                            <input className='menuChoiceNavbar--searchInput' placeholder='Search' />
                        </li>
                    </ul>
                </div>
            </nav>
        );
}