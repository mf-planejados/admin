import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { api } from "../../api/api"
import { Button, ContentContainer, Text, TextInput, Box } from "../../atoms"
import { useAppContext } from "../../context/AppContext"
import { CustomDropzone, SectionHeader } from "../../organisms"

export default function EditTestemonial(props) {

    const { setLoading, alert } = useAppContext()

    const router = useRouter()
    const { id } = router.query;
    const newTestemonial = id === 'new';
    const [testimonialData, setTestimonialData] = useState({})

    const getTestimonialData = async () => {
        try {
            setLoading(true)
            const response = await api.get(`/testimonial/${id}`)
            console.log(response)
            const { data = {} } = response;
            setTestimonialData(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            if (!newTestemonial) await getTestimonialData();
            setLoading(false)
        })();
    }, [])

    const handleChange = (value) => {
        setTestimonialData((prevValues) => ({
            ...prevValues,
            [value.target.name]: value.target.value,
        }))
    }


    const handleDelete = async () => {
        try {
            setLoading(true)
            const response = await api.delete(`/testimonial/delete/${id}`)
            const { data = {} } = response;
            if (data?._id) {
                alert.success('Depoimento deletado com sucesso.');
                router.push('/testemonial/list');
            }
        } catch (error) {
            alert.error('Tivemos um problema ao excluir o Depoimento.');
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = async () => {
        try {
            setLoading(true)
            const response = await api.patch(`/testimonial/update/${id}`, { testimonialData })
            const { data = {} } = response;
            if (data?._id) {
                alert.success('Depoimento atualizado com sucesso.');
                await getTestimonialData()
            };
        } catch (error) {
            alert.error('Tivemos um problema ao atualizar o Depoimento.');
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    const handleCreate = async () => {
        try {
            setLoading(true)
            const response = await api.post(`/testimonial/create`, { testimonialData })

            const { data = {} } = response;
            if (data?._id) {
                alert.success('Depoimento criado com sucesso.');
                await getTestimonialData()
                router.push('/testimonial/list')

            };
        } catch (error) {
            alert.error('Tivemos um problema ao criar o Depoimento.');
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <SectionHeader
                title={testimonialData?.clientName}
                saveButton
                saveButtonAction={newTestemonial ? handleCreate : handleEdit}
                deleteButton={!newTestemonial}
                deleteButtonAction={handleDelete}
            />
            <ContentContainer>
                <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                        <Box sx={{ flexDirection: { xs: `column`, xm: 'row', md: 'row', lg: 'row' }, display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ width: '100%' }}>
                                <Text style={{ ...styles.input }}>Nome do Cliente: </Text>
                                <TextInput placeholder='ex: José Silva' name='clientName' onChange={handleChange} value={testimonialData?.clientName}
                                    InputProps={{
                                        style: {
                                            width: '100%'
                                        }
                                    }} />
                            </Box>
                        </Box>
                        <Text style={{ ...styles.input }}>Menssagem/Feedback: </Text>
                        <TextInput placeholder='Gostamos muito do atendimento...' name='message' onChange={handleChange} value={testimonialData?.message}
                            multiline
                            minRows={5}
                            maxRows={8} />

                    </Box>
                </Box>
            </ContentContainer>
            <Box sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%', padding: 2, gap: 2, display: { xs: 'flex', sm: 'none', md: 'none', lg: 'none' } }}>
                <Button text='Salvar' style={{ flex: 1 }} onClick={handleEdit} />
                <Button secondary text='Excluir' style={{ flex: 1 }} onClick={handleDelete} />
            </Box>
        </>
    )
}

const styles = {
    logoContainer: {
        backgroundImage: `url('/icons/img_icon.png')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: 170,
        height: 1,
    },
    input: {
        padding: '5px'
    }
}