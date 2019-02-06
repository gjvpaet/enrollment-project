import React from 'react';
import { Menu, MainButton } from 'react-mfb';

const fab = props => (
    <Menu {...props}>
        <MainButton
            style={props.mainBtnStyle}
            iconActive={props.mainBtnIconActive}
            iconResting={props.mainBtnIconResting}
        />
        {props.children}
    </Menu>
);

export default fab;
