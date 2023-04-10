import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { api } from "../../api/api"
import { Box, Button, ContentContainer, TextInput } from "../../atoms"
import { createUser, deleteUser, editeUser } from "../../validators/api-requests"
import { DropList, CheckBoxGroup, SectionHeader } from "../../organisms"
import { useAppContext } from "../../context/AppContext"
import { Forbidden } from "../../forbiddenPage/forbiddenPage"
import { emailValidator } from "../../validators/auth-validator"

export default function EditUser(props) {

   const { setLoading, alert } = useAppContext()
   const router = useRouter()

   const { id } = router.query;
   const newUser = id === 'new';

   const [userData, setUserData] = useState({
   })

   useEffect(() => {
      (async () => {
         setLoading(true);
         if (!newUser) await getUserData();
         setLoading(false)
      })();
   }, [])

   const getUserData = async () => {
      try {
         const response = await api.get(`/user/${id}`)
         const { data } = response
         setUserData(data)
      } catch (error) {
         console.log(error)
      }
   }

   const handleChange = (value) => {
      setUserData((prevValues) => ({
         ...prevValues,
         [value.target.name]: value.target.value,
      }))
   }

   const checkRequiredFields = () => {
      if (!userData.name) { return alert.error('Usuário precisa de nome') }
      if (!userData?.email) { return alert.error('Usuário precisa de email') }
      if (!emailValidator(userData.email)) { return alert.error('O e-mail inserido parece estar incorreto.') }
      return true
   }

   const handleCreateUser = async () => {
      if (checkRequiredFields()) {
         try {
            setLoading(true)
            const response = await createUser(userData);
            if (response?.status === 201) {
               alert.success('Usuário cadastrado com sucesso.');
               router.push(`/users/${response?.data._id}`)
            }
         } catch (error) {
            alert.error('Tivemos um problema ao cadastrar usuário.');
            console.log(error)
         } finally {
            setLoading(false)
         }
      }
   }

   const handleDeleteUser = async () => {
      try {
         setLoading(true)
         const response = await deleteUser(id)
         if (response?.data?._id) {
            alert.success('Usuário excluído com sucesso.');
            router.push('/users/list')
         }
      } catch (error) {
         alert.error('Tivemos um problema ao excluir usuário.');
         console.log(error)
      } finally {
         setLoading(false)
      }
   }

   const handleEditUser = async () => {
      if (checkRequiredFields()) {
         try {
            setLoading(true)
            const response = await editeUser({ id, userData })
            if (response?.status === 200) {
               alert.success('Usuário atualizado com sucesso.');
               getUserData()
               return
            }
            alert.error('Tivemos um problema ao atualizar usuário.');
         } catch (error) {
            alert.error('Tivemos um problema ao atualizar usuário.');
            console.log(error)
         } finally {
            setLoading(false)
         }
      }
   }

   return (
      <>
         <SectionHeader
            title={userData?.name || `Novo Cliente`}
            saveButton
            saveButtonAction={newUser ? handleCreateUser : handleEditUser}
            deleteButton={!newUser}
            deleteButtonAction={handleDeleteUser}
         />
         <ContentContainer>
            <TextInput placeholder='Nome' name='name' onChange={handleChange} value={userData?.name} />
            <TextInput placeholder='E-mail' name='email' onChange={handleChange} value={userData?.email} />
         </ContentContainer>
         <Box sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%', padding: 2, gap: 2, display: { xs: 'flex', sm: 'none', md: 'none', lg: 'none' } }}>
            <Button text='Salvar' style={{ flex: 1 }} onClick={handleEditUser} />
            <Button secondary text='Excluir' style={{ flex: 1 }} onClick={handleEditUser} />
         </Box>
      </>
   )
}