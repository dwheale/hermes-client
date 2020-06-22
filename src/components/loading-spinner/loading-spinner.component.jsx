import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  progressContainer: {
    display: 'flex',
    width: '100%',
    height: 80,
    paddingTop: '30vh'
  },
  progress: {
    color: theme.palette.primary.main,
    size: 10,
    margin: 'auto',
  },
}))

const LoadingSpinner = () => {
  const classes = useStyles()
  return (
        <Box
            className={classes.progressContainer}
            maxWidth='sm'
        >
          <CircularProgress
              className={classes.progress}
              variant='indeterminate'
              size='5rem'
              thickness={2}
          />
        </Box>
  )
}

export default LoadingSpinner