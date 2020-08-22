import React from 'react'
import WaitListTable from '../../components/wait-list-table/wait-list-table.component'
import { formatTime12 } from '../../utils/date-time.utils'

const WaitList = () => {
  const columns = [
    {
      title: 'Res Time', field: 'reservationTime', type: 'time', render: rowData => {
        if (rowData.reservationTime) {
          if(typeof rowData.reservationTime === 'object') {
            rowData.reservationTime = rowData.reservationTime.toMillis()
          }
          return formatTime12(rowData.reservationTime)
        } else {
          return '-'
        }
      }
    },
    { title: 'Name', field: 'partyName', type: 'string' },
    { title: '# Party', field: 'partyNum', type: 'numeric' },
    { title: 'Table', field: 'assignedTable', type: 'string' },
    {
      title: 'Arrived', field: 'timeArrived', type: 'time', render: rowData => {
        if (rowData.timeArrived) {
          if(typeof rowData.timeArrived === 'object') {
            rowData.timeArrived = rowData.timeArrived.toMillis()
          }
          return formatTime12(rowData.timeArrived)
        } else {
          return '-'
        }
      }
    },
    {
      title: 'Phone', field: 'phone', editable: 'onAdd', render: rowData => {
        // This displays 'none' if there is a key (starting with nph) instead of a phone number
        // while leaving the key in the state
        if (rowData.phone.substring(0, 3).localeCompare('nph') === 0) {
          return 'none'
        } else {
          return rowData.phone
        }
      }
    },
  ]
  return (
      <WaitListTable columns={ columns } title={ 'Wait List' }/>
  )
}


export default WaitList