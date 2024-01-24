import { Box } from './Box';

/*

Default props:

- FlexDirection: column;
- Alignment: 'flex-start

*/

export const ContentContainer = (props) => {

   const {
      children,
      row = false,
      center = false,
      right = false,
      fullWidth = false,
      gap = 2,
      width = null,
      style = {}
   } = props;

   return (
      <Box sx={{
         ...styles.contentContainer,
         gap,
         ...(width && { width }),
         ...(fullWidth && { flex: 1 }),
         ...(row ?
            {
               flexDirection: 'row',
               ...(center && { justifyContent: 'center' }),
               ...(right && { justifyContent: 'flex-end' }),
            }
            :
            {
               ...(center && { alignItems: 'center' }),
               ...(right && { alignItems: 'flex-end' }),
            }),
         ...style
      }}>
         {children}
      </Box>
   )
}

const styles = {
   contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      padding: `30px`,
      // padding: { xs: `30px`, xm: `10px`, md: `30px`, lg: `30px` },
      overflow: 'hidden',
      borderRadius: `4px`,
      backgroundColor: '#fff',
      boxShadow: `rgba(149, 157, 165, 0.17) 0px 6px 24px`,
   }
}