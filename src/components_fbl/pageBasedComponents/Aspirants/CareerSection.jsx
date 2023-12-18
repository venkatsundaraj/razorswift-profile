import CareerCards from '@/components_fbl/CardComponents/AspirantCards/CareerCards';
import CustomSection from '@/components_fbl/globalComponents/CustomContainer/CustomSection';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import PrimaryHeading from '@/components_fbl/headingComponents/PrimaryHeading';
import { CareerData } from '@/constants/Aspirants/aspirantPageData';
import { Button, Container, Stack } from '@mui/material';

function CareerSection() {
  return (
    <CustomSection id="pathways">
      <Container>
        <PrimaryHeading sx={{ color: 'violetPalette.dark' }}>
          {CareerData.heading}
        </PrimaryHeading>
        <Stack
          sx={theme => ({
            width: '100%',
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'space-between',
            flexDirection: 'column',
            margin: theme.spacing(2, 0, 4, 0),
            [theme.breakpoints.up('md')]: {
              flexDirection: 'row',
              alignItems: 'center',
            },
          })}
        >
          <ParagraphHeading
            sx={{ color: 'primaryPalette.black', flexBasis: '80%' }}
          >
            {CareerData.description}
          </ParagraphHeading>
          <Button
            nowrap="true"
            size="large"
            sx={{
              backgroundColor: 'transparent',
              color: 'primaryPalette.black',
              textTransform: 'capitalize',
              textDecoration: 'underline',
              display: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline',
              },
            }}
          >
            Apply Filters
          </Button>
        </Stack>
        <CareerCards pathways={CareerData.pathways} />
      </Container>
    </CustomSection>
  );
}

export default CareerSection;
