import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'

import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import SideMenuItemRef from './side-menu-item-ref.component'


const useStyles = makeStyles(() =>
    createStyles({
      menuItem: {
        '&.active': {
          background: 'rgba(0, 0, 0, 0.08)',
          '& .MuiListItemIcon-root': {
            color: '#fff',
          },
        },
      },
      menuItemIcon: {
        color: '#97c05c',
      },
    }),
)

const SideMenuItem = props => {
  const { name, link, Icon, items = [] } = props
  const classes = useStyles()
  const isExpandable = items && items.length > 0
  const [open, setOpen] = React.useState(false)

  function handleClick() {
    setOpen(!open)
  }

  const SideMenuItemRoot = (
      <SideMenuItemRef button className={classes.menuItem} link={link} onClick={handleClick}>
        {/*Display an icon if any*/}
        {!!Icon && (
            <ListItemIcon className={classes.menuItemIcon}>
              <Icon />
            </ListItemIcon>
        )}
        <ListItemText primary={name} inset={!Icon} />
        {/*Display the expand menu if the item has children*/}
        {isExpandable && !open && <IconExpandMore />}
        {isExpandable && open && <IconExpandLess />}
      </SideMenuItemRef>
  )

  const SideMenuItemChildren = isExpandable ? (
      <Collapse in={open} timeout='auto' unmountOnExit>
        <Divider />
        <List component='div' disablePadding>
          {items.map((item, index) => (
              <SideMenuItem {...item} key={index} />
          ))}
        </List>
      </Collapse>
  ) : null
  return (
      <>
        {SideMenuItemRoot}
        {SideMenuItemChildren}
      </>
  )
}


export default SideMenuItem