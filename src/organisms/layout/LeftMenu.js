import { useMediaQuery, useTheme } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Box, Text } from "../../atoms"
import { useAppContext } from "../../context/AppContext"
import { Colors } from "./Colors"
import Hamburger from "hamburger-react"
import { BoxData } from "../../atoms/BoxPassword"
import { SectionHeader } from "../sections/sectionHeader"


export const LeftMenu = ({ menuItems = [] }) => {

   const { logout, user, } = useAppContext()
   const router = useRouter()

   let nameSplit = user.name.split(' ');
   let firstName = nameSplit[0];

   let userName = (user?.name?.split(' ')[0])?.toUpperCase()
   const pathname = router.pathname === '/' ? null : router.pathname.split('/')[1]

   const [showMenuUser, setShowMenuUser] = useState(false)
   const [showMenuMobile, setShowMenuMobile] = useState(false)
   const [showChangePassword, setShowChangePassword] = useState(false)
   const [showUserOptions, setShowUserOptions] = useState(false)
   const [showSubMenu, setShowSubMenu] = useState(false)
   const theme = useTheme()
   const navBar = useMediaQuery(theme.breakpoints.down('md'))

   useEffect(() => {
      setShowSubMenu(false)
   }, [router.pathname])

   return (
      <>
         {!navBar ? <>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
               <Box sx={styles.leftMenuMainContainer}>
                  <Box sx={{
                     mixBlendMode: 'multiply', display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%',
                     justifyContent: 'space-between',
                  }}>
                     <Box sx={{
                        ...styles.icon,
                        backgroundImage: `url('/logo.png')`,
                        mixBlendMode: 'multiply',
                        backgroundSize: 'contain',
                        width: 80,
                        height: 40,
                        marginTop: 1,
                        "&:hover": {
                           cursor: 'pointer', opacity: 0.8
                        }
                     }} onClick={() => router.push('/')} />
                     < Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        {menuItems.map((item, index) =>
                           <MenuItem
                              currentPage={item.to.includes(pathname)}
                              key={`${index}_${item.to}`}
                              to={item.to}
                              text={item.text}
                              icon={item.icon}
                              showSubMenu={showSubMenu}
                              submenus={item.items}
                              onPress={() => {
                                 setShowSubMenu(!showSubMenu)
                              }}
                           />
                        )}
                     </Box>
                  </Box>

                  <Box sx={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     gap: 1,
                     padding: `4px 8px`,
                     borderRadius: 1.5,
                     boxSizing: 'border-box',
                     "&:hover": {
                        opacity: 0.8,
                        cursor: 'pointer'
                     }
                  }}
                     onClick={() => setShowUserOptions(!showUserOptions)}
                  >
                     <Box sx={{ width: 26, height: 26, borderRadius: '50%', backgroundColor: '#e4e4e4', position: 'relative', overflow: 'hidden' }}>
                        <Box sx={{ width: 24, height: 20, borderRadius: '50%', backgroundColor: '#bbb', position: 'absolute', top: 16, left: 0, right: 0, margin: 'auto' }} />
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#bbb', position: 'absolute', top: 4, left: 0, right: 0, margin: 'auto', border: `2px solid #e4e4e4` }} />
                     </Box>
                     <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                     }}>
                        <Text bold='true'>{firstName}</Text>
                     </Box>
                     <Box sx={{
                        ...styles.menuIcon,
                        backgroundImage: `url('/icons/gray_arrow_up.png')`,
                        transform: showUserOptions ? 'rotate(0deg)' : 'rotate(180deg)'
                     }} />

                  </Box>
                  {showUserOptions &&
                     <>
                        <Box sx={styles.containerUserOpitions}>
                           <Box onClick={() => {
                              setShowUserOptions(!showUserOptions)
                              setShowChangePassword(true)
                           }} sx={{ borderRadius: 1, padding: `4px 8px`, "&:hover": { backgroundColor: '#ddd', cursor: 'pointer' }, }}>
                              <Text style={{ ...styles.text, textAlign: 'center', }}>Alterar Senha</Text>
                           </Box>
                           <Box onClick={logout} sx={{ borderRadius: 1, padding: `4px 8px`, "&:hover": { backgroundColor: '#ddd', cursor: 'pointer' } }}>
                              <Text style={{ ...styles.text, textAlign: 'center' }}>Sair</Text>
                           </Box>
                        </Box>
                     </>
                  }
                  {showChangePassword &&
                     <BoxData
                        onClick={(value) => setShowChangePassword(value)}
                        value={showChangePassword} />}
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

   const { to,
      text,
      icon,
      currentPage,
      onClick,
      onPress = () => { },
      showSubMenu = false,
      submenus = [] } = props

   return (
      <>
         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Link href={to} onClick={onClick}>
               <Box sx={{
                  display: 'flex',
                  padding: `12px 30px`,
                  width: '80%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: currentPage ? Colors.darkRed : 'darkgray',
                  ...(currentPage ?
                     { borderBottom: `1px solid ${Colors.darkRed}` }
                     :
                     {
                        "&:hover": {
                           backgroundColor: Colors.darkRed + '11',
                           borderRadius: 2
                        }
                     }),
               }}>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', color: 'inherit' }}>
                     <Box sx={{ ...styles.icon, backgroundImage: `url(/icons/${icon}.png)`, width: 15, height: 15 }} />
                     <Text style={{ color: 'inherit' }}>{text}</Text>
                     {submenus.length > 1 &&
                        <Box onClick={(event) => {
                           event.preventDefault()
                           onPress()
                        }}
                           sx={{
                              ...styles.icon,
                              backgroundImage: `url(/icons/gray_arrow_up.png)`,
                              width: 15,
                              height: 15,
                              zIndex: 999999999,
                              transform: showSubMenu ? '' : 'rotate(180deg)'
                           }}
                        />
                     }
                  </Box>
               </Box>
            </Link>
            {showSubMenu &&
               <SubMenu showSubMenu={showSubMenu} submenus={submenus} onClick={onClick} />
            }
         </Box>
      </>
   )
}

const SubMenu = (props) => {

   const { showSubMenu = false, submenus = [], onClick = () => { } } = props;

   return (
      <Box sx={{
         backgroundColor: submenus.length > 1 ? '#fff' : 'transparent',
         borderRadius: 2,
         padding: '10px 35px',
         display: 'flex',
         flexDirection: 'column',
         position: 'absolute',
         top: 55,
         zIndex: 99999999,
         boxShadow: submenus.length > 1 && `rgba(149, 157, 165, 0.17) 0px 6px 24px`,
         // width: '20%',
         boxSizing: 'border-box',
      }}>
         {submenus?.map((subMenu, index) => (
            <Link href={subMenu.to} onClick={(event) => {
               onClick
            }}>
               <Box sx={{
                  display: 'flex', gap: 1.5, alignItems: 'center', color: 'inherit', flexDirection: 'column',
                  "&:hover": {
                     color: `${Colors.darkRed}`,
                  },

               }}>
                  <Text style={{
                     color: 'inherit',

                  }}>{subMenu?.text}</Text>
               </Box>
            </Link>
         ))
         }
      </Box>
   )

}

const styles = {
   leftMenuMainContainer: {
      position: 'fixed',
      display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex' },
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: '#fff',
      borderBottom: `1px solid #00000010`,
      padding: `3px 40px`,
      zIndex: 9999999,
      boxShadow: `rgba(149, 157, 165, 0.17) 0px 6px 24px`,
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
   containerUserOpitions: {
      backgroundColor: Colors.background,
      borderRadius: 2,
      padding: 1,
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      top: 48,
      right: 32,
      boxSizing: 'border-box',
      boxShadow: `rgba(149, 157, 165, 0.17) 0px 6px 24px`,

   },
   menuIcon: {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: 13,
      height: 13,
   },
   userBadgeContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 1,
      position: 'relative',
      borderRadius: 1.5
   }
}