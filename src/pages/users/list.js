import { useTheme } from "@mui/system"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { api } from '../../api/api'
import { Button, ContentContainer, Text } from "../../atoms"
import { useAppContext } from "../../context/AppContext"
import { Forbidden } from "../../forbiddenPage/forbiddenPage"
import { Table, Colors, SearchBar, SectionHeader, CheckBoxGroup } from "../../organisms"

export default function ListUsers(props) {

   const { setLoading, } = useAppContext()
   const router = useRouter()
   const [users, setUsers] = useState([])

   useEffect(() => { getUsers() }, [])

   const getUsers = async () => {
      setLoading(true)
      await api.get('/user/list')
         .then(response => {
            const { data } = response
            setUsers(data)
         })
         .catch(error => {
            console.log(error)
         })
         .finally(() => setLoading(false));
   }

   const tableContent = {
      header: [
         { text: 'Nome' },
         { text: 'email' },
      ],
      fields: [
         'name',
         'email',
      ]
   }

   return (
      <>
         <SectionHeader
            title={`Usuários (${users?.length})`}
            newButton
            newButtonAction={() => router.push('/users/new')}
         />
         <ContentContainer>
            <Table data={users} tableContent={tableContent} to={'/users/'} />
         </ContentContainer>
      </>
   )
}

const styles = {
   contentContainer: {
      display: "flex",
      textAlign: 'center',
      justifyContent: 'space-around',
      backgroundColor: Colors.lightBlue,
      padding: 8
   },
   bodyContainer: {
      width: '100%',
   },
   title: {
      width: '50%'
   },
}