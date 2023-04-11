import { useEffect, useState } from "react"
import { Box, ContentContainer, Text } from "../../atoms"
import { useAppContext } from "../../context/AppContext"
import { Colors, CustomDropzone, DropList, SearchBar, SectionHeader } from "../../organisms"
import { deleteFile, getAllFiles as getAllFilesRequest, getFilesByCompany } from "../../validators/api-requests"


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
]

export default function ListFiles(props) {


   const [categorySelect, setCategory] = useState()

   const { user, setLoading, } = useAppContext()

   const [allFiles, setAllFiles] = useState([])
   
   const [filesFilter, setFilesFilter] = useState('')

   const totalFiles = allFiles?.reduce((prev, next) => prev + next?.files?.length, 0);
   const filteredCompanies = (item) => item?.name?.toLowerCase().includes(filesFilter.toLowerCase());

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

   return (
      <>
         <SectionHeader title={`Arquivos (${totalFiles})`} />
         <SearchBar placeholder='Sala, Quarto, Cozinha...' onChange={setFilesFilter} />
         <Box>
            <Text style={{ marginLeft: '5px' }}>Selecione um cômodo: </Text>
            <DropList
               data={comodos}
               placeholder='Selecione um cômodo'
               fieldToDisplay='name'
               selectedOption={categorySelect}
               onSelect={(value) => setCategory(value)}
               maxHeight={215}
               style={{ width: '300px' }}
            />
         </Box>

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
                        categorySelect={categorySelect}
                        callback={(file) => {
                           if (file?._id)
                              getAllFiles()
                        }}
                        categoryId={categoryId}
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
                     <a download={true} key={`${file._id}_list_file_${index}`} href={`${file.url}`}>
                        <Box
                           sx={styles.fileCardContainer}
                           onMouseOver={() => setShowDownloadOptions({ open: true, index })}
                           onMouseLeave={() => setShowDownloadOptions({ open: false, index: null })}
                        >
                           <Box sx={fileName?.includes('.jpg') || fileName?.includes('.png') ? styles.icon : styles.iconPdf} />

                           <Box sx={styles.gridItemTruncateText}>
                              <Text small light>{decodeURIComponent(fileName)}</Text>
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
      display: 'grid',
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
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
   },
   fileCardContainer: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      padding: 2,
      borderRadius: 3,
      backgroundColor: Colors.background,
      // border: `1px solid ${Colors.background}`,
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
   }
}