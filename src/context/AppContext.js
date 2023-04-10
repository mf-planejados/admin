import { Backdrop, CircularProgress } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/api";
import { Alert } from "../organisms";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {

   const [user, setUser] = useState(null)
   const [loading, setLoading] = useState(false)
   const [dataBox, setDataBox] = useState(false)
   const [alertData, setAlertData] = useState({
      active: false,
      type: '',
      title: '',
      message: ''
   })

   const router = useRouter()
   const alert = new ShowAlert(setAlertData)

   useEffect(() => {
      async function loadUserFromCookies() {
         setLoading(true)

         const token = Cookies.get('token')

         try {
            if (token != 'null') {
               api.defaults.headers.Authorization = `Bearer ${token}`
               
               const response = await api.post('/user/loginbytoken')
               const { data: user } = response;
               
               if (user) setUser(user);
               else setUser(null);
            }
         } catch (error) {
            Cookies.set('token', null, { expires: 60 })
            console.log(error)
         } finally {
            setLoading(false)
         }
      }
      loadUserFromCookies()
   }, [])

   const login = async ({ email, password }) => {
      try {
         const response = await api.post('/user/login', { email, password })
         if (response.data.token) {
            const { token } = response.data;
            const { permissions = [] } = response.data;
            const userIsNotAdmin = !permissions.includes('Admin');

            Cookies.set('token', token, { expires: 60 })
            api.defaults.headers.Authorization = `Bearer ${token}`
            setUser(response.data)

            if (userIsNotAdmin) router.push('/files/list');

            return response
         }
         return response
      } catch (error) {
         // console.log(error?.response?.data)
         return false
      }
   }

   const logout = () => {
      Cookies.remove('token')
      setUser(null)
      delete api.defaults.headers.Authorization
   }

   return (
      <AppContext.Provider
         value={{
            isAuthenticated: !!user,
            user,
            permissions: user?.permissions,
            login,
            logout,
            loading,
            setLoading,
            setDataBox,
            dataBox,
            alert
         }}
      >
         {children}
         <Alert
            active={alertData.active}
            type={alertData.type}
            title={alertData.title}
            message={alertData.message}
            handleClose={() => setAlertData({
               active: false,
               type: '',
               title: '',
               message: ''
            })}
         />
         <Backdrop
            sx={{ color: '#fff', zIndex: 99999999 }}
            open={loading}
         >
            <CircularProgress color='inherit' />
         </Backdrop>
      </AppContext.Provider>
   )
}

class ShowAlert {
   constructor(setAlertData) {
      this.setAlertData = setAlertData
   }

   success(message = '') {
      this.setAlertData({
         active: true,
         type: 'success',
         title: 'Tudo certo',
         message
      })
   }

   error(message = '') {
      this.setAlertData({
         active: true,
         type: 'error',
         title: 'Houve um problema',
         message
      })
   }

   info(title = '', message = '') {
      this.setAlertData({
         active: true,
         type: 'info',
         title,
         message
      })
   }
}

export const useAppContext = () => useContext(AppContext)