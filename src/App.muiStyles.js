import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'row',
    width: '100vw',
  },
  mainContent: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: '1 0 auto',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  footer: {
    flexShrink: 0,
    marginLeft: 10,
  },
}))

