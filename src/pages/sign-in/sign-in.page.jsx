import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { emailSignInStart } from '../../redux/user/user.actions'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import CardHeader from '@material-ui/core/CardHeader'
import { createStructuredSelector } from 'reselect'
import { selectUserError } from '../../redux/user/user.selector'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
      container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 400,
        margin: `${ theme.spacing(0) } auto`
      },
      loginBtn: {
        background: theme.palette.success.main,
        color: '#fff',
        marginTop: theme.spacing(2),
        flexGrow: 1,
        '&:hover': {
          background: theme.palette.success.dark,
        },
        '&:focus': {
          background: theme.palette.success.dark,
        },
      },
      header: {
        textAlign: 'center',
        background: theme.palette.primary.main,
        color: '#fff',
      },
      card: {
        marginTop: theme.spacing(10),
      },
      returnLink: {
        textAlign: 'center'
      }
    }),
)

const SignIn = ({ emailSignInStart, errorMessage }) => {
  const classes = useStyles()
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [emailHelperText, setEmailHelperText] = useState('')
  const [passwordHelperText, setPasswordHelperText] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if(errorMessage) {
      switch(errorMessage.code) {
        case 'auth/invalid-email':
          setEmailHelperText('Invalid email address.')
          setEmailError(true)
          return
        default:
          setPasswordHelperText('Log in unsuccessful. Invalid username or password.')
          setEmailError(true)
          setPasswordError(true)
      }
    }

  }, [errorMessage])

  useEffect(() => {
    (email.trim() && password.trim()) ? setIsButtonDisabled(false) : setIsButtonDisabled(true)
  }, [email, password])

  const handleSubmit = () => {
    // clear all current errors
    setEmailError(false)
    setPasswordError(false)
    setEmailHelperText('')
    setPasswordHelperText('')
    emailSignInStart(email, password)
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || handleSubmit()
    }
  }

  return (
      <React.Fragment>
        <form className={ classes.container } noValidate autoComplete='off'>
          <Card className={ classes.card }>
            <CardHeader className={classes.header} title="Sign In to Project Hermes" />
            <CardContent>
              <div>
                <TextField
                    error={ emailError }
                    variant='outlined'
                    id='email'
                    label='email'
                    type='email'
                    fullWidth
                    margin='normal'
                    helperText={emailHelperText}
                    onChange={ (e) => setEmail(e.target.value) }
                    onKeyPress={ (e => handleKeyPress(e)) }
                />
                <TextField
                    error={ passwordError }
                    variant='outlined'
                    id="password"
                    type="password"
                    label="Password"
                    fullWidth
                    margin="normal"
                    helperText={passwordHelperText}
                    onChange={(e)=>setPassword(e.target.value)}
                    onKeyPress={(e)=>handleKeyPress(e)}
                />
                <Typography className={classes.returnLink}>
                  <Link href='/forgotpassword'>Forgot Password</Link>
                </Typography>
              </div>
            </CardContent>
            <CardActions>
              <Button
                  variant='contained'
                  size='large'
                  className={classes.loginBtn}
                  onClick={()=>handleSubmit()}
                  disabled={isButtonDisabled}
              >
                Login
              </Button>
            </CardActions>
          </Card>
        </form>
      </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  emailSignInStart: (email, password) => {
    dispatch(emailSignInStart({ email, password }))
  }
})

const mapStateToProps = createStructuredSelector({
  errorMessage: selectUserError
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
