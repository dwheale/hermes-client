const NAME_EXISTS = 'Party name already exists'

export const addCustomerToWaitList = (waitList, customerToAdd) => {
  const existingCustomer = waitList.find(customer => customer.partyName === customerToAdd.partyName)

  if (existingCustomer) { throw NAME_EXISTS }

  return [...waitList, existingCustomer]
}

/*
TODO: Set up system that assigns each waitList item an ID
Currently if there are two waitList items with the same partyName it will remove both
This will likely be fixed when
 */
export const removeCustomerFromWaitList = (waitList, customerToRemove) => {
  const existingCustomer = waitList.find(customer => customer.partyName === customerToRemove.partyName)

  // filter out the customer to remove and return the waitList
  if(existingCustomer) {
    return waitList.filter(customer => customer.partyName !== customerToRemove.partyName)
  }
}

export async function sendMessage(url = 'http://hermes.whealetech.com:5000/messenger/send', data) {
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (response.status === 201) {
    return await response.json()
  }
}
