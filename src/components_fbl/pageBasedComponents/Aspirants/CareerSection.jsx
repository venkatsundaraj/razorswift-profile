import CareerCards from '@/components_fbl/CardComponents/AspirantCards/CareerCards';
import PrimaryFillButton from '@/components_fbl/buttonComponents/PrimaryFillButton';
import CustomSection from '@/components_fbl/globalComponents/CustomContainer/CustomSection';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import PrimaryHeading from '@/components_fbl/headingComponents/PrimaryHeading';
import { CareerData } from '@/constants/Aspirants/aspirantPageData';
import { Container, Stack } from '@mui/material';

function CareerSection({ ...props }) {
  return (
    <CustomSection {...props}>
      <Container>
        <PrimaryHeading sx={{ color: 'violetPalette.dark' }}>
          {CareerData.heading}
        </PrimaryHeading>
        <Stack
          sx={theme => ({
            width: '100%',
            display: 'flex',
            alignItems: 'start',
            gap: 1,
            justifyContent: 'space-between',
            flexDirection: 'column',
            margin: theme.spacing(2, 0, 4, 0),
            [theme.breakpoints.up('md')]: {
              alignItems: 'start',
            },
          })}
        >
          <ParagraphHeading
            sx={{ color: 'primaryPalette.black', flexBasis: '80%' }}
          >
            {CareerData.description}
          </ParagraphHeading>
          <PrimaryFillButton
            varient="contained"
            href="/articles/specialize-with-razorswift/"
            sx={{
              width: 'max-content',
              marginTop: '18px',
              backgroundColor: theme => theme.palette.pinkPalette.dark,
              color: theme => theme.palette.primaryPalette.white,
              transition: 'all 300ms ease',
              '&:hover': {
                backgroundColor: theme => theme.palette.pinkPalette.dark,
                transform: 'translateY(-3px)',
                boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
              },
            }}
          >
            More about Pathways
          </PrimaryFillButton>
        </Stack>
        <CareerCards pathways={CareerData.pathways} />
      </Container>
    </CustomSection>
  );
}

export default CareerSection;
