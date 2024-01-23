import { useEffect, useState } from "react"
import Link from "next/link"
import { api } from '../../api/api'
import { SearchBar, SectionHeader, Table } from "../../organisms"
import { Colors } from "../../organisms"
import { Box, Button, ContentContainer, Text } from "../../atoms"
import { useAppContext } from "../../context/AppContext"
import { Forbidden } from "../../forbiddenPage/forbiddenPage"
import { useRouter } from "next/router"


export default function ListTestimonials(props) {

    const { setLoading, } = useAppContext()
    const router = useRouter()
    const [testimonial, setTestimonial] = useState([])

    useEffect(() => {
        getTestimonial()
    }, [])

    const getTestimonial = async () => {
        setLoading(true)
        try {
            const response = await api.get('/testimonials');
            const { data } = response
            console.log(response)
            setTestimonial(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const tableContent = {
        header: [
            { text: 'Nome' },
            { text: 'Depoimento' },
        ],
        fields: [
            'clientName',
            'message',
        ]
    }

    return (
        <>
            <SectionHeader
                title={`Depoimentos (${testimonial?.length})`}
                newButton
                newButtonAction={() => router.push('/testimonial/new')}
            />
            <ContentContainer>
                <Table data={testimonial} tableContent={tableContent} to={'/testimonial/'} />
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