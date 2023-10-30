import PageTitle from '@/headingComponents/PageTitle';
import SubTitle from '@/headingComponents/SubTitle';
import Title from '@/headingComponents/Title';
import { CommonImage } from '@/imageComponents/CommonImages';
import SplitScreen from '@/layouts/SplitScreen';
import {
  Box,
  Container,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import MuiToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React, { useState } from 'react';
import {
  elementArrayExperiencedProfessionals,
  elementArrayStudents,
  toggleSolutionsButtonArray,
} from 'src/data/app.data';
import { marginTopBottom } from 'src/utils/commonStyles';

const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
  '&.MuiToggleButton-root , &.MuiToggleButton-root:hover': {
    color: '#000000',
    height: '52.26px',
    borderColor: '#DDDDDD',
    border: '3px solid #DDDDDD',
    borderRadius: '100px !important',
    backgroundColor: 'white',
    mx: 2,
    border: '2px solid #DDDDDD !important',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '175px',
    maxWidth: '300px',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '21.6px',
    [theme.breakpoints.down('sm')]: {
      height: '34.84px',
      fontWeight: '500',
      fontSize: '12px',
      lineHeight: '15px',
      maxWidth: '124px',
    },
  },
  '&.Mui-selected, &.Mui-selected:hover': {
    color: '#ffffff',
    backgroundColor: '#1D1D1D',
    borderRadius: '100px !important',
    mx: 2,
    border: `2px solid ${'black'} !important`,
    maxWidth: '300px',
    fontWeight: '600',
    [theme.breakpoints.down('sm')]: {
      height: '34.84px',
      maxWidth: '103px',
      fontWeight: '600',
      fontSize: '12px',
      lineHeight: '15px',
    },
  },
}));
const ToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
  gap: 15,
  groupedHorizontal: {
    '&&.Mui-selected + &&.Mui-selected': {
      borderLeft: `100px solid ${theme.palette.primary.main}`,
      borderTop: 10,
      marginTop: 0,
    },
  },
  '&.MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:first-of-type)':
    {
      marginLeft: 0,
    },
  '&.MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:last-of-type)':
    {
      marginLeft: 0,
    },
}));

const ButtonText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '20px',
  fontWeight: '600',
  textAlign: 'center',
  lineHeight: '26.68px',
  [theme.breakpoints.down('md')]: {
    fontSize: '16px',
    lineHeight: '20.01px',
  },
}));
const ToggleButtonText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: 'inherit',
  fontSize: '18px',
  fontWeight: '600',
  textAlign: 'center',
  lineHeight: '21.68px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    lineHeight: '14.01px',
  },
}));

const ExploreSolution = () => {
  const [alignment, setAlignment] = React.useState('Experienced Professionals');
  const theme = useTheme();
  const [array, setArray] = useState(elementArrayExperiencedProfessionals);

  const CustomContainer = styled(Container)(({ theme }) => ({
    marginTop: 20,
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      height: 'auto',
      alignItems: 'center',
    },
  }));

  const getArrayValue = value => {
    let array = {
      'Experienced Professionals': elementArrayExperiencedProfessionals,
      Students: elementArrayStudents,
    }[value];
    return array || elementArrayExperiencedProfessionals;
  };

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      console.log(alignment, newAlignment);
      setAlignment(newAlignment);
      console.log('align', newAlignment);
      setArray(getArrayValue(newAlignment));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ ...marginTopBottom }}>
      <PageTitle>Explore solutions for</PageTitle>
      <CustomContainer>
        <ToggleButtonGroup
          fullWidth={true}
          size="large"
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          sx={{ justifyContent: 'center' }}
        >
          {toggleSolutionsButtonArray.map((values, index) => (
            <ToggleButton key={values.id} value={values.value}>
              <ToggleButtonText>{values.value}</ToggleButtonText>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Container
          sx={{
            mt: 5,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {array.map((values, index) => (
            <SplitScreen
              key={values.id}
              right={<RightHandComponent image={values.image} />}
              left={
                <LeftHandComponent
                  title={values.title}
                  description={values.description}
                  buttonTitle={values.buttonTitle}
                />
              }
              orderLeft={values.orderLeft}
              orderRight={values.orderRight}
            />
          ))}
        </Container>
      </CustomContainer>
    </Container>
  );
};

export default ExploreSolution;

const RightHandComponent = props => {
  const { image, height, width } = props;
  return (
    <CommonImage
      src={image}
      alt="heroImg"
      style={{ width: '100%', height: 'auto' }}
    />
  );
};

const LeftHandComponent = props => {
  const theme = useTheme();
  const { title, description, buttonTitle } = props;
  return (
    <Box
      sx={{
        // width: '100%',
        // maxWidth: '383.81px',
        gap: 2,
        display: 'flex',
        flexDirection: 'column',

        [theme.breakpoints.down('sm')]: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Title
          sx={{
            [theme.breakpoints.down('sm')]: {
              textAlign: 'center',
            },
          }}
        >
          {title}
        </Title>
        <Box
          sx={{
            height: '74px',
            width: '74px',
            background:
              'linear-gradient(180deg, rgba(241, 35, 26, 0.2) 0%, rgba(254, 139, 134, 0) 100%);',
            borderRadius: '100%',
            transform: 'matrix(-0.5, 0.87, 0.87, 0.5, 0, 0);',
            position: 'absolute',
            top: '-11px',
            left: '-22px',
            [theme.breakpoints.down('sm')]: {
              height: '40.83px',
              width: '40.83px',
              top: '3px',
              left: '-9px',
            },
          }}
        />
      </Box>
      <SubTitle>{description}</SubTitle>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{
          width: '100%',
          [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
          },
        }}
      >
        {/* <ShadowButton
          height="50px"
          backgroundColor={theme.palette.primary.main}
        >
          <ButtonText>{buttonTitle}</ButtonText>
        </ShadowButton> */}
      </Stack>
    </Box>
  );
};
