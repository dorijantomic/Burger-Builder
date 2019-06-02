import React from 'react'

import classes from './ToggleSidedrawerButton.module.css'
const toggleSideDrawerButton = (props) => 
   (
       <div onClick={props.click} className={classes.ToggleSidedrawerButton}>
          <div></div>
          <div></div>
          <div></div>
       </div>
  )


export default toggleSideDrawerButton