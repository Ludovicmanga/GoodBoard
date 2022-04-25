import React, { useState } from 'react'

type UserOrCompanyRequestsToggleButtonProps = {
    isToggled: boolean,
    onToggle: () => void;
}

export const UserOrCompanyRequestsToggleButton: React.FC<UserOrCompanyRequestsToggleButtonProps> = ({ isToggled, onToggle }) => {
        return (
            <label className='userCompanyRequestToggleButton'>
                <input type="checkbox" checked={isToggled} onChange={onToggle} />
                <span className='slider'></span>
            </label>
        );
}