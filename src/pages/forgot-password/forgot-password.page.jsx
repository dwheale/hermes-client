import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import { createStructuredSelector } from 'reselect'
import { selectUserError } from '../../redux/user/user.selector'
import { connect } from 'react-redux'
import { forgotPasswordStart } from '../../redux/user/user.actions'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
      container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 400,
        margin: `${ theme.spacing(0) } auto`
      },
      submitBtn: {
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

const ForgotPassword = ({ errorMessage, forgotPasswordStart }) => {
  const classes = useStyles()
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('')

  useEffect(() => {
    (email.trim()) ? setIsButtonDisabled(false) : setIsButtonDisabled(true)
  }, [email])

  useEffect(() => {
    if(errorMessage) {
      switch(errorMessage.code) {
        case 'auth/invalid-email':
          setEmailHelperText('Invalid email address.')
          setEmailError(true)
          return
        case 'FORGOT_PASSWORD_SUCCESS':
          return
        default:
          setEmailError(true)
      }
    }

  }, [errorMessage])

  const handleSubmit = () => {
    // clear all current errors
    setEmailError(false)
    setEmailHelperText('')
    forgotPasswordStart(email)
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
            <CardHeader className={classes.header} title="Reset Password | Project Hermes" />
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
              </div>
            </CardContent>
            <CardActions>
              {
                (errorMessage && errorMessage.code === 'FORGOT_PASSWORD_SUCCESS') ? (
                  <p>{errorMessage.message}</p>
                ) : (
                    <Button
                        variant='contained'
                        size='large'

                        className={classes.submitBtn}
                        onClick={()=>handleSubmit()}
                        disabled={isButtonDisabled}
                    >
                      Submit
                    </Button>
                )
              }

            </CardActions>
            <Typography className={classes.returnLink}>
              <Link href='/signin'>Return to Sign In</Link>
            </Typography>
          </Card>
        </form>
      </React.Fragment>
  )

}

const mapDispatchToProps = dispatch => ({
  forgotPasswordStart: (email) => {
    dispatch(forgotPasswordStart({ email }))
  }
})

const mapStateToProps = createStructuredSelector({
  errorMessage: selectUserError
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)