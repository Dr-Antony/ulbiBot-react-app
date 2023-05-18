import React from "react";
import Button from "../button/button";
import { useTelegram } from "../../hooks/useTelegram";

import './header.css' ;


const Header = (props) => {
    const {user,onClose} = useTelegram();
    return (
        <div className={'header'}>
            <Button onClick={onClose}>Close</Button>
            <span className={'username'}>
                {user?.username}
            </span>
        </div>
    );
};

export default Header;