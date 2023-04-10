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