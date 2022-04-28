import { useState } from "react";
import { UserOrCompanyRequestsToggleButton } from "./UserOrCompanyRequestsToggleButton";

export default  {
    title: 'UI/User or company requests toggle button',
    component: UserOrCompanyRequestsToggleButton
}

export const Default = () => {
    const [isToggled, setIsToggled] = useState(false);
    return <UserOrCompanyRequestsToggleButton isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
}