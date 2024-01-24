import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { api } from "../../api/api"
import { Button, ContentContainer, Text, TextInput, Box } from "../../atoms"
import { useAppContext } from "../../context/AppContext"
import { Forbidden } from "../../forbiddenPage/forbiddenPage"
import { CustomDropzone, SectionHeader } from "../../organisms"
import { createCompany, deleteBudget, editBudget } from "../../validators/api-requests"
import { formatDate } from "../../validators/auth-validator"

export default function EditBudgets(props) {

    const { setLoading, alert } = useAppContext()

    const router = useRouter()
    const { id } = router.query;


    const [budgetData, setBudgetData] = useState({})

    const getBudgetData = async () => {
        try {
            setLoading(true)
            const response = await api.get(`/budget/${id}`)
            const { data = {} } = response;
            setBudgetData(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getBudgetData()
    }, [])

    const handleChange = (value) => {
        setBudgetData((prevValues) => ({
            ...prevValues,
            [value.target.name]: value.target.value,
        }))
    }


    const handleDeleteBudget = async () => {
        try {
            setLoading(true)
            const response = await deleteBudget(id)
            const { data = {} } = response;
            if (data?._id) {
                alert.success('Orçamento deletada com sucesso.');
                router.push('/budgets/list');
            }
        } catch (error) {
            alert.error('Tivemos um problema ao excluir o orçamento.');
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleEditBudget = async () => {
        try {
            setLoading(true)
            const response = await editBudget({ id, budgetData })
            const { data = {} } = response;
            if (data?._id) {
                alert.success('Orçamento atualizado com sucesso.');
                getBudgetData()
            };
        } catch (error) {
            alert.error('Tivemos um problema ao atualizar o orçamento.');
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <SectionHeader
                title={budgetData?.name}
                saveButton
                saveButtonAction={handleEditBudget}
                deleteButton={true}
                deleteButtonAction={handleDeleteBudget}
            />
            <ContentContainer>
                <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                        <Box sx={{ flexDirection: { xs: `column`, xm: 'row', md: 'row', lg: 'row' }, display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ width: '100%' }}>
                                <Text bold style={{ ...styles.input }}>Nome: </Text>
                                <TextInput placeholder='Nome' name='name' onChange={handleChange} value={budgetData?.name}
                                    InputProps={{
                                        style: {
                                            width: '100%'
                                        }
                                    }} />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Text bold style={{ ...styles.input }}>E-mail: </Text>
                                <TextInput placeholder='E-mail' name='email' onChange={handleChange} value={budgetData?.email} />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Text bold style={{ ...styles.input }}>Telefone: </Text>
                                <TextInput placeholder='E-mail' name='email' onChange={handleChange} value={budgetData?.telephone} />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Text bold style={{ ...styles.input }}>Data do envio: </Text>
                                <TextInput placeholder='E-mail' name='email' onChange={handleChange} value={formatDate({ date: budgetData?.createdAt })} />
                            </Box>

                        </Box>
                        <Text bold style={{ ...styles.input }}>Assunto: </Text>
                        <TextInput placeholder='E-mail' name='email' onChange={handleChange} value={budgetData?.subject} />
                        <Text bold style={{ ...styles.input }}>Menssagem: </Text>
                        <TextInput placeholder='E-mail' name='email' onChange={handleChange} value={budgetData?.message}
                            multiline
                            minRows={5}
                            maxRows={8} />

                    </Box>
                </Box>
            </ContentContainer>
            <Box sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%', padding: 2, gap: 2, display: { xs: 'flex', sm: 'none', md: 'none', lg: 'none' } }}>
                <Button text='Salvar' style={{ flex: 1 }} onClick={handleEditBudget} />
                <Button secondary text='Excluir' style={{ flex: 1 }} onClick={handleDeleteBudget} />
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