import useStyles from '../Styles/Styles'
import Select from '@material-ui/core/Select'
import Pagination from '@material-ui/lab/Pagination'

const Footer = ({
  currentPage,
  onPageChange,
  pageSize,
  changePageSize,
  arraySize
}) => {

  const classes = useStyles()

  return (
    <div className={classes.todoFooter}>
      <Select
        native
        disabled={arraySize===0}
        color='secondary'
        value={pageSize}
        onChange={changePageSize}
        inputProps={{style: {width: '1.1rem' }}}
      >
        <option value={5} >5</option>
        <option value={10} >10</option>
        <option value={15} >15</option>
        <option value={20} >20</option>
      </Select>
      <Pagination 
        className={classes.pagination}
        page={currentPage}
        count={Math.ceil(arraySize/pageSize)}
        onChange={onPageChange}
      />
    </div>     
  )
}

export default Footer