import { Grid } from '@mui/material';

import LeftHandComponent from '@/reUsableComponents/ConatinerComponents/LeftHandComponent';
import RightHandComponent from '@/reUsableComponents/ConatinerComponents/RightHandComponent';

// import ToggleButton from '@mui/material/ToggleButton'

const SplitScreenArray = ({ arrayValue }) => {
  return (
    <>
      <Grid
        sx={{ flex: 1 }}
        container
        spacing={{ xs: 2, sm: 2, md: 5 }}
        justifyContent="space-between"
        alignItems="center"
      >
        {arrayValue?.map((values, index) => (
          <>
            <Grid item sm={6} xs={12} order={values.orderLeft}>
              <RightHandComponent image={values.image} />
            </Grid>
            <Grid item sm={6} xs={12} order={values.orderRight}>
              <LeftHandComponent
                title={values.title}
                description={values.description}
                buttonTitle={values.buttonTitle}
                isPhoneNumber={values.isPhoneNumber}
                phoneNumber={values.phoneNumber}
              />
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
};

export default SplitScreenArray;
