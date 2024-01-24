import Dropzone from "react-dropzone"
import { Box, Text } from "../../atoms";
import { useAppContext } from "../../context/AppContext";
import { getRandomInt } from '../../helpers'
import { uploadFile } from "../../validators/api-requests";
import { Colors } from "../layout/Colors";
import { DropList } from "../droplist/droplist";
import { useState } from "react";



export const CustomDropzone = (props) => {


   const { setLoading, alert } = useAppContext()
   const { callback = () => { }, categoryId = null, nameSelect = null, levelSelect = null, sectionsSelect = null,
      product_id } = props;

   let namePerfil = nameSelect?.namePerfil
   let level = levelSelect?.name
   let section = sectionsSelect

   const onDropFiles = async (files) => {
      const uploadedFiles = files.map(file => ({
         file,
         id: getRandomInt(1, 999),
         name: file.name,
         preview: URL.createObjectURL(file),
         progress: 0,
         uploaded: false,
         error: false,
         url: null,
      }))

      uploadedFiles.forEach(processUpload)
   }

   const processUpload = async (uploadedFile) => {
      setLoading(true)

      const formData = new FormData()

      formData?.append('file', uploadedFile?.file, encodeURIComponent(uploadedFile?.name))

      try {
         const response = await uploadFile({ formData, categoryId, namePerfil, level, section, product_id });
         const { data = {}, status } = response;
         const { file = {} } = data;

         if (status === 201) {
            alert.success('Upload relizado com sucesso.');
            callback(file)
            return file
         }
         alert.error('Tivemos um problema ao fazer upload do arquivo.');
         return null
      } catch (error) {
         alert.error('Tivemos um problema ao fazer upload do arquivo.');
         console.log(error)
         return null
      } finally {
         setLoading(false)
      }
   }

   return (
      <>

         <Dropzone accept={{ 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }} onDrop={onDropFiles}>
            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
               <Box {...getRootProps()}
                  sx={{
                     ...styles.dropZoneContainer,
                     backgroundColor: isDragActive && !isDragReject ? Colors : isDragReject ? '#ff000042' : '',
                     gap: 2
                  }}
               >
                  <input {...getInputProps()} />
                  <Box style={{ textAlign: 'center', display: 'flex', fontSize: 12 }}>
                     <Text small light style={{ color: Colors.paleDarkBlue }}>
                        {props.txt || 'Clique ou arraste aqui seus arquivos para upload'}
                     </Text>
                  </Box>
                  <Box sx={{
                     ...styles.icon,
                     backgroundImage: `url('/icons/upload_icon.png')`,
                     mixBlendMode: 'multiply',
                     backgroundSize: 'contain',
                     width: 50,
                     height: 50,
                  }} />
               </Box>
            )}
         </Dropzone>
      </>
   )
}

const styles = {
   dropZoneContainer: {
      display: 'flex',
      width: '100%',
      padding: '40px',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
      flexDirection: 'column',
      border: `2px dashed ${Colors.paleDarkBlue + 'aa'}`,
      cursor: 'pointer',

   },
   icon: {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      width: '15px',
      height: '15px',
      marginRight: '0px',
   },
}