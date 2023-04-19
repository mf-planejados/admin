import { useMediaQuery, useTheme } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { Box, Text } from "../../atoms"
import { useAppContext } from "../../context/AppContext"
import { Colors } from "./Colors"
import Hamburger from "hamburger-react"
import { BoxData } from "../../atoms/BoxPassword"

export const LeftMenu = ({ menuItems = [] }) => {

   const { logout, user, } = useAppContext()
   const router = useRouter()

   let userName = (user?.name?.split(' ')[0])?.toUpperCase()
   const pathname = router.pathname === '/' ? null : router.pathname.split('/')[1]

   const [showMenuUser, setShowMenuUser] = useState(false)
   const [showMenuMobile, setShowMenuMobile] = useState(false)
   const [showChangePassword, setShowChangePassword] = useState(false)

   const theme = useTheme()
   const navBar = useMediaQuery(theme.breakpoints.down('md'))

   return (
      <>
         {!navBar ? <>
            <Box sx={styles.leftMenuMainContainer}>
               <Box sx={{position: 'fixed', mixBlendMode: 'multiply',}}>
                  <Box sx={{
                     ...styles.icon,
                     backgroundImage: `url('/logo.png')`,
                     mixBlendMode: 'multiply',
                     backgroundSize: 'contain',
                     width: 1,
                     height: 40,
                     marginTop: 1,
                     "&:hover": {
                        cursor: 'pointer', opacity: 0.8
                     }
                  }} onClick={() => router.push('/')} />
                  < Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, marginTop: 4 }}>
                     {menuItems.map((item, index) =>
                        <MenuItem
                           currentPage={item.to.includes(pathname)}
                           key={`${index}_${item.to}`}
                           to={item.to}
                           text={item.text}
                           icon={item.icon}
                        />
                     )}
                  </Box>
               </Box>
               <Box sx={{ ...styles.userBox, ...(!showMenuUser && { "&:hover": { backgroundColor: '#00000010', } }) }} onClick={() => setShowMenuUser(!showMenuUser)}>
                  <Box
                     sx={{
                        display: 'flex',
                        borderColor: Colors.background,
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        gap: 1
                     }}
                  >
                     <Text bold small style={{ color: '#999' }}>{userName}</Text>
                     <Box sx={styles.icon} />
                  </Box>
                  {/* <Box sx={{
               ...styles.icon,
               backgroundImage: `url('/icons/w3lib_logo.svg')`,
               backgroundSize: 'contain',
               width: '100%',
               height: 18,
            }} /> */}
                  {showMenuUser &&
                     <>
                        <Box sx={{ width: '100%', height: '1px', backgroundColor: '#ccc' }} />
                        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', gap: 0.2 }}>
                           <Box sx={styles.userButtonContainer} onClick={() => setShowChangePassword(true)}>
                              <Text style={{ color: '#999' }}>Alterar senha</Text>
                           </Box>
                           <Box sx={styles.userButtonContainer} onClick={logout}>
                              <Text style={{ color: '#999' }}>Sair</Text>
                           </Box>
                        </Box>
                     </>
                  }
               </Box>
            </Box>
         </>
            :
            <>

               <Box sx={styles.menuResponsive}>
                  <Box sx={{
                     backgroundImage: `url('/logo.png')`,
                     mixBlendMode: 'multiply',
                     backgroundSize: 'contain',
                     backgroundRepeat: 'no-repeat',
                     width: 1,
                     height: 30,
                     marginTop: 1,
                     "&:hover": {
                        cursor: 'pointer', opacity: 0.8
                     }
                  }} onClick={() => router.push('/')} />
                  <Hamburger toggled={showMenuMobile} toggle={setShowMenuMobile} duration={0.8} />
                  {/* <Box sx={!showMenuMobile ? styles.iconMenuOpen : styles.iconMenuClose} onClick={() => {
                     setTimeout(() => {
                        setShowMenuMobile(!showMenuMobile)
                     }, timeoutLength)
                  }} /> */}
               </Box>
               {showMenuMobile ?
                  <>
                     <Box sx={styles.menuMobileContainer}>
                        <Box sx={{
                           ...styles.icon,
                           backgroundImage: `url('/logo.png')`,
                           mixBlendMode: 'multiply',
                           backgroundSize: 'contain',
                           width: 1,
                           height: 30,
                           marginTop: 1,
                           left: 0,
                           "&:hover": {
                              cursor: 'pointer', opacity: 0.8
                           }
                        }} onClick={() => {
                           router.push('/')
                        }} />
                        < Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                           {menuItems.map((item, index) =>
                              <MenuItem
                                 currentPage={item.to.includes(pathname)}
                                 key={`${index}_${item.to}`}
                                 to={item.to}
                                 text={item.text}
                                 icon={item.icon}
                                 onClick={() => setShowMenuMobile(false)}
                              />
                           )}
                        </Box>
                        <Box sx={{ ...styles.userBox, ...(!showMenuUser && { "&:hover": { backgroundColor: '#00000010', } }) }} onClick={() => setShowMenuUser(!showMenuUser)}>
                           <Box
                              sx={{
                                 display: 'flex',
                                 borderColor: Colors.background,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 cursor: 'pointer',
                                 gap: 1
                              }}
                           >
                              <Text bold small style={{ color: '#999' }}>{userName}</Text>
                              <Box sx={styles.icon} />
                           </Box>

                           {showMenuUser &&
                              <>
                                 <Box sx={{ width: '100%', height: '1px', backgroundColor: '#ccc' }} />
                                 <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', gap: 0.2 }}>
                                    <Box sx={styles.userButtonContainer} onClick={() => {
                                       setShowChangePassword(!showChangePassword)
                                       setShowMenuMobile(false)
                                    }}>
                                       <Text style={{ color: '#999' }}>Alterar senha</Text>
                                    </Box>
                                    <Box sx={styles.userButtonContainer} onClick={logout}>
                                       <Text style={{ color: '#999' }}>Sair</Text>
                                    </Box>
                                 </Box>
                              </>
                           }
                        </Box>
                     </Box>
                  </> : ''}
            </>
         }
         {showChangePassword && <BoxData
            onClick={(value) => setShowChangePassword(value)}
            value={showChangePassword} />}
      </>
   )
}

const MenuItem = (props) => {

   const { to, text, icon, currentPage, onClick } = props

   return (
      <Link href={to} onClick={onClick}>
         <Box sx={{
            display: 'flex',
            padding: `12px 30px`,
            width: '100%',
            borderRadius: 2,
            color: currentPage ? '#f0f0f0' : 'darkgray',
            ...(currentPage ?
               { backgroundColor: Colors.darkRed }
               :
               {
                  "&:hover": {
                     backgroundColor: Colors.darkRed + '22',
                  }
               }),
         }}>
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', color: 'inherit' }}>
               <Box sx={{ ...styles.icon, backgroundImage: `url(/icons/${icon}${currentPage ? '_light' : ''}.png)`, width: 22, height: 22 }} />
               <Text style={{ color: 'inherit' }}>{text}</Text>
            </Box>
         </Box>
      </Link>

   )
}

const styles = {
   leftMenuMainContainer: {
      position: 'relative',
      display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex' },
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      minWidth: '223px',
      backgroundColor: '#f9f9f9',
      borderRight: `1px solid #00000010`,
      padding: `40px 20px`,
      gap: 4,
      overFlow: 'scroll'
   },
   userBox: {
      backgroundColor: '#00000017',
      position: 'fixed',
      bottom: 0,
      padding: `10px 20px`,
      borderRadius: '10px 10px 0px 0px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      gap: 1,
      width: 150
   },
   userButtonContainer: {
      borderRadius: '5px',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: `5px 0px`,
      "&:hover": {
         backgroundColor: '#ddd',
         // transitionDelay: '1s',
         cursor: 'pointer'
      }
   },
   icon: {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',

      width: '15px',
      height: '15px',
      marginRight: '0px',
      backgroundImage: `url('/icons/engine_icon.png')`,
   },
   menuResponsive: {
      position: 'fixed',
      maxHeight: '40px',
      width: '100%',
      backgroundColor: '#f9f9f9',
      borderRight: `1px solid #00000010`,
      padding: `30px`,
      alignItems: 'center',
      justifyContent: 'right',
      display: 'flex',
      zIndex: 99999
   },
   iconMenuOpen: {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      width: '35px',
      height: '35px',
      marginLeft: '0px',
      backgroundImage: `url('/icons/Hamburger_icon.png')`,
      opacity: 0.7
   },
   iconMenuClose: {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      width: '55px',
      height: '55px',
      marginLeft: '0px',
      backgroundImage: `url('/icons/close_menu_icon.png')`,
      opacity: 0.7
   },
   menuMobileContainer: {
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f9f9f9',
      borderRight: `1px solid #00000010`,
      padding: `40px 20px`,
      gap: 4,
      zIndex: 99999999,

   },
}