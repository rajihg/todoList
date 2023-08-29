import React, { useState } from 'react'
import { makeStyles, withStyles } from "@material-ui/core";
import Tabs from './Tabs';

const style = {
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '320px',
        height: '100%',
        backgroundColor: '#253053'
    }
}

const SideMenu = (props) => {
    const { classes } = props;

    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabClick = (index) => {
        setSelectedTab(index);
        props.onTabChange(index);
    }

    return (
        <div className={classes.sideMenu}>
            <Tabs
                selectedTab={selectedTab}
                onTabClick={handleTabClick}
            />
        </div>
    )
}

export default withStyles(style)(SideMenu);
