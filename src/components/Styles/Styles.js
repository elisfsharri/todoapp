import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => createStyles({
  landing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    textAlign: 'center'
  },
  academyLogo: {
    width: '25%',
    minWidth: 300
  },
  academyText: {
    width: '70%',
    minWidth: 300,
    padding: 10
  },
  app: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleBar: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35,
    width: '100%',
    marginBottom: 80
  },
  emptyBar: {
    width: '33%',
    [theme.breakpoints.down('sm')]: {
      width: 0
    }
  },
  logo: {
    width: '33%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  languageBar: {
    width: '33%',
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      width: '100%'
    }
  },
  language: {
    minWidth: 200,
    display: 'flex',
    justifyContent: 'center',
  },
  todoHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoTitle: {
    flexShrink: 0,
    paddingRight: 20,
    marginTop: 5,
    marginBottom: 5,
    [theme.breakpoints.up('md')]: {
      textAlign: 'left'
    }
  },
  addContainer: {
    [theme.breakpoints.up('md')]: {
      textAlign: 'right'
    }
  },
  addButton: {
    maxWidth: 200,
    marginTop: 5,
    marginBottom: 5
  },
  todoFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '5rem'
  },
  filter: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: 20
  },
  filterElement: {
    padding: '0 20px'
  },
  nav: {
    color: 'grey',
    cursor: 'pointer'
  },
  activeNav: {
    cursor: 'pointer'
  },
  disabledNav: {
    color: 'grey',
    cursor: 'context-menu'
  },
  emptyList: {
    minHeight: '20.2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  todoItem: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: 'solid rgba(0, 0, 0, 0.2) 0.1px',
    marginBottom: 1,
    backgroundColor: 'white',
    transition: 'ease'
  },
  selected: {
    backgroundColor: '#DED3FF',
    textDecoration: 'line-through grey'
  },
  todoText: {
    flexGrow: '5',
    textAlign: 'left',
    marginLeft: 10,
    color: 'rgba(82, 82, 82)'
  },
  todoIcons: {
    display: 'flex',
    justifyContent: 'right'
  },
  popup: {
    position: 'absolute',
    left: '20%',
    right: '20%',
    top: '10%',
    zIndex: '1',
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 25,
    outline: 'none',
    padding: 50,
    paddingLeft: '15%',
    paddingRight: '15%'
  },
  textInput: {
    display: 'flex',
    padding: '5px 20px',
    marginTop: 80
  },
  fullInput: {
    border: 'solid black',
    borderRadius: 15
  },
  input: {
    padding: 25,
    marginTop: '10%',
    marginBottom: '10%',
    height: 100,
    border: 'dashed grey',
    borderRadius: 15,
    fontWeight: 'normal',
    cursor: 'pointer'
  },
  imageUploaded: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: '10%',
    minHeight: 100,
    borderRadius: 15,
    fontWeight: 'normal'
  },
  uploadDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '40%',
    minWidth: 120,
    height: '100%',
    minHeight: 100,
    margin: 5,
    borderRadius: 15,
    alignItems: 'center'
  },
  uploadImage: {
    border: 'dashed grey'
  },
  uploadUpper: {
    height: '95%'
  },
  uploadLower: {
    height: '5%'
  },
  xButton: {
    cursor: 'pointer'
  },
  closeButton: {
    position: 'absolute',
    top: '0',
    right: 30
  },
  pagination: {
    '& .MuiPaginationItem-icon': {
      color: '#5F2EEA',
      border: '2px solid #5F2EEA',
      borderRadius: '100%',
      height: 30,
      width: 30
    },
    '& .Mui-selected': {
      fontWeight: 'bold'
    }
  }
}))

export default useStyles