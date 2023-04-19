import { useEffect, useState } from "react"
import { Box, Button, ContentContainer, Text, TextInput } from "../../atoms"
import { useAppContext } from "../../context/AppContext"
import { Colors, CustomDropzone, DropList, SearchBar, SectionHeader } from "../../organisms"
import { deleteFile, getAllFiles as getAllFilesRequest, getFilesByCompany } from "../../validators/api-requests"
import { formatDate } from "../../validators/auth-validator"
import { Backdrop } from "@mui/material"


const comodos = [
   {
      id: '01',
      url: '/comodos/sala.jpg',
      name: 'Sala',
      icon: ''
   },
   {
      id: '02',
      url: '/comodos/quarto.jpeg',
      name: 'Quarto',
      icon: ''
   },
   {
      id: '03',
      url: '/comodos/banheiro.jpg',
      name: 'Banheiro',
      icon: ''
   },
   {
      id: '04',
      url: '/comodos/cozinha.jpg',
      name: 'Cozinha',
      icon: ''
   },
   {
      id: '05',
      url: '/comodos/area-externa.jpg',
      name: 'Espaço Externo',
      icon: ''
   },
   {
      id: '05',
      url: '/comodos/area-externa.jpg',
      name: 'Sócios',
      icon: ''
   },
]

const sections = [
   {
      id: '01',
      name: 'Ambientes',
   },
   {
      id: '02',
      name: 'Socios',
   },
   {
      id: '03',
      name: 'Galeria',
   },
]

const levels = [
   {
      id: '01',
      name: 'Sócio',
   },
   {
      id: '02',
      name: 'Fundador',
   },
]


export default function ListFiles(props) {

   const [sectionsSelect, setSectionsSelect] = useState()
   const [nameSelect, setNameSelect] = useState()
   const [levelSelect, setLevelSelect] = useState()
   const [showExemple, setShowExemple] = useState()
   const { user, setLoading, } = useAppContext()

   const [allFiles, setAllFiles] = useState([])

   const [filesFilter, setFilesFilter] = useState('')

   const totalFiles = allFiles?.reduce((prev, next) => prev + next?.files?.length, 0);
   const filteredCompanies = (item) => item?.name?.toLowerCase().includes(filesFilter.toLowerCase());

   const resetFields = () => {
      setSectionsSelect()
      setNameSelect()
      setLevelSelect()
   }

   const getAllFiles = async () => {
      try {
         setLoading(true)
         const response = await getAllFilesRequest()
         const { data = [] } = response;
         setAllFiles(data)
         setLoading(false)
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getAllFiles()
   }, [])

   const handleChangeName = (value) => {
      setNameSelect((prevValues) => ({
         ...prevValues,
         [value.target.name]: value.target.value,
      }))
   }

   return (
      <>
         <SectionHeader title={`Arquivos (${totalFiles})`} />
         <SearchBar placeholder='Sala, Quarto, Cozinha...' onChange={setFilesFilter} />
         <Box>
            <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
               <Text style={{ marginLeft: '5px' }}>Selecione uma seção:  </Text>
               <Button text="exemplo" textStyle={{ fontSize: 10, padding: '3px 5px 3px 5px', }} style={{ marginLeft: 2, padding: '3px 3px', }}
                  onClick={() => setShowExemple(!showExemple)} />
            </Box>
            <DropList
               data={sections}
               placeholder='ex: Galeria, Sócios, Ambients..'
               fieldToDisplay='name'
               selectedOption={sectionsSelect}
               onSelect={(value) => setSectionsSelect(value)}
               maxHeight={500}
               style={{ width: '300px' }}
            />
         </Box>
         {
            sectionsSelect?.name == "Socios" && <>
               <Box>
                  <Text style={{ marginLeft: '5px' }}>Digite o nome do Sócio/Fundador:  </Text>
                  <TextInput placeholder='ex: Eder Moreira' name='namePerfil' onChange={handleChangeName} value={nameSelect?.name}
                     InputProps={{
                        style: {
                           backgroundColor: '#fff',
                           width: 300
                        }
                     }} />
               </Box>
               <DropList
                  data={levels}
                  placeholder='Sócio, Fundador'
                  fieldToDisplay='name'
                  selectedOption={levelSelect}
                  onSelect={(value) => setLevelSelect(value)}
                  maxHeight={500}
                  style={{ width: '300px' }}
               />
            </>
         }

         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {allFiles.filter(filteredCompanies).map(category => {
               const categoryName = category?.name;
               const categoryFiles = category.files;
               const categoryId = category._id;
               return (
                  <ContentContainer gap={3} key={`list_all_files_${category._id}`}>
                     <Box sx={{ display: 'flex', gap: 1 }}>
                        <Text bold>{categoryName}</Text>
                        <Text>{`(${categoryFiles.length})`}</Text>
                     </Box>
                     <CustomDropzone
                        txt={`Clique ou arraste aqui seus arquivos para upload.`}
                        callback={(file) => {
                           if (file?._id)
                              getAllFiles()
                           resetFields()
                        }}
                        categoryId={categoryId}
                        sectionsSelect={sectionsSelect}
                        nameSelect={nameSelect}
                        levelSelect={levelSelect}

                     />
                     <FilesGrid
                        files={categoryFiles}
                        reloadFiles={getAllFiles}
                        categoryId={categoryId}
                     />
                  </ContentContainer>
               )
            })}
         </Box>

         {showExemple &&
            <>
               <Backdrop
                  sx={{ color: '#fff', zIndex: 9999999999, }}
                  open={showExemple}
               >
                  <Box sx={{
                     width: { xs: `90%`, sm: '100%', md: '100%', lg: '100%' },
                     justifyContent: 'center',
                     alignItems: 'center',
                     marginTop: 15
                  }} >
                     <Box sx={{
                        backgroundImage: `url('/icons/close_menu_icon.png')`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        marginLeft: '90%',
                        width: 40,
                        height: 40,
                        "&:hover": {
                           cursor: 'pointer', opacity: 0.8
                        }
                     }} onClick={() => setShowExemple(!showExemple)} />
                     <Box sx={styles.overlay}>
                        <Box sx={{
                           ...styles.imgExe,
                           backgroundImage: `url('/exemplo-ambientes.jpg')`,
                           width: { xs: `350px`, sm: `600px`, md: `800px`, lg: `800px` },
                           height: { xs: '300px', sm: '600px', md: '600px', lg: '600px' },
                           margin: '10px',
                           "&:hover": {
                              opacity: 0.8,
                              cursor: 'pointer',
                              transition: '.5s'
                           }
                        }} />
                     </Box>
                  </Box>
               </Backdrop>
            </>
         }
      </>
   )
}

const FilesGrid = ({ files, readOnly = false, reloadFiles = () => { }, categoryId = null }) => {

   const { setLoading } = useAppContext()
   const [collapse, setCollapse] = useState(true)
   const [showDownloadOptions, setShowDownloadOptions] = useState({ open: false, index: null })

   return (
      <>
         <Box sx={{ ...styles.filesGridContainer, ...(files.length >= 20 && collapse && { height: 280 }) }}>
            {files.map((file, index) => {
               let fileName = file.key.split('-')
               fileName.shift()
               fileName = fileName.join(' ')
               return (
                  <>
                     {/* <Link key={`${file._id}_list_file_${index}`} href={`${file.url}`} passHref legacyBehavior> */}
                     <a download={true} key={`${file._id}_list_file_${index}`} href={`${file.url}`} target='_blank'>
                        <Box
                           sx={styles.fileCardContainer}
                           onMouseOver={() => setShowDownloadOptions({ open: true, index })}
                           onMouseLeave={() => setShowDownloadOptions({ open: false, index: null })}
                        >
                           <Box sx={{ display: 'flex', width: '100%', textOverflow: 'ellipsis'}}>
                              <Box sx={styles.gridItemTruncateText}>
                                 <Text small light style={{textOverflow: 'ellipsis',overflow: 'hidden',}}>{decodeURIComponent(fileName)}</Text>
                              </Box>
                              <Box sx={styles.gridItemTruncateText}>
                                 <Text small light>data: {formatDate({ date: file.createdAt })}</Text>
                              </Box>

                              <Box sx={styles.deleteFileContainer} onClick={async (event) => {
                                 setLoading(true)
                                 event.preventDefault();
                                 await deleteFile({ fileId: file?._id, categoryId })
                                 setLoading(false)
                                 reloadFiles()
                              }}>
                                 <Text small bold>X</Text>
                              </Box>
                           </Box>

                           <Box sx={{
                              ...styles.imgGalery,
                              backgroundImage: `url('${file.url}')`,
                              width: { xs: `300px`, sm: `250px`, md: `250px`, lg: `250px` },
                              height: { xs: '200px', sm: '220px', md: '220px', lg: '220px' },
                              margin: '10px',
                              "&:hover": {
                                 opacity: 0.8,
                                 cursor: 'pointer',
                                 transition: '.5s'
                              }
                           }} />
                        </Box>
                     </a>
                  </>
               )
            })}
            {files.length >= 20 &&
               collapse &&
               <Box sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: 150,
                  backgroundImage: 'linear-gradient(to top, #fff, transparent)'
               }} />
            }
         </Box>
         {files.length >= 20 &&
            <Box sx={{
               display: 'flex',
               justifyContent: 'flex-end',
               alignItems: 'center',
               width: '100%',
            }}>
               <Box sx={{
                  display: 'flex', gap: 0.7, alignItems: 'center', "&:hover": {
                     cursor: 'pointer',
                     opacity: 0.8
                  }
               }} onClick={() => setCollapse(!collapse)}>
                  <Box sx={{ ...styles.icon, backgroundImage: `url('/icons/gray_arrow_up.png')`, ...(collapse && { transform: 'rotate(180deg)' }), width: 15, height: 15 }} />
                  <Text style={{ color: Colors.paleDarkBlue }}>{collapse ? `Exibir mais arquivos` : `Exibir menos arquivos`}</Text>
               </Box>
            </Box>
         }
      </>
   )
}

const styles = {
   filesGridContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 2,
      justifyContent: 'start',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gridTemplateRows: 'auto',
      overflow: 'hidden',
      position: 'relative'
   },
   icon: {
      backgroundImage: `url('/icons/img_icon.png')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: 25,
      height: 25,
      opacity: 0.8,
   },
   iconPdf: {
      backgroundImage: `url('/icons/pdf_icon.png')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: 25,
      height: 25,
      opacity: 0.7,
   },
   gridItemTruncateText: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: 80
   },
   fileCardContainer: {
      // display: 'flex',
      alignItems: 'center',
      position: 'relative',
      padding: 2,
      borderRadius: 3,
      width: 'auto',
      // backgroundColor: Colors.background,
      border: `1px solid ${Colors.background}`,
      gap: 1,
      overflow: 'hidden',
      // "&:hover": {
      //    border: `1px solid #bbb`
      // }
      
   },
   deleteFileContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 25,
      height: 25,
      padding: 1,
      borderRadius: '50%',
      "&:hover": {
         backgroundColor: '#ddd',
         cursor: 'pointer'
      }
   },
   imgGalery: {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      // overflow: 'hidden',
      marginBottom: 3,
   },
   imgExe: {
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
   },
   overlay: {
      width: '100%',
      height: '100%',
      opacity: 0.8,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex'
   },
}