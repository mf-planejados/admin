import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { api } from "../../api/api"
import { Button, ContentContainer, Text, TextInput, Box } from "../../atoms"
import { useAppContext } from "../../context/AppContext"
import { CustomDropzone, SectionHeader } from "../../organisms"
import Link from "next/link"

export default function EditProduct(props) {

    const { setLoading, alert } = useAppContext()

    const router = useRouter()
    const { id } = router.query;
    const newProduct = id === 'new';
    const [productData, setProduct] = useState({})
    const [filesProduct, setFilesProduct] = useState([])


    const getProductData = async () => {
        try {
            setLoading(true)
            const response = await api.get(`/product/${id}`)
            console.log(response)
            const { data = {} } = response;
            setProduct(data)
            setFilesProduct(data?.files)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            if (!newProduct) await getProductData();
            setLoading(false)
        })();
    }, [])

    const handleChange = (value) => {
        setProduct((prevValues) => ({
            ...prevValues,
            [value.target.name]: value.target.value,
        }))
    }


    const handleDelete = async () => {
        try {
            setLoading(true)
            const response = await api.delete(`/product/delete/${id}`)
            const { data = {} } = response;
            if (data?._id) {
                alert.success('Produto deletado com sucesso.');
                router.push('/product/list');
            }
        } catch (error) {
            alert.error('Tivemos um problema ao excluir o produto.');
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = async () => {
        try {
            setLoading(true)
            const response = await api.patch(`/product/update/${id}`, { productData })
            const { data = {} } = response;
            if (data?._id) {
                alert.success('Produto atualizado com sucesso.');
                await getProductData()
            };
        } catch (error) {
            alert.error('Tivemos um problema ao atualizar o Produto.');
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    const handleCreate = async () => {
        try {
            setLoading(true)
            const response = await api.post(`/product/create`, { productData, filesProduct })

            const { data = {} } = response;
            if (data?._id) {
                alert.success('Produto criado com sucesso.');
                await getProductData()
                router.push('/product/list')

            };
        } catch (error) {
            alert.error('Tivemos um problema ao criar o Produto.');
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    const handleChangeFiles = (file) => {
        setFilesProduct((prevClassDays) => [
            ...prevClassDays,
            file
        ]);
    };

    const deleteFile = async (fileId) => {
        try {
            setLoading(true)
            const response = await api.delete(`/product/file/delete/${fileId}?productId=${id}`)
            if (response?.status === 200) {
                alert.success('Arquivo deletado com sucesso.');
                await getProductData()
                return
            } else {
                return alert.error('Erro ao deletar arquivo')
            }
        } catch (error) {
            console.log(error)
            return error
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <SectionHeader
                title={productData?.name || 'Novo Produto'}
                saveButton
                saveButtonAction={newProduct ? handleCreate : handleEdit}
                deleteButton={!newProduct}
                deleteButtonAction={handleDelete}
            />
            <ContentContainer>
                <Box sx={{ display: 'flex', gap: 8 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>

                        <Text bold title>Dados do Produto</Text>

                        <Box sx={{ marginTop: 5, flexDirection: { xs: `column`, xm: 'row', md: 'row', lg: 'row' }, display: 'flex', justifyContent: 'flex-start', gap: 3 }}>
                            <Box>
                                <Text bold style={{ ...styles.input }}>Nome: </Text>
                                <TextInput placeholder='ex: Prateleira MDF' name='name' onChange={handleChange} value={productData?.name}
                                    InputProps={{
                                        style: {
                                            width: '100%'
                                        }
                                    }} />
                            </Box>
                            <Box>
                                <Text bold style={{ ...styles.input }}>Categoria: </Text>
                                <TextInput name='category' onChange={handleChange} value={productData?.category}
                                    InputProps={{
                                        style: {
                                            width: '100%'
                                        }
                                    }} />
                            </Box>
                            <Box>
                                <Text bold style={{ ...styles.input }}>Preço: </Text>
                                <TextInput type="number" name='price' onChange={handleChange} value={productData?.price}
                                    InputProps={{
                                        style: {
                                            width: '100px'
                                        }
                                    }} />
                            </Box>
                            <Box>
                                <Text bold style={{ ...styles.input }}>Estoque: </Text>
                                <TextInput type="number" name='stock' onChange={handleChange} value={productData?.stock}
                                    InputProps={{
                                        style: {
                                            width: '100px'
                                        }
                                    }} />
                            </Box>
                        </Box>
                        <Text bold style={{ ...styles.input }}>Descrição: </Text>
                        <TextInput placeholder='Acabamento em MDF..' name='description' onChange={handleChange} value={productData?.description}
                            multiline
                            minRows={5}
                            maxRows={8} />

                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '40%' }}>
                        <Text bold title style={{ textAlign: 'center' }}>Inserir Fotos do Produto</Text>
                        <Box sx={{ marginTop: 2, }}>
                            <CustomDropzone
                                txt={`Arraste e solte a imagem ou clique aqui.`}
                                callback={(file) => {
                                    if (file) {
                                        if (!newProduct) { getProductData() }
                                        else {
                                            handleChangeFiles(file)
                                        }
                                    }
                                }}
                                product={true}
                                product_id={id}
                            />
                        </Box>
                    </Box>
                </Box>
            </ContentContainer>
            <ContentContainer>

                <Box sx={{ display: 'flex', width: '100%', gap: 1 }}>
                    <Text bold title style={{ textAlign: 'center' }}>Todas as Fotos do Produto</Text>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    {filesProduct?.map((item, index) => {
                        return (
                            <Box key={index} sx={{
                                display: 'flex', gap: 1, position: 'relative',
                                width: { xs: `300px`, sm: `250px`, md: `250px`, lg: `280px` },
                                height: { xs: '200px', sm: '220px', md: '220px', lg: '220px' },
                            }}>
                                <Link href={item?.url} target="_blank">
                                    <Box sx={{
                                        position: 'absolute',
                                        top: -2,
                                        right: -5,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: 25,
                                        height: 25,
                                        padding: 1,
                                        borderRadius: '50%',
                                        transition: '.5s',
                                        backgroundColor: '#ddd',

                                        "&:hover": {
                                            backgroundColor: 'red',
                                            cursor: 'pointer'
                                        }
                                    }} onClick={(event) => {
                                        event.preventDefault();
                                        deleteFile(item?._id)
                                    }}>
                                        X</Box>
                                    <Box sx={{
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundImage: `url('${item?.url}')`,
                                        width: { xs: `300px`, sm: `250px`, md: `250px`, lg: `250px` },
                                        height: { xs: '200px', sm: '220px', md: '220px', lg: '220px' },
                                        margin: '10px',
                                        "&:hover": {
                                            opacity: 0.8,
                                            cursor: 'pointer',
                                            transition: '.5s'
                                        }
                                    }} />
                                </Link>
                            </Box>
                        )
                    })}
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