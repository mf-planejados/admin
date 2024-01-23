import Head from 'next/head'
// import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Box, ContentContainer, Text } from '../atoms'
import { Colors } from '../organisms'
import { useAppContext } from '../context/AppContext'
import { useEffect, useState } from 'react'
import { api } from '../api/api'
import { getAllFiles } from '../validators/api-requests'
import { useRouter } from 'next/router'
// import styles from './styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

   const { user, setLoading } = useAppContext()
   const [lengthUser, setLengthUser] = useState(0)
   const [lengthFiles, setLengthFiles] = useState(0)
   const [lengthTestimonials, setLengthTestimonials] = useState(0)
   const [lengthBudgets, setLengthBudgets] = useState(0)
   const router = useRouter()

   const getTestimonial = async () => {
      setLoading(true)
      try {
         const response = await api.get('/testimonials');
         const { data } = response
         setLengthTestimonials(data?.length)
      } catch (error) {
         console.log(error)
      } finally {
         setLoading(false)
      }
   }

   const getUsers = async () => {
      setLoading(true)
      await api.get('/user/list')
         .then(response => {
            const { data } = response
            setLengthUser(data?.length)
         })
         .catch(error => {
            console.log(error)
         })
         .finally(() => setLoading(false));
   }

   const getFiles = async () => {
      try {
         setLoading(true)
         const response = await api.get('/filesweb')
         const { data = [] } = response;
         setLengthFiles(data?.length)
         setLoading(false)
      } catch (error) {
         console.log(error)
      }
   }

   const getBudgets = async () => {
      setLoading(true)
      try {
         const response = await api.get('/budget');
         const { data } = response
         setLengthBudgets(data?.length)
      } catch (error) {
         console.log(error)
      } finally {
         setLoading(false)
      }
   }

   const handleItems = async () => {
      try {
         setLoading(true)
         await getTestimonial()
         await getUsers()
         await getFiles()
         await getBudgets()
      } catch (error) {
         return error
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      handleItems()
   }, [])
   return (
      <>
         <Head>
            <title>MF Admin</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charset="UTF-8" />
            <link rel="icon" href="/logo.png" />
            {/* <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> */}
         </Head>

         <Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', marginTop: 5 }}>
               <Text title bold>Olá, </Text>
               <Text title bold style={{ color: Colors.red }}>{user?.name?.split(' ')[0]}!</Text>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, marginTop: 10 }}>
               <ContentContainer fullWidth style={{
                  "&:hover": {
                     opacity: 0.8,
                     transition: '.4s',
                     transform: 'scale(1.1, 1.1)'
                  },
               }}>
                  <Text bold title>{lengthBudgets}</Text>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'flex-start' }}>

                     <Text large>Orçamentos</Text>
                     <Box sx={{
                        ...styles.icon,
                        backgroundImage: `url('/icons/companies_icon.png')`,
                        mixBlendMode: 'multiply',
                        backgroundSize: 'contain',
                        width: 1,
                        top: 1,
                        left: 10,
                        height: 30,
                        "&:hover": {
                           cursor: 'pointer', opacity: 0.8
                        }
                     }} onClick={() => {
                        router.push('/budgets/list')
                     }} />
                  </Box>
               </ContentContainer>
               <ContentContainer fullWidth
                  style={{
                     "&:hover": {
                        opacity: 0.8,
                        transition: '.4s',
                        transform: 'scale(1.1, 1.1)'
                     }
                  }}>
                  <Text bold title>{lengthTestimonials}</Text>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'flex-start' }}>
                     <Text large>Depoimentos</Text>
                     <Box sx={{
                        ...styles.icon,
                        backgroundImage: `url('/icons/ratings_icon.png')`,
                        mixBlendMode: 'multiply',
                        backgroundSize: 'contain',
                        width: 1,
                        top: 1,
                        left: 10,
                        height: 30,
                        "&:hover": {
                           cursor: 'pointer', opacity: 0.8
                        }
                     }} onClick={() => {
                        router.push('/testimonial/list')
                     }} />
                  </Box>
               </ContentContainer>
               <ContentContainer fullWidth
                  style={{
                     "&:hover": {
                        opacity: 0.8,
                        transition: '.4s',
                        transform: 'scale(1.1, 1.1)'
                     }
                  }}>
                  <Text bold title>{lengthFiles}</Text>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'flex-start' }}>
                     <Text large>Arquivos</Text>

                     <Box sx={{
                        ...styles.icon,
                        backgroundImage: `url('/icons/files_icon.png')`,
                        mixBlendMode: 'multiply',
                        backgroundSize: 'contain',
                        width: 1,
                        top: 1,
                        left: 10,
                        height: 30,
                        "&:hover": {
                           cursor: 'pointer', opacity: 0.8
                        }
                     }} onClick={() => {
                        router.push('/files/list')
                     }} />
                  </Box>
               </ContentContainer>
               <ContentContainer fullWidth
                  style={{
                     "&:hover": {
                        opacity: 0.8,
                        transition: '.4s',
                        transform: 'scale(1.1, 1.1)'
                     },
                  }}>
                  <Text bold title>{lengthUser}</Text>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'flex-start' }}>
                  <Text large>Usuários</Text>
                     <Box sx={{
                        ...styles.icon,
                        backgroundImage: `url('/icons/users_icon.png')`,
                        mixBlendMode: 'multiply',
                        backgroundSize: 'contain',
                        width: 1,
                        top: 1,
                        left: 10,
                        height: 30,
                        "&:hover": {
                           cursor: 'pointer', opacity: 0.8
                        }
                     }} onClick={() => {
                        router.push('/users/list')
                     }} />
                  </Box>
               </ContentContainer>
            </Box>
         </Box>
      </>
   )
}

const styles = {
   icon: {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      width: '15px',
      height: '15px',
      marginRight: '0px',
   },
}
