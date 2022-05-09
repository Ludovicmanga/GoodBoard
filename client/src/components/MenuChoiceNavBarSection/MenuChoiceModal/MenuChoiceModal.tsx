import React from 'react'
import { NavLink } from 'react-router-dom';

type MenuChoiceModalProps = {

}

export const MenuChoiceModal: React.FC<MenuChoiceModalProps> = ({}) => {
        return (
            <div className='menuChoiceModal'>
                <ul>
                    <li>
                        <NavLink to="/">
                            <div>
                            <i className="fa-regular fa-face-smile menuChoiceModal--icon menuChoiceModal--icon" />
                                Feature requests
                            </div>
                        </NavLink>
                    </li>
                    <li className='roadmapli'>
                        <NavLink to="/roadmap">
                            <div>
                                <i className="fa-regular fa-map menuChoiceModal--icon menuChoiceModal--mapIcon"></i>
                                Roadmap
                            </div>
                        </NavLink>
                    </li>
                </ul>
                
            </div>
        );
}