import { FC, ChangeEvent } from 'react'
import Select from '@material-ui/core/Select'
import Pagination from '@material-ui/lab/Pagination'

type FooterProps = {
  currentPage: number;
  onPageChange: (event: ChangeEvent<unknown>, value: number) => void;
  pageSize: number;
  changePageSize: (event: ChangeEvent<unknown>) => void;
  arraySize: number;
}
      
const Footer: FC<FooterProps> = ({
  currentPage,
  onPageChange,
  pageSize,
  changePageSize,
  arraySize
}) => {

  return (
    <div className='todoFooter'>
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
        color='secondary'
        page={currentPage}
        count={Math.ceil(arraySize/pageSize)}
        onChange={onPageChange}
      />
    </div>     
  )
}

export default Footer