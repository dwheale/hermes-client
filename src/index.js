import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import defaultTheme from './default-theme'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { SnackbarProvider } from 'notistack'


const theme = defaultTheme

ReactDOM.render(
    <Provider store={ store }>
      <BrowserRouter>
        <PersistGate persistor={ persistor }>
          <ThemeProvider theme={ theme }>
            <SnackbarProvider>
              <App />
            </SnackbarProvider>
          </ThemeProvider>
        </PersistGate>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)