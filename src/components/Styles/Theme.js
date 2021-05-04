import { createMuiTheme } from '@material-ui/core'

const Theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif'
    ].join(','),
  },
  palette: {
    primary: {
      main: '#5F2EEA'
    }
  }
})

Theme.props = {
  MuiInput: {
    disableUnderline: true
  }
}

Theme.overrides = {
  MuiTypography: {
    h3: {
      fontWeight: 200
    },
    h4: {
      fontSize: 32,
      fontWeight: 700
    },
    h6: {
      fontSize: 16,
      fontWeight: 600
    },
    body1: {
      fontSize: 14,
      fontWeight: 600
    },
    body2: {
      fontSize: 16,
      fontWeight: 400
    }
  },
  MuiContainer: {
    root: {
      margin: 'auto',
      textAlign: 'center',
      width: '95%',
      minWidth: 400,
      minHeight: 600,
      borderRadius: 15,
    }
  },
  MuiButton: {
    root: {
      borderRadius: 30,
      textTransform: 'none',
      width: '100%',
      maxWidth: 320,
      minWidth: 100,
      height: 50,
      fontSize: 16,
      fontWeight: 600
    }
  },
  MuiSelect: {
    root: {
      width: 70,
      margin: 10,
      fontSize: 18,
      fontWeight: 600
    }
  },
  MuiAvatar: {
    root: {
      margin: 10,
      height: 35,
      width: 35
    }
  }
}

export default Theme