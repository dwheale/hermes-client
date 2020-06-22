import React from 'react'
import MaterialTable from 'material-table'

import {tableIcons} from '../../utils/tables.utils'

const CustomerList = ({columns, data}) => {
  const [state, setState] = React.useState({
    columns: columns,
    data: data
  });
  return (
      <MaterialTable
          icons={tableIcons}
          title="Customer List"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
            onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      setState((prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                  }, 600);
                }),
            onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
          }}
          options={{
            selection: false,
            selectionProps: rowData => ({
              disabled: !rowData.phone,
              color: 'secondary',
            }),
            actionsColumnIndex: -1,
          }}
          detailPanel={ rowData => {
            return (
                <h1>Hello {rowData.firstName}</h1>
            )
          }}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
  )
}

export default CustomerList