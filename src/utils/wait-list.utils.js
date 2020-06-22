export const formatWaitListCustomer = (customer) => {
  // Check if there is a valid 10 digit phone number and format it to ###-###-####.
  // If there is no phone number, generate a key and format it nph-#######
  if (customer.phone) {
    customer.phone = formatPhoneNumberForWait(customer.phone)
  } else {
    // Generate the key using the last 7 digits of epoch time
    customer.phone = 'nph-' + Date.now() % 10000000
  }

  // add or update the lastUpdated field and check if there is a created field
  const timestamp = Date.now()
  if (customer.created) {
    customer.lastUpdated = timestamp
  } else {
    customer.created = timestamp
    customer.lastUpdated = timestamp
  }

  // if no user input is received for customer.arrived, set it to current time
  if(!customer.timeArrived) {
    customer.timeArrived = timestamp
  }
  //customer.timeArrived = customer.timeArrived ? customer.timeArrived : timestamp

  return customer
}

export const formatPhoneNumberForWait = (phoneNumberString) => {
  let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  if (cleaned.length !== 10) { // If the phone number has the incorrect number of digits
    return cleaned
  }
  let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return [match[2], match[3], match[4]].join('-')
  }
  return null
}

export const updateObject = (currentObject, updates) => {
  Object.keys(updates).forEach(key => {
    // delete the property if null or undefined
    if( undefined === updates[key] || null === updates[key]) {
      delete currentObject[key]
    }
    // If the property value is an object, recurse
    else if ('object' === typeof updates[key] && !Array.isArray(updates[key])) {
      // If the target property is not an object, overwrite with an empty object
      if(!('object' === typeof currentObject[key] && !Array.isArray(currentObject[key]))) {
        currentObject[key] = {}
      }
      //recurse
      updateObject(currentObject[key], updates[key])
    }
    // set current property to update property
    else {
      currentObject[key] = updates[key]
    }
  })
}