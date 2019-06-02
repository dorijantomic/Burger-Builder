import React from 'react'

import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import ToggleSidedrawerButton from '../SideDrawer/ToggleSidedrawerButton/ToggleSidedrawerButton'
const toolbar = (props) =>
    (
        <header className={classes.Toolbar}>
            <ToggleSidedrawerButton click={props.toggleSideDrawer}/>
            <div className={classes.Logo}>
                <Logo />
            </div>

            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )


export default toolbar
