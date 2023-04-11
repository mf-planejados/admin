import { useEffect, useState } from "react"
import Link from "next/link"
import { api } from '../../api/api'
import { SearchBar, SectionHeader, Table } from "../../organisms"
import { Colors } from "../../organisms"
import { Box, Button, ContentContainer, Text } from "../../atoms"
import { useAppContext } from "../../context/AppContext"
import { Forbidden } from "../../forbiddenPage/forbiddenPage"
import { useRouter } from "next/router"


export default function ListBudgets(props) {

    const { setLoading, } = useAppContext()
    const router = useRouter()
    const [budgets, setBudgets] = useState([])

    useEffect(() => {
        getBudgets()
    }, [])

    const getBudgets = async () => {
        setLoading(true)
        try {
            const response = await api.get('/budget');
            const { data } = response
            setBudgets(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const tableContent = {
        header: [
            { text: 'Nome' },
            { text: 'E-mail' },
            { text: 'Assunto' },
        ],
        fields: [
            'name',
            'email',
            'subject',
        ]
    }

    return (
        <>
            <SectionHeader
                title={`Orçamentos (${budgets?.length})`}
                newButton
                newButtonAction={() => router.push('/budgets/new')}
            />
            <ContentContainer>
                <Table data={budgets} tableContent={tableContent} to={'/budgets/'} />
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