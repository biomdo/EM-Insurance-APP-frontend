import { useEffect, useState } from 'react'
import { axios } from '../axios'

export const useCurrentUser = (token) => {
  const [currentUser, setCurrentUser] = useState([])
  useEffect(() => {
    if (token !== null) {
      axios
        .post('user/jwt', {}, { headers: { 'x-access-token': token } })
        .then((res) => {
          if (res.data.auth) {
            setCurrentUser(res.data.userData.user[0])
          }
        })
        .catch((err) => {
          // console.log(err)
        })
    }
  }, [token])
  // console.log(currentUser)
  return currentUser
}

export function parseDays(value) {
  var year, months, week, days

  year = value >= 365 ? Math.floor(value / 365) : 0
  value = year ? value - year * 365 : value

  months = value >= 30 ? Math.floor((value % 365) / 30.5) : 0
  value = months ? value - months * 30 : value

  week = value >= 7 ? Math.floor((value % 365) / 7) : 0
  value = week ? value - week * 7 : value

  days = value < 7 ? Math.floor((value % 365) % 7) : 0

  let periodString = ''
  if (year > 1) {
    periodString = year + ' years '
  }
  if (year === 1) {
    periodString = year + ' year '
  }
  if (months > 1) {
    periodString += months + ' months '
  }
  if (months === 1) {
    periodString += months + ' month '
  }
  if (days > 1) {
    periodString += months + ' days'
  }
  if (days === 1) {
    periodString += days + ' day'
  }
  return periodString
}
