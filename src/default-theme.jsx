import { createMuiTheme } from '@material-ui/core'

export const DEFAULT_THEME = {
  palette: {
    primary: {
      main: '#356a9d'
    },
    info: {
      main: '#7f88b8'
    },
    success: {
      main: '#5ba36f'
    },
    warning: {
      main: '#d99337'
    },
    danger: {
      main: '#f44336'
    },
  },
  typography: {
    fontFamily: '"Fira Sans", sans-serif',
  },
}

const defaultTheme = createMuiTheme(DEFAULT_THEME)

export default defaultTheme