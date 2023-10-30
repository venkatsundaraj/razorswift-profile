import IMAGES from '@/imageComponents/ImagePaths';
import NavbarLogoLink from '@/reUsableComponents/NavbarLogoLink';
import { Container } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import CustomMenuIcon from './CustomMenuIcon';

const NavbarContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(5),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const NavbarLogo = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  [theme.breakpoints.down('md')]: {
    // display: 'none',
  },
}));

export const LoggedInNavBar = ({ text }) => {
  const theme = useTheme();

  return (
    <NavbarContainer
      maxWidth="lg"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
          padding: theme.spacing(2),
          justifyContent: 'center',
          display: 'none',
        },
      }}
    >
      <NavbarLogo>
        <NavbarLogoLink src={IMAGES?.LOGO} alt="logo" url={'/'} />
        {/* <CommonImage src={IMAGES?.LOGO} alt="logo" /> */}
      </NavbarLogo>
      <CustomMenuIcon text={text} />
    </NavbarContainer>
  );
};

export default LoggedInNavBar;
