import Link from 'next/link';
import { memo, useState } from 'react';
import { Box, Text } from '../../atoms';
import { Colors } from '../layout/Colors';

const getFieldValue = (data, field) => {
   const fieldParts = field.split('.')
   let value = data

   for (let i = 0; i < fieldParts.length; i++) {
      const key = fieldParts[i]
      value = value[key]

      if (!value) {
         break
      }
   }

   return value || ''
}

export const Table = (props) => {

   const {
      tableContent = {},
      data,
      gap = 1,
      extraDistance = 1,
      to = '/'
   } = props;

   const { header = [], fields = [] } = tableContent

   const [columnsWidth, setColumnsWidth] = useState({});

   // Set columns width based on content length
   data.forEach((dataItem) => {
      fields.forEach((field, index) => {
         const contentLength = field.includes('.') ? getFieldValue(dataItem, field)?.length : dataItem[field]?.length;
         if (!columnsWidth[index] || columnsWidth[index] < contentLength) {
            setColumnsWidth((prevColumnsWidth) => ({
               ...prevColumnsWidth,
               [index]: header[index].text?.length < contentLength ? contentLength : header[index].text?.length,
            }));
         }
      });
   });

   return (
      <Box sx={{ display: 'flex', flexDirection: 'column', }}>
         <Box sx={{ ...styles.headerContainer, gap }}>
            {header.map((headerItem, index) => (
               <Box
                  key={`${headerItem}_header_table_${index}`}
                  sx={{
                     ...styles.row,
                     width: `${columnsWidth[index] * (8 + extraDistance)}px`,
                     ...(headerItem?.maxWidth && { maxWidth: headerItem?.maxWidth }),
                  }}
               >
                  <Text bold>{headerItem.text}</Text>
               </Box>
            ))}
         </Box>
         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {data.map((dataItem, dataIndex) => (
               <Link key={`data_content_table_${dataIndex}`} style={{ textDecoration: 'none' }} href={to + dataItem._id} target='_blank'>
                  <Box sx={{ ...styles.rowContainer, borderTop: `1px solid #e8e8e8`, gap }}>
                     {fields.map((field, fieldIndex) => {
                        let value = dataItem?.[field];

                        if (typeof value === 'boolean') value = value ? `Sim` : `Não`
                        if (field.includes('.')) value = getFieldValue(dataItem, field);
                        return (
                           <Box
                              key={`data_content_table_${dataIndex}_${field}_${fieldIndex}`}
                              sx={{
                                 ...styles.row,
                                 width: `${columnsWidth[fieldIndex] * (8 + extraDistance)}px`,
                                 ...(header[fieldIndex]?.maxWidth && { maxWidth: header[fieldIndex]?.maxWidth }),
                              }}
                           >
                              <Text style={{ textAlign: 'center' }}>{value}</Text>
                           </Box>)
                     }
                     )}
                  </Box>
               </Link>
            ))}
         </Box>
      </Box >
   );
}

const styles = {
   headerContainer: {
      display: 'flex',
      flex: 1,
   },
   rowContainer: {
      display: 'flex',
      "&:hover": {
         backgroundColor: Colors.background,
         cursor: 'pointer'
      }
   },
   row: {
      padding: 2,
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   }
}









// import { Box, Button, Text, TextInput } from "../../atoms"
// import { Colors } from ".."
// import Link from "next/link"

// const getFieldValue = (user, field) => {
//    const fieldParts = field.split('.')
//    let value = user

//    for (let i = 0; i < fieldParts.length; i++) {
//       const key = fieldParts[i]
//       value = value[key]

//       if (!value) {
//          break
//       }
//    }

//    return value || ''
// }


// export const Table = (props) => {
//    const { data = [], tableContent = {}, to = '/' } = props
//    const { header = [], fields = [] } = tableContent

//    return (
//       <>
//          <Box sx={styles.containerCard}>
//             <Box style={styles.contentContainer}>
//                {header.map((item, index) => (
//                   <Box key={`${item}_${index}`} sx={{ width: `${100 / header.length}%`, marginBottom: `10px` }}>
//                      <Text bold style={styles.title}>{item}</Text>
//                   </Box>
//                ))}
//             </Box>
//             {data.map((item, index) => (
//                <Link href={`${to}/${item._id}`} key={`${item._id}-${index}`}>
//                   <Box sx={{ ...styles.boxUsers, }}>
//                      {fields.map((field, index) => {
//                         let value = item?.[field];

//                         if (typeof value === 'boolean') value = value ? `Sim` : `Não`
//                         if (field.includes('.')) value = getFieldValue(item, field);

//                         return (
//                            <Box sx={{ width: `${100 / data.length}%`, display: 'flex', justifyContent: 'center',  }}>
//                               <Text key={`${field}_${item._id}_${index}`} style={{withSpace:'no-wrap', overflow:'hidden', textOverflow: 'ellipsis', minWidth: 70,
//                               padding: {xs:`0px 3px 0px 3px`, xm: `0px`, md: `0px`,lg: `0px`}}}>
//                               {value || '-'}
//                            </Text>
//                            </Box>
//                   )
//                      })}
//                </Box>
//                </Link>
//             ))}
//       </Box>
//       </>
//    )
// }

// const styles = {
//    containerCard: {
//       flex: 1,
//    },
//    contentContainer: {
//       display: "flex",
//       textAlign: 'center',
//       justifyContent: 'space-around',
//       padding: 8,
//    },
//    boxUsers: {
//       display: 'flex',
//       justifyContent: 'space-around',
//       // justifyContent: 'center',
//       // backgroundColor: 'bisque',
//       borderTop: `1px solid #eaeaea`,
//       padding: 2,
//       textAlign: 'center',
//       "&:hover": {
//          backgroundColor: '#f9f9f9'
//       }
//    },
// }