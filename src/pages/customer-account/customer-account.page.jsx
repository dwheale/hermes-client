import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { signOutStart } from '../../redux/user/user.actions'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const CustomerAccountPage = () => {
  const user = useSelector(state => state.user.currentUser.email)
  const currentRestaurant = useSelector(state => state.user.currentUser.restaurantName)

  const dispatch = useDispatch()
  const handleSignOut = () => {
    dispatch(signOutStart())
  }

  const useStyles = makeStyles((theme) => ({
        signOutBtn: {
          background: theme.palette.primary.main,
          color: '#fff',
          marginTop: theme.spacing(2),
          flexGrow: 1,
          '&:hover': {
            background: theme.palette.primary.dark,
          },
          '&:focus': {
            background: theme.palette.primary.dark,
          },
        },
        card: {
          marginTop: theme.spacing(5),
        },
    header: {
      textAlign: 'center',
    },
      }),
  )
  const classes = useStyles()

  return (
      <Card className={ classes.card }>
        <CardHeader className={classes.header} title="Profile" />
        <CardContent>
          <div>
            You're currently signed in as { user }
            <br/>
            The current restaurant is { currentRestaurant }
            <br/>

            <Button
                variant='contained'
                size='large'
                className={ classes.signOutBtn }
                onClick={ handleSignOut }
                startIcon={<ExitToAppIcon />}
            >
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

  )
}

export default CustomerAccountPage