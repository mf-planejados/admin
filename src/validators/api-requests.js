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

export const deleteCompany = async (id) => {
   try {
      const response = await api.delete(`/company/${id}`)
      return response
   } catch (error) {
      return error
   }
}

export const editCompany = async ({ id, companyData }) => {
   try {
      const response = await api.patch(`/company/${id}`, { companyData })

      return response
   } catch (error) {
      return error
   }
}

export const uploadFile = async (data) => {

   const { formData, category = null } = data;

   try {
      const response = await api.post(`/upload/${category}`, formData)

      console.log('resposta', response)
      return response
   } catch (error) {
      return (error)
   }
}

export const deleteFile = async ({ fileId, companyId }) => {
   try {
      const response = await api.delete(`/upload/${fileId}`)
      return response
   } catch (error) {
      return error
   }
}

export const getFilesByCompany = async (companyId) => {
   try {
      const response = await api.get(`/files/${companyId}`)
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