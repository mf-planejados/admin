import { api } from "../api/api"
import { useAppContext } from "../context/AppContext"

export const createUser = async (userData) => {
   try {
      const response = await api.post('/user', { userData })
      return response
   } catch (error) {
      return error
   }
}

export const deleteUser = async (id) => {
   try {
      const response = await api.delete(`/user/${id}`)
      return response
   } catch (error) {
      return error
   }
}

export const editeUser = async ({ id, userData }) => {
   try {
      const response = await api.patch(`/user/${id}`, { userData })
      return response
   } catch (error) {
      return error?.response
   }
}

export const createCompany = async (companyData) => {
   try {
      const response = await api.post('/company', { companyData })
      return response
   } catch (error) {
      return error
   }
}

export const deleteBudget = async (id) => {
   try {
      const response = await api.delete(`/budget/${id}`)
      console.log(response)
      return response
   } catch (error) {
      return error
   }
}

export const editBudget = async ({ id, budgetData }) => {
   try {
      const response = await api.patch(`/budget/${id}`, { budgetData })

      return response
   } catch (error) {
      return error
   }
}

export const uploadFile = async (data) => {

   const { formData, category = null, categoryId = null } = data

   try {
      const response = await api.post(`/upload/${categoryId}/${category}`, formData)
      return response
   } catch (error) {
      return (error)
   }
}

export const deleteFile = async ({ fileId, categoryId }) => {
   try {
      const response = await api.delete(`/upload/${fileId}?categoryId=${categoryId}`)
      return response
   } catch (error) {
      return error
   }
}

export const getFilesByCategory = async (categoryId) => {
   try {
      const response = await api.get(`/files/${categoryId}`)
      return response
   } catch (error) {
      return error
   }
}

export const getAllFiles = async () => {
   try {
      const response = await api.get(`/files`)
      return response
   } catch (error) {
      return error
   }
}

export const editPassword = async (id, userData) => {
   try {
      const response = await api.patch(`/user/password/${id}`, { userData })
      return response
   } catch (error) {
      return error
   }
}