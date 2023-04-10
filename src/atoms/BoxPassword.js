import { Backdrop } from "@mui/material"
import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import { editPassword } from "../validators/api-requests"
import { Box, Text, ContentContainer, TextInput, Button } from "./index"

export const BoxData = (props) => {

   const {
      onClick = () => { }
   } = props;

   const { setDataBox, user, setLoading, alert } = useAppContext()
   const [userData, setUserData] = useState({})

   const handleChange = (value) => {
      setUserData((prevValues) => ({
         ...prevValues,
         [value.target.name]: value.target.value,
      }))
   }

   const checkRequiredFields = () => {
      const { password, newPassword, confirmPassword } = userData

      if (!newPassword) { return alert.error('Obrigatório nova senha') }
      if (password.length < 4) { return alert.error('A senha deve conter no mínimo 4 digitos.') }
      if (!password) { return alert.error('Obrigatório senha atual') }
      if (!confirmPassword) { return alert.error('Obrigatório confirmar a senha') }
      if (newPassword != confirmPassword) { return alert.error('As senhas não conferem') }
      return true
   }

   const handleChangePassword = async () => {
      if (checkRequiredFields()) {
         try {
            setLoading(true)
            const response = await editPassword(user._id, userData)
            if (response?.data?._id) {
               onClick(false)
               return alert.success('Senha atualizada com sucesso.')
            }
            alert.error('Sua senha atual está incorreta.')
         } catch (error) {
            alert.error('Tivemos um problema ao atualizar sua senha.');
         } finally {
            setLoading(false)
         }
      }
   }

   return (
      <>
         <Backdrop
            sx={{ color: '#fff', zIndex: 99999999 }}
            open={true}
         >
            <ContentContainer style={styles.box}>
               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center', width: '100%' }}>
                  <Text title bold>Alterar senha</Text>
                  <Text>Faça login para acessar o painel.</Text>
               </Box>
               <TextInput
                  placeholder='Senha Atual *'
                  onChange={handleChange}
                  name='password'
                  type="password"
                  margin='none'
                  fullWidth
                  InputProps={{
                     style: {
                        fontSize: 14,
                        backgroundColor: '#ffffff33',
                        outline: 'none'
                     }
                  }}
               />
               <TextInput
                  placeholder='Nova Senha *'
                  onChange={handleChange}
                  name='newPassword'
                  type="password"
                  margin='none'
                  fullWidth
                  InputProps={{
                     style: {
                        fontSize: 14,
                        backgroundColor: '#ffffff33',
                        outline: 'none',
                     }
                  }}
               />
               <TextInput
                  placeholder='Confirmar Senha *'
                  onChange={handleChange}
                  name='confirmPassword'
                  type="password"
                  margin='none'
                  fullWidth
                  InputProps={{
                     style: {
                        fontSize: 14,
                        backgroundColor: '#ffffff33',
                        outline: 'none',
                        marginBottom: 5
                     }
                  }}
               />
               <Box style={{ display: 'flex' }}>
                  <Button
                     style={{ width: '50%', marginRight: 1 }}
                     text='Alterar senha'
                     onClick={handleChangePassword}
                  />
                  <Button secondary
                     style={{ width: '50%', }}
                     text='Cancelar'
                     onClick={() => onClick(false)}
                  />
               </Box>
            </ContentContainer>
         </Backdrop>
      </>
   )

}

const styles = {
   overlay: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      opacity: 0.8,
      justifyContent: 'center',
      alignItems: 'center'
   },
   box: {
      backgroundColor: '#fff',
      opacity: 1,
      width: { xs: `300px`, xm: `400px`, md: `400px`, lg: `400px` },
      padding: 5
   }
}


