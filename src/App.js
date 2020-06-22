import React, { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import SideMenu from './components/side-menu/side-menu.component'
import Container from '@material-ui/core/Container'
import Dashboard from './pages/dashboard/dashboard.component'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Footer from './components/footer/footer.component'
import CustomerListPage from './pages/customer-list.component.jsx/customer-list.page'
import WaitList from './pages/wait-list/wait-list.component'
import SignIn from './pages/sign-in/sign-in.page'
import { checkUserSession } from './redux/user/user.actions'
import Notifier from './components/Notifier/Notifier.component'
import PrivateRoute from './components/private-route/private-route.component'
import { useStyles } from './App.muiStyles'
import LoadingSpinner from './components/loading-spinner/loading-spinner.component'
import { store } from './redux/store'
import { db } from './utils/firebase.utils'
import { currentDate } from './utils/date-time.utils'
import { receiveWaitListData } from './redux/wait-list/wait-list.actions'
import ForgotPassword from './pages/forgot-password/forgot-password.page'

const App = () => {
  const classes = useStyles()
  const currentUser = useSelector(state => state.user.currentUser)
  const isUserLoading = useSelector(state => state.user.isLoading)

  // Check user session on app init only
  // TODO: Eventually move this to a preAppInit function possibly executed in index.js?
  // https://stackoverflow.com/questions/38563679/react-redux-dispatch-action-on-app-load-init
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch])

  useEffect(() => {
    const currentUser = store.getState().user.currentUser
    if(currentUser) {
      const collectionRef =
          db.collection(`restaurants/${ currentUser.currentRestaurant }/wait_lists/${ currentDate() }/currentWait`)

      const unsubscribe = collectionRef.onSnapshot(snap => {
        snap.docChanges().forEach(change => {
          dispatch(receiveWaitListData({
            type: change.type,
            customer: change.doc.data().customer
          }))
        })
      })
      return () => unsubscribe()
    }
  }, [currentUser, dispatch])

  return (
      <div className={ classes.root }>

        <CssBaseline/>
        <Notifier />
        {
          isUserLoading ? (
              <LoadingSpinner />
          ) : currentUser ? (
              <SideMenu />
          ) : null
        }
        <main className={ classes.mainContent }>
          <Container maxWidth='lg' className={ classes.container }>
            <Switch>
              <PrivateRoute exact path='/' render={ () => (<h1>Project Hermes</h1>) }/>
              <PrivateRoute path='/dashboard' component={ Dashboard }/>
              <PrivateRoute path='/wait' component={ WaitList }/>
              <PrivateRoute path='/customers' component={ CustomerListPage }/>
              {
                isUserLoading ? null : (
                    <>
                    <Route path='/signin' render={ () => currentUser ? <Redirect to='/wait'/> : <SignIn/> }/>
                    <Route path='/forgotpassword' component={ ForgotPassword } />
                    </>
                    )
              }

            </Switch>
          </Container>
          <Footer className={ classes.footer }/>
        </main>

      </div>
  )
}

export default App
