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
