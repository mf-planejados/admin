import { api } from "../api/api"

// export const login = async (userData) => {
//    try {
//       const { email, password } = userData
//       const response = await api.post('/user/login', { email, password })
//       return response
//    } catch (error) {
//       console.log(error.data)
//    }
// }

export const createUser = async (userData) => {
   try {
      const response = await api.post('/user', { userData })
      alert('Usuario castrado')
      return response
   } catch (error) {
      alert('Ocorreu um erro ao cadastrar usuario')
      console.log(error)
   }
}

export const emailValidator = (email) => {
   const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&*'+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
   return EMAIL_REGEX.test(email)
}

export const formatDate = ({ date = null, birthday = false, showTime = false, showSeconds = true }) => {
   if (date) {
      let newTimestamp = new Date(date)

      if (!birthday) {
         let timezoneDifference = newTimestamp.getTimezoneOffset()
         newTimestamp.setTime(newTimestamp.getTime() - (timezoneDifference * 60 * 1000))
      }

      let splittedTimestamp = newTimestamp.toJSON().split('T')
      let formatDate = splittedTimestamp[0].split('-')
      let formatedTime = splittedTimestamp[1].split('.')
      formatDate = `${formatDate[2]}/${formatDate[1]}/${formatDate[0]}`
      formatedTime = formatedTime[0]

      if (!showSeconds) {
         let splittedTime = formatedTime.split(":")
         formatedTime = `${splittedTime[0]}:${splittedTime[1]}`
      }

      return showTime ? `${formatDate} às ${formatedTime}` : formatDate
   }
   return `-`
}