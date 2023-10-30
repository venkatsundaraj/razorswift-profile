// import { Typography } from '@mui/material'
// import Box from '@mui/material/Box'
// import Image from 'next/image'
// import homePageImagePaths from '../../../constants/ImagePaths/Homepage/homePageImagePaths'
// import Button from '@mui/material/Button'
// import Link from '@mui/material/Link'

// export default function Navbar() {
//   const weblogo = {
//     width: 'clamp(200px, 16.4vw, 250px)',
//     height: 'auto',
//   }
//   const menulogo = {
//     width: '16px',
//     height: 'auto',
//   }
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         position: 'fixed',
//         width: '100vw',
//         zIndex: '20',
//         backgroundColor: 'white',
//       }}
//     >
//       <Image alt="navbar" style={weblogo} src={homePageImagePaths.navbar} />
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//           gap: '12px',
//           marginRight: { md: '40px' },
//         }}
//       >
//         <Box
//           sx={{
//             display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
//             alignItems: 'center',
//             gap: 1,
//             border: '1px solid',
//             borderColor: 'primary.light',
//             borderRadius: 50,
//             pt: '5px',
//             pb: '5px',
//             pl: 2,
//             pr: 2,
//           }}
//         >
//           <Image
//             style={menulogo}
//             src={homePageImagePaths.navbarlogin}
//             alt="logo"
//           />
//           <Link
//             variant="body1"
//             href=""
//             sx={{
//               fontSize: { lg: 16, xl: 24 },
//               color: 'common.black',
//               textDecoration: 'none',
//             }}
//           >
//             Partners
//           </Link>
//         </Box>
//         <Box
//           sx={{
//             display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
//             alignItems: 'center',
//             gap: 1,
//             border: '1px solid',
//             borderColor: 'primary.light',
//             borderRadius: 50,
//             pt: '5px',
//             pb: '5px',
//             pl: 2,
//             pr: 2,
//           }}
//         >
//           <Image
//             alt="navbarlogin"
//             style={menulogo}
//             src={homePageImagePaths.navbarlogin}
//           />
//           <Link
//             variant="body1"
//             href=""
//             sx={{
//               fontSize: { lg: 16, xl: 24 },
//               color: 'common.black',
//               textDecoration: 'none',
//             }}
//           >
//             Aspirants
//           </Link>
//         </Box>
//         <Box
//           sx={{
//             display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
//             alignItems: 'center',
//             gap: 1,
//             border: '1px solid',
//             borderColor: 'primary.light',
//             borderRadius: 50,
//             pt: '5px',
//             pb: '5px',
//             pl: 2,
//             pr: 2,
//           }}
//         >
//           <Image
//             style={menulogo}
//             src={homePageImagePaths.navbarlogin}
//             alt="logo"
//           />
//           <Link
//             variant="body1"
//             href=""
//             sx={{
//               fontSize: { lg: 16, xl: 24 },
//               color: 'common.black',
//               textDecoration: 'none',
//             }}
//           >
//             Business
//           </Link>
//         </Box>
//         <Button sx={{ display: 'flex', flexDirection: 'row', gap: 0.5 }}>
//           <Box
//             sx={{
//               display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
//               color: '#672376',
//               fontSize: 24,
//               fontWeight: 600,
//             }}
//           >
//             M
//           </Box>
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
//             <svg
//               className="ham-bur-one"
//               id="ham-bur-one"
//               xmlns="http://www.w3.org/2000/svg"
//               width="23.998"
//               height="3.145"
//               viewBox="0 0 23.998 3.145"
//             >
//               <path
//                 id="Path_523"
//                 data-name="Path 523"
//                 d="M5.527,3.33A1.492,1.492,0,0,0,4.14,4.9a1.5,1.5,0,0,0,1.4,1.578h21.2a1.5,1.5,0,0,0,1.4-1.578A1.494,1.494,0,0,0,26.748,3.33H5.527"
//                 transform="translate(-4.14 -3.33)"
//                 fill="#A62973"
//               />
//             </svg>
//             <svg
//               className="ham-bur-two"
//               id="ham-bur-two"
//               xmlns="http://www.w3.org/2000/svg"
//               width="23.998"
//               height="3.145"
//               viewBox="0 0 23.998 3.145"
//             >
//               <path
//                 id="Path_523"
//                 data-name="Path 523"
//                 d="M5.527,3.33A1.492,1.492,0,0,0,4.14,4.9a1.5,1.5,0,0,0,1.4,1.578h21.2a1.5,1.5,0,0,0,1.4-1.578A1.494,1.494,0,0,0,26.748,3.33H5.527"
//                 transform="translate(-4.14 -3.33)"
//                 fill="#A62973"
//               />
//             </svg>
//             <svg
//               className="ham-bur-three"
//               id="ham-bur-three"
//               xmlns="http://www.w3.org/2000/svg"
//               width="23.998"
//               height="3.145"
//               viewBox="0 0 23.998 3.145"
//             >
//               <path
//                 id="Path_523"
//                 data-name="Path 523"
//                 d="M5.527,3.33A1.492,1.492,0,0,0,4.14,4.9a1.5,1.5,0,0,0,1.4,1.578h21.2a1.5,1.5,0,0,0,1.4-1.578A1.494,1.494,0,0,0,26.748,3.33H5.527"
//                 transform="translate(-4.14 -3.33)"
//                 fill="#A62973"
//               />
//             </svg>
//           </Box>
//           <Box
//             sx={{
//               display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
//               color: '#672376',
//               fontSize: 24,
//               fontWeight: 600,
//             }}
//           >
//             N
//           </Box>
//           <Box
//             sx={{
//               display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
//               color: '#672376',
//               fontSize: 24,
//               fontWeight: 600,
//             }}
//           >
//             U
//           </Box>
//         </Button>
//       </Box>
//     </Box>
//   )
// }
