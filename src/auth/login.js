import { useEffect, useState } from "react"
import { Box, Button, ContentContainer, Text, TextInput } from "../atoms"
import { useAppContext } from "../context/AppContext"
import { Colors } from "../organisms"
import { emailValidator } from "../validators/auth-validator"

export default function Login() {

   const { login, alert } = useAppContext()
   const [userData, setUserData] = useState([])

   const [windowWidth, setWindowWidth] = useState(0)
   const smallWidthDevice = windowWidth < 1000

   const handleLogin = async () => {
      const { email, password } = userData

      if (!email || !emailValidator(email)) {return alert.error("O email está inválido!")}
         if (!password || password.length < 4) {return alert.error('A senha deve conter no mínimo 4 digitos.')}

      const data = await login({ email, password })

      if (!data) {
         return alert.error('Usuário não encontrado ou senha incorreta. Verifique os dados e tente novamente!')
      }
   }

   const handleChange = (value) => {
      setUserData((prevValues) => ({
         ...prevValues,
         [value.target.name]: value.target.value,
      }))
   }

   useEffect(() => {
      setWindowWidth(window.innerWidth)
      window.addEventListener('resize', () => setWindowWidth(window.innerWidth))
      document.title = `M&F admin`
      return () => window.removeEventListener('resize', () => { });
   }, [])

   return (
      <Box sx={{
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: Colors.background,
         position: 'absolute',
         top: 0,
         left: 0,
         width: '100%', height: '100%'
      }}>
         <Box sx={{
            display: 'flex',
            ...(smallWidthDevice ? { height: '90%', width: '90%' } : { height: '70%', width: '70%' })
         }}>
            <ContentContainer row fullWidth style={{ padding: 0, zIndex: 999 }} gap={0}>
               {smallWidthDevice ? <></> : <CompanyLogo size={25} />}
               <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  gap: 3,
                  backgroundColor: 'gray',
                  position: 'relative'
               }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', width: smallWidthDevice ? '80%' : '60%' }}>
                     {smallWidthDevice && <CompanyLogo size={50} />}
                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center', width: '100%' }}>
                        <Text title bold style={{ color: '#fff' }}>{`Bem-vindo(a)`}</Text>
                        <Text style={{ color: '#ffffff77' }}>Faça login para acessar o painel.</Text>
                     </Box>
                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                        <TextInput
                           placeholder='email@mfplanejados.com.br'
                           value={userData?.email || ''}
                           onChange={handleChange}
                           name='email'
                           margin='none'
                           fullWidth
                           InputProps={{
                              style: {
                                 fontSize: 14,
                                 backgroundColor: '#ffffff33',
                                 color: '#ffffffbb',
                                 outline: 'none'
                              }
                           }}
                        />
                        <TextInput
                           placeholder='******'
                           value={userData.password || ''}
                           onChange={handleChange}
                           name='password'
                           type="password"
                           margin='none'
                           fullWidth
                           InputProps={{
                              style: {
                                 fontSize: 14,
                                 backgroundColor: '#ffffff33',
                                 color: '#ffffffbb',
                                 outline: 'none',
                              }
                           }}
                        />
                     </Box>
                     <Button
                        style={{ width: '100%', padding: '12px 20px' }}
                        text='Entrar'
                        onClick={handleLogin}
                     />
                  </Box>
               </Box>
            </ContentContainer>
         </Box>
      </Box>
   )
}

const CompanyLogo = ({ size = 14 }) => (
   <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      flex: 1,
      gap: 1
   }}>
      <img src="/logo.png" alt="MF Planejados" style={{ height: `${size}%`, width: 'auto', objectFit: 'contain' }} />
   </Box>
);