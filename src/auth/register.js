import { useState } from "react"
import { Button, ContentContainer, Text, TextInput, Box } from "../atoms"
import { Colors } from "../organisms"
import { createUser, emailValidator } from "../validators/auth-validator"

export default function LogOut(props) {

   const [userData, setUserData] = useState([])

   const handleCreate = async () => {

      const { name, email, password } = userData

      if (!name) {
         alert("O campo 'Nome' é obrigatório")
         return false
      }
      if (!email) {
         alert("O campo 'E-mail' é obrigatório")
         return false
      }
      if (!emailValidator(email)) {
         alert("O e-mail digitado está incorreto")
         return false
      }
      if (!password || password?.length < 6) {
         alert("Senha incorreta. Deve conter no minimo 6 digitos")
         return false
      }

      else {
         const create = await createUser(userData)
         if (create) {
            console.log(create)
         }
      }
   }

   const handleChange = (value) => {
      setUserData((prevValues) => ({
         ...prevValues,
         [value.target.name]: value.target.value,
      }))
   }

   return (
      <Box style={{ backgroundColor: '#fff', boxShadow: `rgba(149, 157, 165, 0.17) 0px 6px 24px`, borderRadius: `12px`, width: '65%', display: 'flex', marginLeft: '17%', marginTop: '3%' }}>
         <Box style={{ display: 'flex' }}>
            <Box style={{ width: '55%', padding: 5 }}>
               <img src="https://yt3.googleusercontent.com/ytc/AL5GRJUDe5MCaHyva5Y25mRkGGbRyCF54T8aIrGtvc7w=s900-c-k-c0x00ffffff-no-rj" style={{ width: '100%', }} />
            </Box>
            <Box style={styles.form}>
               <Text style={styles.text}>Cadastrar</Text>
               <Text style={{ color: 'lightGray', fontWeight: 'bold', fontSize: 14, marginBottom: 30 }}>Faça seu cadastro.</Text>
               <TextInput placeholder='Joao Silva' name='name' text='nome' onChange={handleChange} style={styles.contentForm} />
               <TextInput placeholder='joao@gmail.com' name='email' text='email' onChange={handleChange} style={styles.contentForm} />
               <TextInput placeholder='*******' text='senha' name='password' type='password' onChange={handleChange} style={styles.contentForm} />
               <Box style={{ width: 200, marginTop: 10 }}>
                  <Button text='Cadastrar' onClick={handleCreate} />
               </Box>
            </Box>
         </Box>
      </Box>
   )
}

const styles = {
   form: {
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
      padding: `25px`,
      backgroundColor: Colors.darkBlue,
      borderRadius: `0px 12px 12px 0px`,
      // justifyContent: 'center',
      alignItems: 'center'
   },
   text: {
      color: '#fff',
      marginTop: 40,
      marginBottom: 15,
      fontWeight: 'bold'
   },
   contentForm: {
      width: '75%',
      margin: 5,
      backgroundColor: Colors.background,
      borderRadius: 5
   }
}