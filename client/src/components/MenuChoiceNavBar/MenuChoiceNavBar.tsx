import React from 'react'
import { MenuChoiceModal } from './MenuChoiceModal';

type MenuChoiceNavBarProps = {

}

export const MenuChoiceNavBar: React.FC<MenuChoiceNavBarProps> = ({}) => {
        return (
            <div>
                <div>
                    <MenuChoiceModal />
                </div>
                
                <div></div>
            </div>
        );
}