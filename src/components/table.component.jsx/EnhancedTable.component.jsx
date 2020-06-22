import React from 'react'
import Paper from '@material-ui/core/Paper'
import TableToolbar from './table-toolbar.component'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import EnhancedTableHead from './enhanced-table-head.component'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import TablePagination from '@material-ui/core/TablePagination'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { makeStyles } from '@material-ui/core/styles'
import { getComparator, stableSort } from './table.utils'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}))

const EnhancedTable = ({ rows, headCells, title }) => {
  const classes = useStyles()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const handleChangeDense = (event) => {
    setDense(event.target.checked)
  }
  const isSelected = (name) => selected.indexOf(name) !== -1

  return (
      <div className={ classes.root }>
        <Paper className={ classes.paper }>
          <TableToolbar numSelected={ selected.length } title={title}/>
          <TableContainer>
            <Table
                className={ classes.table }
                aria-labelledby="tableTitle"
                size={ dense ? 'small' : 'medium' }
                aria-label="enhanced table"
            >
              <EnhancedTableHead
                  headCells={ headCells }
                  classes={ classes }
                  numSelected={ selected.length }
                  order={ order }
                  orderBy={ orderBy }
                  onSelectAllClick={ handleSelectAllClick }
                  onRequestSort={ handleRequestSort }
                  rowCount={ rows.length }
              />
              <TableBody>
                { stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.partyName)
                      const labelId = `enhanced-table-checkbox-${ index }`

                      return (
                          <TableRow
                              hover
                              onClick={ (event) => handleClick(event, row.partyName) }
                              role="checkbox"
                              aria-checked={ isItemSelected }
                              tabIndex={ -1 }
                              key={ row.partyName }
                              selected={ isItemSelected }
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                  checked={ isItemSelected }
                                  inputProps={ { 'aria-labelledby': labelId } }
                              />
                            </TableCell>
                            <TableCell align="right">{ row.reservationTime.toString() }</TableCell>
                            <TableCell component="th" id={ labelId } scope="row" padding="none">
                              { row.partyName }
                            </TableCell>

                            <TableCell align="right">{ row.assignedTable }</TableCell>
                            <TableCell align="right">{ `${ row.timeArrived.toString() }` }</TableCell>
                            <TableCell align="right">{ row.waitQuote }</TableCell>
                          </TableRow>
                      )
                    }) }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
              rowsPerPageOptions={ [5, 10, 25] }
              component="div"
              count={ rows.length }
              rowsPerPage={ rowsPerPage }
              page={ page }
              onChangePage={ handleChangePage }
              onChangeRowsPerPage={ handleChangeRowsPerPage }
          />
        </Paper>
        <FormControlLabel
            control={ <Switch checked={ dense } onChange={ handleChangeDense }/> }
            label="Dense padding"
        />
      </div>
  )
}

export default EnhancedTable