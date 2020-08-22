import React from 'react'
import { connect } from 'react-redux'
import MaterialTable from 'material-table'

import { tableIcons } from '../../utils/tables.utils'
import { createStructuredSelector } from 'reselect'
import { selectCustomers } from '../../redux/wait-list/wait-list.selector'
import {
  addCustomerToWaitStart,
  removeCustomerFromWaitStart,
  sendWaitListMessageStart,
  updateCustomerInWaitStart
} from '../../redux/wait-list/wait-list.actions'
import { closeSnackbar, enqueueSnackbar } from '../../redux/notification-snacks/notifications.actions'
import Button from '@material-ui/core/Button'
import { currentDate } from '../../utils/date-time.utils'
import { selectCurrentUser } from '../../redux/user/user.selector'

const WaitListTable = (props) => {
  const {
    customers,
    columns,
    addCustomer,
    removeCustomer,
    sendMessage,
    enqueueSnackbar,
    updateCustomer,
    title,
    currentUser
  } = props

  return (
      <MaterialTable
          icons={ tableIcons }
          title={ title }
          columns={ columns }
          data={ customers }
          editable={ {
            onRowAdd: (newCustomer) =>
                new Promise((resolve) => {
                  console.log('%cnewCustomer Row Data: ', 'color:red', newCustomer)
                  console.log('partyName:', newCustomer.partyName)
                  if(newCustomer.timeArrived) {
                    console.log('timeArrived:', newCustomer.timeArrived)
                  }

                  setTimeout(() => {
                    resolve()
                    addCustomer(newCustomer)
                  }, 600)
                }),
            onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve()
                    if (oldData && newData) {
                      updateCustomer(newData)
                    }
                  }, 600)
                }),
            onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve()
                    removeCustomer(oldData)
                  }, 600)
                }),
          } }
          options={ {
            selection: false,
            selectionProps: rowData => ({
              disabled: rowData.phone.localeCompare('none') === 0,
              color: 'secondary',
            }),
            actionsColumnIndex: -1,
            //TODO: setup so that the pageSize changes based on the size of the device
            pageSizeOptions: [],
            pageSize: 15,
            paging: true,
            exportAllData: true,
            exportButton: true,
            exportFileName: `${currentDate()} Wait List`,
          } }
          actions={ [
            rowData => ({
              icon: tableIcons.Message,
              onClick: async () => {
                enqueueSnackbar({
                  message: `Sending message to ${ rowData.partyName } at ${ rowData.phone }`,
                  options: {
                    key: Date.now() + Math.random(),
                    variant: 'info',
                    action: key => (
                        <Button onClick={ () => closeSnackbar(key) }>dismiss me</Button>
                    )
                  }
                })
                sendMessage({
                  to: rowData.phone,
                  message: `Your table at ${currentUser.restaurantName} is ready`,
                })
              },
              position: 'row',
              //disabled: (!rowData.phone || rowData.messaged)
              //TODO: Disable message icon after customer has been messaged
              disabled: !rowData.phone
            })
          ] }
      />
  )
}

const mapDispatchToProps = dispatch => ({
  addCustomer: (newCustomer) => {
    console.log(newCustomer)
    dispatch(addCustomerToWaitStart(newCustomer))
  },
  updateCustomer: (newCustomer) => {
    console.log(newCustomer)
    dispatch(updateCustomerInWaitStart(newCustomer))
  },
  removeCustomer: (customer) => dispatch(removeCustomerFromWaitStart(customer)),
  sendMessage: (data) => dispatch(sendWaitListMessageStart({ data })),
  enqueueSnackbar: (...args) => dispatch(enqueueSnackbar(...args)),
})

const mapStateToProps = createStructuredSelector({
  customers: selectCustomers,
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(WaitListTable)
