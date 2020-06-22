import React from 'react'

import CustomerList from '../../components/customer-list/customer-list.component'

const CustomerListPage = () => {
  const [state] = React.useState({
    columns: [
      { title: 'First Name', field: 'firstName', type: 'string' },
      { title: 'Last Name', field: 'lastName', type: 'string' },
      { title: 'Phone Number', field: 'phone', type: 'string' },
    ],
    data: [
      { firstName: 'David', lastName: 'Wheale', phone: '7069400202' },
      { firstName: 'Rachel', lastName: 'Osborne', phone: '706-940-0202' },
    ],
  });


  return (
      <CustomerList columns={state.columns} data={state.data} />
  );
}

export default CustomerListPage