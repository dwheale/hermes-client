import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'

const footerHeight = 40
const useStyles = makeStyles(() => createStyles({
  footer: {
    height: footerHeight,
    width: '100%',
  },
}))

const Footer = () => {
  const classes = useStyles()
  const currentYear = new Date().getFullYear()
  return (
      <Box className={ classes.footer }>
        <Typography>
          &copy; { currentYear } Whealetech, LLC | Project Hermes v0.0.3a | Use indicates acceptance of the
          <Link href='https://whealetech.com/preview-license'>
            Alpha / Beta Software License Agreement
          </Link>
        </Typography>
      </Box>
  )
}

export default Footer