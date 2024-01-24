import { Box } from '../atoms'
import { AppProvider } from '../context/AppContext'
import { ProtectRoute } from '../context/ProtectRoute'
import { Colors, LeftMenu } from '../organisms'
import '../styles/globals.css'

const menuItems = [
   {
      to: '/users/list',
      text: 'Clientes',
      icon: 'users_icon'
   },
   {
      to: '/budgets/list',
      text: 'Orçamentos',
      icon: 'companies_icon'
   },
   {
      to: '/testimonial/list',
      text: 'Depoimentos',
      icon: 'ratings_icon'
   },
   {
      to: '/product/list',
      text: 'Produtos',
      icon: 'product_icon'
   },
   {
      to: '/files/list',
      text: 'Arquivos',
      icon: 'files_icon',
      items: [
         {
            to: '/files/galery/list',
            text: 'Galeria',
            icon: 'files_icon',
         },
         {
            to: '/files/ambients/list',
            text: 'Ambientes',
            icon: 'files_icon',
         },
         {
            to: '/files/banner/list',
            text: 'Banner',
            icon: 'files_icon',
         },
         {
            to: '/files/teams/list',
            text: 'Equipe',
            icon: 'files_icon',
         },
      ]
   },

];

function App({ Component, pageProps }) {
   return (
      <AppProvider>
         <ProtectRoute>
            <Box sx={styles.bodyContainer}>
               <LeftMenu menuItems={menuItems} />
               <Box sx={styles.contentContainer}>
                  <Component {...pageProps} />
               </Box>
            </Box>
         </ProtectRoute>
      </AppProvider>
   )
}

export default App;

const styles = {
   bodyContainer: {
      display: "flex",
      minHeight: "100vh",
      flexDirection: "row",
      width: '100%',
   },
   contentContainer: {
      display: "flex",
      width: '100%',
      flexDirection: 'column',
      flex: 1,
      gap: `35px`,
      backgroundColor: Colors.background,
      padding: { xs: `30px`, xm: `25px`, md: `50px`, lg: `50px` },
      paddingBottom: `60px`,
      overflowY: 'hidden',
      marginTop: { xs: `60px`, xm: `40px`, md: `40px`, lg: `40px` }
   },
}