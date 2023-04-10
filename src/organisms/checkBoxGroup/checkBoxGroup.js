import { Box, Text } from "../../atoms";
import { Colors } from "../layout/Colors";

export const CheckBoxGroup = (props) => {

   const {
      title = '',
      values = [],
      options = [],
      onClick = () => { },
      vertical = false
   } = props;

   return (
      <Box sx={{
         ...styles.checkBoxGroupContainer,
         ...(vertical && {
            flexDirection: 'column',
            gap: 2,
            alignItems: 'flex-start'
         })
      
   }}>
         <Text bold sx={{ marginRight: 7,}}>
            {`${title}:`}
         </Text>
         {options.map(option =>
            <Box
               key={`check_box_group_${option.value}`}
               sx={styles.checkBoxContainer}
               onClick={() => onClick(option.value)}
            >
               {option.display == 'Ativo' ?
                  < Box sx={styles.outerCheck}>
                     {values == true && <Box sx={styles.innerCheck} />}
                  </Box>
                  :
                  < Box sx={styles.outerCheck}>
                     {values?.includes(option?.value) && <Box sx={styles.innerCheck} />}
                  </Box>}
               <Text sx={styles.regularText}>
                  {option.display}
               </Text>
            </Box>
         )
         }
      </Box >
   )
}

const styles = {
   regularText: {
      fontSize: 14,
   },
   boldText: {
      fontSize: 14,
   },
   checkBoxGroupContainer: {
      display: { xs: `block`, sm: `flex`, md: `flex`, lg: `flex` },
      alignItems: 'center',
      gap: 0.7,
   },
   checkBoxContainer: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: { xs: `5px`, sm: `0px`, md: `0px`, lg: `0px` },
      paddingBottom: { xs: `2px`, sm: `0px`, md: `0px`, lg: `0px` },
      gap: 0.7,
      padding: '0px 5px',
      "&:hover": { cursor: 'pointer' }
   },
   outerCheck: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 20,
      height: 20,
      borderRadius: 1,
      border: `2px solid ${Colors.darkBlue}`,
      "&:hover": {
         backgroundColor: Colors.darkBlue + '22',
         cursor: 'pointer'
      }
   },
   innerCheck: {
      width: 12,
      height: 12,
      borderRadius: 0.5,
      backgroundColor: Colors.darkBlue
   }
}