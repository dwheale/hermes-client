import React, { useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import sideMenuItems from './side-menu-items'
import SideMenuItem from './side-menu-item.component'
import Divider from '@material-ui/core/Divider'

import Drawer from '@material-ui/core/Drawer'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Fab from '@material-ui/core/Fab'
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx'


const SideMenu = () => {
  const [drawerWidth, setDrawerWidth] = useState(0)

  const useStyles = makeStyles(theme =>
      createStyles({
        sideMenu: {
          width: '100%',
          justifyContent: 'flex-start',
        },
        drawer: {
          width: drawerWidth,
          flexShrink: 0,
        },
        navList: {
          width: drawerWidth,
        },
        menuItem: {
          width: drawerWidth,
        },
        menuItemIcon: {
          color: theme.palette.primary.main,
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
        drawerHeader: {
          display: 'flex',
          alignItems: 'center',
          padding: theme.spacing(0, 1),
          justifyContent: 'flex-end',
        },
        fab: {
          position: 'absolute',
          bottom: theme.spacing(2),
          left: theme.spacing(2),
          zIndex: 500,
        },
        hide: {
          display: 'none',
        },
        menuEnd: {
          position: 'fixed',
          bottom: 150,
        },
      }),
  )
  const classes = useStyles()

  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true);
    setDrawerWidth(240)
  }

  const handleDrawerClose = () => {
    setOpen(false);
    setDrawerWidth(0)
  }

  return (
      <>
      <Fab
          color='primary'
          aria-label='menu'
          className={clsx(classes.fab, open && classes.hide)}
          onClick={handleDrawerOpen}
      >
        <MenuIcon />
      </Fab>
      <Drawer
          variant="persistent"
          className={classes.drawer}
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
      >
        <Divider />
        <div className='side-menu'>
          <List component="nav" className={classes.sideMenu} disablePadding>
            <Divider />
            {sideMenuItems.map((item, index) => (
                <SideMenuItem {...item} key={index} />
            ))}
            <Divider />
          </List>
        </div>
        <Fab
            color='primary'
            aria-label='close-menu'
            className={classes.fab}
            onClick={handleDrawerClose}
        >
          <ChevronLeftIcon />
        </Fab>
      </Drawer>
        </>
  )
}

export default SideMenu