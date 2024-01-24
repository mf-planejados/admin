import { useEffect, useState } from "react"
import Link from "next/link"
import { api } from '../../api/api'
import { SearchBar, SectionHeader } from "../../organisms"
import { Colors } from "../../organisms"
import { Box, Button, ContentContainer, Text } from "../../atoms"
import { useAppContext } from "../../context/AppContext"
import { Forbidden } from "../../forbiddenPage/forbiddenPage"
import { useRouter } from "next/router"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, PaginationItem } from "@mui/material"


export default function ListProducts(props) {

    const { setLoading, } = useAppContext()
    const router = useRouter()
    const [products, setProducts] = useState([])

    const itemsPerPage = 5; // Número de itens por página
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products?.slice(indexOfFirstItem, indexOfLastItem);

    const handleChangePage = (event, page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        setLoading(true)
        try {
            const response = await api.get('/products');
            const { data } = response
            setProducts(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
     });

    return (
        <>
            <SectionHeader
                title={`Produtos (${products?.length})`}
                newButton
                newButtonAction={() => router.push('/product/new')}
            />
            <ContentContainer>
                <Box>

                    <Pagination
                        count={Math.ceil(products.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handleChangePage}
                        renderItem={(item) => (
                            <PaginationItem
                                component="div"
                                {...item}
                            />
                        )}
                    />
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Thumb</TableCell>
                                    <TableCell>Produto</TableCell>
                                    <TableCell>Preço</TableCell>
                                    <TableCell>Estoque</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentItems.map((item, index) => {
                                    const [thumb] = item?.files?.map(image => image);
                                    const priceFormatted = formatter.format(item?.price)
                                    return (
                                        <TableRow key={index} onClick={() => router.push(`/product/${item?._id}`)}
                                            sx={{
                                                "&:hover": {
                                                    opacity: 0.8,
                                                    cursor: 'pointer',
                                                    transition: '.5s',
                                                    backgroundColor: 'lightgray'
                                                }
                                            }}>
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundImage: `url('${thumb?.url}')`,
                                                        width: { xs: `120px`, sm: `120px`, md: `120px`, lg: `120px` },
                                                        height: { xs: '120px', sm: '120px', md: '120px', lg: '100px' },
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Text>{item?.name}</Text>
                                            </TableCell>
                                            <TableCell>{priceFormatted}</TableCell>
                                            <TableCell>{item?.stock}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
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