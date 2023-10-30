import SectionHeader from '@/headingComponents/ProfileText/SectionHeader';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack } from '@mui/material';

const FormHeaderComponents = ({
  title,
  isButtonNotRequired,
  workingFunction,
  underLine,
}) => {
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <SectionHeader
        sx={{
          padding: 0,
          alignSelf: 'center',
          textDecoration: underLine ? 'underLine' : 'none',
        }}
        weight="700"
      >
        {title}
      </SectionHeader>
      {!isButtonNotRequired && (
        <IconButton
          color="primary"
          disableRipple
          size="small"
          aria-label="back"
          sx={{ p: 0 }}
          onClick={workingFunction}
        >
          <EditIcon fontSize="12px" />
        </IconButton>
      )}
    </Stack>
  );
};

export default FormHeaderComponents;
