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
                                Feature requests
                            </div>
                        </NavLink>
                    </li>
                    <li className='roadmapli'>
                        <NavLink to="/roadmap">
                            <div>
                                Roadmap
                            </div>
                        </NavLink>
                    </li>
                </ul>
                
            </div>
        );
}