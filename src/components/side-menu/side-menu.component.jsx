import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import sideMenuItems from './side-menu-items'
import SideMenuItem from './side-menu-item.component'
import Divider from '@material-ui/core/Divider'

import Drawer from '@material-ui/core/Drawer'

const drawerWidth = 240

const useStyles = makeStyles(theme =>
    createStyles({
      sideMenu: {
        width: '100%',
      },
      navList: {
        width: drawerWidth,
      },
      menuItem: {
        width: drawerWidth,
      },
      menuItemIcon: {
        color: '#97c05c',
      },
      drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        background: '#535454',
        color: '#fff',
      },
    }),
)

const SideMenu = () => {
  const classes = useStyles()

  return (
      <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
      >
        <div className='side-menu'>
          <List component="nav" className={classes.sideMenu} disablePadding>
            <Divider />
            {sideMenuItems.map((item, index) => (
                <SideMenuItem {...item} key={index} />
            ))}
            <Divider />
          </List>
        </div>
      </Drawer>
  )
}

export default SideMenu