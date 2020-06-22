export const currentDate = () => {
  let date = new Date(),
      month = (date.getMonth() + 1).toString().length < 2 ? '0' + (date.getMonth() + 1) : '' + (date.getMonth() + 1),
      day = date.getDate().toString().length < 2 ? '0' + date.getDate() : '' + date.getDate(),
      year = '' + date.getFullYear()
  return [year, month, day].join('-')
}

// Function to receive epoch time in ms and return it in as a string formatted HH:MM with or without meridiem (am/pm)
// It will provide am or pm by default unless false is passed for showMeridiem
export const formatTime12 = (millis, showMeridiem = true) => {
  let date = new Date(millis)
  let hour = date.getHours()
  let meridiem = hour >= 12 ? 'PM' : 'AM'
  hour = hour % 12
  hour = hour ? hour : 12 // 0 should be 12
  let minute = date.getMinutes().toString().length === 2 ? '' + date.getMinutes() : '0' + date.getMinutes()

  return [hour, minute].join(':') + (showMeridiem ? ' ' + meridiem : '')
}